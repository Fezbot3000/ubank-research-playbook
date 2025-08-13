import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { Card, Button, Icon, Badge } from '../design-system';
import Loading from '../components/Loading';
import { EditableText } from '../components/EditableText';
import { useEditMode } from '../contexts/EditModeContext';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Breadcrumbs from '../components/Breadcrumbs';
import { clearMethodCache } from '../data/methods';
import { SampleSizeCalculator } from '../components/SampleSizeCalculator';
import { getAssetPath } from '../utils/paths';

interface DiagramNode {
  id: string;
  type: string;
  text: string;
  color: string;
  position: { x: number; y: number };
}

interface Diagram {
  type: string;
  title: string;
  nodes: DiagramNode[];
}

interface Step {
  title: string;
  description?: string;
  diagram?: Diagram;
  screenshot?: string;
  screenshots?: string[];
  link?: string;
}

interface Screenshot {
  filename: string;
  caption: string;
}

interface MethodData {
  slug: string;
  title: string;
  duration: string;
  participants: string;
  complexity: string;
  purpose: string;
  tools: { name: string; description: string; icon: string; logo?: string; link?: string }[];
  screenshots?: Screenshot[];
  steps: (string | Step)[];
}

export default function MethodPage() {
  const { slug } = useParams();
  const [data, setData] = useState<MethodData | null>(null);
  const [originalData, setOriginalData] = useState<MethodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { isEditMode, toggleEditMode, hasUnsavedChanges, setHasUnsavedChanges } = useEditMode();
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  
  // Load saved checkbox states from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('methodStepProgress');
    if (saved) {
      try {
        setCheckedSteps(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved progress:', e);
      }
    }
  }, []);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Alert dialog state
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger'
  });

  const showConfirmDialog = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  const showAlertDialog = (title: string, message: string, variant: 'danger' | 'warning' | 'info' = 'danger') => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      variant
    });
  };

  const closeAlertDialog = () => {
    setAlertDialog(prev => ({ ...prev, isOpen: false }));
  };

  // Deep comparison function to check if data has actually changed
  const hasActualChanges = useCallback(() => {
    if (!data || !originalData) return false;
    return JSON.stringify(data) !== JSON.stringify(originalData);
  }, [data, originalData]);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      import(`../data/methods/${slug}.json`)
        .then((module) => {
          const methodData = module.default;
          setData(methodData);
          setOriginalData(JSON.parse(JSON.stringify(methodData))); // Deep clone
          setLoading(false);
        })
        .catch(() => {
          setData(null);
          setOriginalData(null);
          setLoading(false);
        });
    }
  }, [slug]);

  // Update data property
  const updateData = useCallback((path: string, value: any) => {
    if (!data) return;
    
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setData(newData);
    
    // Check if there are actual changes compared to original
    const hasChanges = JSON.stringify(newData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [data, originalData, setHasUnsavedChanges]);

  // Save changes
  const saveChanges = useCallback(async () => {
    if (!data || !slug || !hasUnsavedChanges) return;
    
    try {
      const response = await fetch(`/api/save-method/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, null, 2),
      });
      
      if (response.ok) {
        setHasUnsavedChanges(false);
        setOriginalData(JSON.parse(JSON.stringify(data))); // Update original data after save
        // Exit edit mode after successful save, skip confirmation
        if (isEditMode) {
          toggleEditMode(true);
        }
        clearMethodCache(slug); // Clear cache after successful save
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('methodDataUpdated', { detail: { slug } }));
      } else {
        showAlertDialog('Save Failed', 'Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving:', error);
      showAlertDialog('Save Failed', 'Error saving changes. Please try again.');
    }
  }, [data, slug, hasUnsavedChanges, setHasUnsavedChanges, isEditMode, toggleEditMode]);

  // Listen for save event
  useEffect(() => {
    const handleSave = () => saveChanges();
    window.addEventListener('saveAllChanges', handleSave);
    return () => window.removeEventListener('saveAllChanges', handleSave);
  }, [saveChanges]);

  // Handle file drop
  const handleFileDrop = useCallback(async (e: React.DragEvent, stepIndex: number) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      showAlertDialog('Invalid Drop', 'Please drop only image files.');
      return;
    }
    
    // Upload images to server and get filenames
    const newScreenshots: string[] = [];
    
    for (const file of imageFiles) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        
        const result = await response.json();
        newScreenshots.push(result.filename);
      } catch (error) {
        console.error('Error uploading image:', error);
        showAlertDialog('Upload Error', `Failed to upload ${file.name}`);
      }
    }
    
    if (newScreenshots.length === 0) {
      return;
    }
    
    // Update the step with new screenshots
    const newSteps = [...data!.steps];
    const step = newSteps[stepIndex];
    
    if (typeof step === 'string') {
      // Convert string step to object step
      newSteps[stepIndex] = {
        title: step,
        description: '',
        screenshots: newScreenshots
      };
    } else {
      // If step has a single screenshot property, migrate it to screenshots array
      if (step.screenshot && !step.screenshots) {
        step.screenshots = [step.screenshot];
        step.screenshot = '';
      }
      // Add to existing screenshots
      step.screenshots = [...(step.screenshots || []), ...newScreenshots];
    }
    
    updateData('steps', newSteps);
  }, [data, updateData, showAlertDialog]);

  if (loading) {
    return <Loading message="Loading method details..." />;
  }

  if (!data) {
    return (
      <Card style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
        <Icon name="alert-triangle" size={48} color="var(--color-warning)" />
        <h2>Method Not Found</h2>
        <p>The requested research method could not be found.</p>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />
      
      {/* Edit/Save buttons positioned above the card */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}>
        {hasUnsavedChanges && (
          <span style={{
            fontSize: 'var(--font-sm)',
            color: 'var(--color-warning)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            marginRight: 'auto'
          }}>
            <Icon name="alert-circle" size={16} />
            Unsaved changes
          </span>
        )}
        {!isEditMode ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleEditMode()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}
          >
            <Icon name="edit" size={16} />
            Edit
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={saveChanges}
              isDisabled={!hasUnsavedChanges}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              <Icon name="save" size={16} />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleEditMode()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      
      {/* Header Section */}
      <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
        <EditableText
          tag="h1"
          value={data.title}
          onChange={(value) => updateData('title', value)}
          style={{ 
            marginBottom: 'var(--spacing-md)'
          }}
        />
        <EditableText
          tag="p"
          value={data.purpose}
          onChange={(value) => updateData('purpose', value)}
          style={{ 
            fontSize: 'var(--font-lg)', 
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-lg)'
          }}
          multiline
        />
        
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md)', 
          flexWrap: 'wrap',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <Badge variant="primary">
            <Icon name="clock" size={16} />
            <EditableText
              value={data.duration}
              onChange={(value) => updateData('duration', value)}
              style={{ marginLeft: 'var(--spacing-xs)' }}
            />
          </Badge>
          <Badge variant="secondary">
            <Icon name="users" size={16} />
            <EditableText
              value={data.participants}
              onChange={(value) => updateData('participants', value)}
              style={{ marginLeft: 'var(--spacing-xs)' }}
            />
          </Badge>
          <Badge variant={data.complexity === 'Low' ? 'success' : data.complexity === 'Medium' ? 'warning' : 'error'}>
            Complexity:
            <EditableText
              value={data.complexity}
              onChange={(value) => updateData('complexity', value)}
              style={{ marginLeft: 'var(--spacing-xs)' }}
            />
          </Badge>
        </div>
      </Card>

              {/* Tools Section */}
        {data.tools && data.tools.length > 0 && (
          <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
              <h2 style={{ margin: 0 }}>Required Tools</h2>
              {isEditMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newTools = [...data.tools, {
                      name: 'New Tool',
                      description: 'Tool description',
                      icon: 'fa-tool',
                      logo: '',
                      link: ''
                    }];
                    updateData('tools', newTools);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)'
                  }}
                >
                  <Icon name="plus" size={16} />
                  Add Tool
                </Button>
              )}
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-md)'
            }}>
                          {data.tools.map((tool, toolIndex) => (
                <Card 
                  key={toolIndex} 
                  variant="outlined" 
                  padding="sm" 
                  style={{ 
                    position: 'relative',
                    cursor: tool.link && !isEditMode ? 'pointer' : 'default',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    if (tool.link && !isEditMode) {
                      window.open(tool.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (tool.link && !isEditMode) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tool.link && !isEditMode) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }
                  }}
                >
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        showConfirmDialog(
                          'Remove Tool',
                          `Are you sure you want to remove "${tool.name}"?`,
                          () => {
                            const newTools = data.tools.filter((_, index) => index !== toolIndex);
                            updateData('tools', newTools);
                          }
                        );
                      }}
                      style={{
                        position: 'absolute',
                        top: 'var(--spacing-xs)',
                        right: 'var(--spacing-xs)',
                        padding: 'var(--spacing-xs)',
                        minWidth: 'auto',
                        zIndex: 10
                      }}
                    >
                      <Icon name="close" size={14} />
                    </Button>
                  )}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 'var(--spacing-sm)', 
                    marginBottom: 'var(--spacing-sm)',
                    paddingRight: isEditMode ? 'var(--spacing-xl)' : 0
                  }}>
                    <Icon name={tool.icon as any} size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <EditableText
                        tag="h4"
                        value={tool.name}
                        onChange={(value) => {
                          const newTools = [...data.tools];
                          newTools[toolIndex].name = value;
                          updateData('tools', newTools);
                        }}
                        style={{ margin: 0, marginBottom: 'var(--spacing-xs)' }}
                      />
                      <EditableText
                        tag="p"
                        value={tool.description}
                        onChange={(value) => {
                          const newTools = [...data.tools];
                          newTools[toolIndex].description = value;
                          updateData('tools', newTools);
                        }}
                        style={{ 
                          fontSize: 'var(--font-sm)', 
                          color: 'var(--color-text-secondary)',
                          margin: 0,
                          lineHeight: '1.5'
                        }}
                        multiline
                      />
                      {isEditMode && (
                        <div style={{ marginTop: 'var(--spacing-sm)' }}>
                          <EditableText
                            tag="p"
                            value={tool.link || 'Add link...'}
                            onChange={(value) => {
                              const newTools = [...data.tools];
                              newTools[toolIndex].link = value === 'Add link...' ? '' : value;
                              updateData('tools', newTools);
                            }}
                            style={{ 
                              fontSize: 'var(--font-xs)', 
                              color: tool.link ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                              margin: 0,
                              textDecoration: 'underline',
                              wordBreak: 'break-all',
                              overflowWrap: 'break-word',
                              display: 'block',
                              maxWidth: '100%'
                            }}
                          />
                        </div>
                      )}
                      {tool.link && !isEditMode && (
                        <div style={{ 
                          marginTop: 'var(--spacing-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-xs)'
                        }}>
                          <Icon name="external-link" size={14} color="var(--color-primary)" />
                          <span style={{ 
                            fontSize: 'var(--font-xs)', 
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                          }}>
                            Visit website
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Card>
      )}

      {/* Steps Section */}
      <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-lg)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-sm)'
        }}>
          <h2 style={{ margin: 0, flex: '1 1 auto' }}>Step-by-Step Process</h2>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-sm)',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            {Object.keys(checkedSteps).some(key => key.startsWith(`${data.slug}-`) && checkedSteps[key]) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newCheckedSteps = { ...checkedSteps };
                  Object.keys(newCheckedSteps).forEach(key => {
                    if (key.startsWith(`${data.slug}-`)) {
                      delete newCheckedSteps[key];
                    }
                  });
                  setCheckedSteps(newCheckedSteps);
                  localStorage.setItem('methodStepProgress', JSON.stringify(newCheckedSteps));
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon name="refresh" size={16} />
                Clear Progress
              </Button>
            )}
            {isEditMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newSteps = [...data.steps, {
                    title: 'New Step',
                    description: 'Step description',
                    screenshot: '',
                    screenshots: [],
                    link: ''
                  }];
                  updateData('steps', newSteps);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon name="plus" size={16} />
                Add Step
              </Button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing-xl) * 2)' }}>
          {data.steps.map((step, index) => {
            const isStringStep = typeof step === 'string';
            const stepData = isStringStep ? { title: step } : step;
            
            return (
              <div key={index} style={{ 
                display: 'flex', 
                gap: 'var(--spacing-md)',
                paddingLeft: window.innerWidth < 768 ? '0' : 'var(--spacing-md)',
                paddingBottom: 'var(--spacing-lg)',
                position: 'relative'
              }}>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      showConfirmDialog(
                        'Remove Step',
                        `Are you sure you want to remove "${stepData.title}"?`,
                        () => {
                          const newSteps = data.steps.filter((_, i) => i !== index);
                          updateData('steps', newSteps);
                        }
                      );
                    }}
                    style={{
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      padding: 'var(--spacing-xs)',
                      minWidth: 'auto',
                      color: 'var(--color-error)',
                      zIndex: 1
                    }}
                  >
                    <Icon name="minus-circle" size={16} />
                  </Button>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-text-on-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--font-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>
                      <input
                        type="checkbox"
                        className="step-checkbox"
                        checked={checkedSteps[`${data.slug}-${index}`] || false}
                        onChange={(e) => {
                          const newCheckedSteps = {
                            ...checkedSteps,
                            [`${data.slug}-${index}`]: e.target.checked
                          };
                          setCheckedSteps(newCheckedSteps);
                          localStorage.setItem('methodStepProgress', JSON.stringify(newCheckedSteps));
                        }}
                      />
                    </div>
                    <EditableText
                      tag="h3"
                      value={stepData.title}
                      onChange={(value) => {
                        if (isStringStep) {
                          const newSteps = [...data.steps];
                          newSteps[index] = value;
                          updateData('steps', newSteps);
                        } else {
                          const newSteps = [...data.steps];
                          (newSteps[index] as Step).title = value;
                          updateData('steps', newSteps);
                        }
                      }}
                      style={{ 
                        margin: 0,
                        flex: 1,
                        textDecoration: checkedSteps[`${data.slug}-${index}`] ? 'line-through' : 'none',
                        opacity: checkedSteps[`${data.slug}-${index}`] ? 0.6 : 1,
                        fontSize: window.innerWidth < 768 ? 'var(--font-lg)' : 'var(--font-xl)'
                      }}
                    />
                  </div>
                  {!isStringStep && step.description && (
                    <EditableText
                      tag="p"
                      value={step.description}
                      onChange={(value) => {
                        const newSteps = [...data.steps];
                        (newSteps[index] as Step).description = value;
                        updateData('steps', newSteps);
                      }}
                      style={{ 
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-md)'
                      }}
                      multiline
                    />
                  )}
                  {!isStringStep && (
                    <>
                      {isEditMode && (
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: 'var(--spacing-xs)',
                            fontSize: 'var(--font-sm)',
                            color: 'var(--color-text-secondary)'
                          }}>
                            Link (optional)
                          </label>
                          <input
                            type="url"
                            value={step.link || ''}
                            onChange={(e) => {
                              const newSteps = [...data.steps];
                              (newSteps[index] as Step).link = e.target.value;
                              updateData('steps', newSteps);
                            }}
                            placeholder="https://example.com"
                            style={{ 
                              width: '100%',
                              padding: 'var(--spacing-xs) var(--spacing-sm)',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--border-radius-sm)',
                              backgroundColor: 'var(--color-background)',
                              fontSize: 'var(--font-sm)',
                              color: 'var(--color-text)'
                            }}
                          />
                        </div>
                      )}
                      {!isEditMode && step.link && (
                        <a 
                          href={step.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-xs)',
                            color: 'var(--color-primary)',
                            textDecoration: 'none',
                            marginBottom: 'var(--spacing-md)',
                            fontSize: 'var(--font-sm)'
                          }}
                        >
                          <Icon name="external-link" size={16} />
                          View Resource
                        </a>
                      )}
                    </>
                  )}
                  {!isStringStep && step.diagram && (
                    <Card variant="filled" style={{ marginTop: 'var(--spacing-md)' }}>
                      <h4>{step.diagram.title}</h4>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 'var(--spacing-sm)',
                        marginTop: 'var(--spacing-sm)'
                      }}>
                        {step.diagram.nodes.map((node) => (
                          <Badge 
                            key={node.id}
                            variant={
                              node.color === 'purple' ? 'primary' : 
                              node.color === 'yellow' ? 'warning' : 
                              node.color === 'green' ? 'success' : 
                              'secondary'
                            }
                          >
                            {node.text}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}
                  
                  {/* Display screenshot for this step if available */}
                  {(() => {
                    if (!isStringStep && (step.screenshot || step.screenshots)) {
                      // Combine both screenshot and screenshots into a single array
                      const allScreenshots = [
                        ...(step.screenshot ? [step.screenshot] : []),
                        ...(step.screenshots || [])
                      ].filter(Boolean); // Remove any empty strings
                      
                      return allScreenshots.map((screenshotFile, screenshotIndex) => (
                        <Card key={screenshotIndex} variant="outlined" style={{ 
                          marginTop: 'var(--spacing-lg)',
                          padding: 'var(--spacing-md)',
                          backgroundColor: 'var(--color-background-secondary)',
                          position: 'relative'
                        }}>
                          {isEditMode && (
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={async () => {
                                const newSteps = [...data.steps];
                                const stepData = newSteps[index] as Step;
                                
                                // Get the filename to delete
                                const allScreenshots = [
                                  ...(stepData.screenshot ? [stepData.screenshot] : []),
                                  ...(stepData.screenshots || [])
                                ].filter(Boolean);
                                
                                const filenameToDelete = allScreenshots[screenshotIndex];
                                
                                // Remove from the appropriate property
                                if (stepData.screenshot && screenshotIndex === 0 && (!stepData.screenshots || stepData.screenshots.length === 0)) {
                                  stepData.screenshot = '';
                                } else {
                                  // Remove from screenshots array
                                  const indexInScreenshots = screenshotIndex - (stepData.screenshot ? 1 : 0);
                                  if (stepData.screenshots && indexInScreenshots >= 0) {
                                    stepData.screenshots = stepData.screenshots.filter((_, i) => i !== indexInScreenshots);
                                  } else if (stepData.screenshot) {
                                    stepData.screenshot = '';
                                  }
                                }
                                
                                // Delete from server if it's not a pre-existing screenshot
                                if (filenameToDelete && !data.screenshots?.some(s => s.filename === filenameToDelete)) {
                                  try {
                                    await fetch(`/api/delete-image/${filenameToDelete}`, {
                                      method: 'DELETE'
                                    });
                                  } catch (error) {
                                    console.error('Error deleting image from server:', error);
                                  }
                                }
                                
                                updateData('steps', newSteps);
                              }}
                              style={{
                                position: 'absolute',
                                top: 'var(--spacing-xs)',
                                right: 'var(--spacing-xs)',
                                padding: 'var(--spacing-xs)',
                                minWidth: 'auto',
                                zIndex: 10,
                                backgroundColor: 'var(--color-background)',
                                boxShadow: 'var(--shadow-sm)'
                              }}
                            >
                              <Icon name="close" size={14} />
                            </Button>
                          )}
                          <img 
                            src={getAssetPath(`User-Testing/${screenshotFile}`)}
                            alt={`Step ${index + 1} screenshot ${screenshotIndex + 1}`}
                            onClick={() => setLightboxImage(getAssetPath(`User-Testing/${screenshotFile}`))}
                            onError={(e) => {
                              // If the image fails to load, try with a different path
                              const img = e.target as HTMLImageElement;
                              if (!img.src.includes('public/')) {
                                img.src = getAssetPath(`public/User-Testing/${screenshotFile}`);
                              }
                            }}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '600px',
                              objectFit: 'contain',
                              borderRadius: 'var(--radius-md)',
                              boxShadow: 'var(--shadow-md)',
                              cursor: 'pointer',
                              backgroundColor: 'var(--color-background-secondary)'
                            }}
                          />
                          {data.screenshots && (() => {
                            const screenshotData = data.screenshots.find(s => s.filename === screenshotFile);
                            return screenshotData?.caption ? (
                              <p style={{
                                marginTop: 'var(--spacing-sm)',
                                marginBottom: 0,
                                fontSize: 'var(--font-sm)',
                                color: 'var(--color-text-secondary)',
                                textAlign: 'center',
                                fontStyle: 'italic'
                              }}>
                                {screenshotData.caption}
                              </p>
                            ) : null;
                          })()}
                        </Card>
                      ));
                    }
                    return null;
                  })()}
                  
                  {/* Drag and drop zone for adding images */}
                  {isEditMode && (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(index);
                      }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => handleFileDrop(e, index)}
                      style={{
                        marginTop: 'var(--spacing-lg)',
                        padding: 'var(--spacing-xl)',
                        border: `2px dashed ${dragOver === index ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: dragOver === index ? 'rgba(123, 34, 255, 0.05)' : 'var(--color-background-secondary)',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <Icon name="photo" size={32} color={dragOver === index ? 'var(--color-primary)' : 'var(--color-text-tertiary)'} />
                      <p style={{
                        marginTop: 'var(--spacing-sm)',
                        marginBottom: 0,
                        color: dragOver === index ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontWeight: dragOver === index ? '500' : 'normal'
                      }}>
                        Drag and drop images here or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            const fakeEvent = {
                              preventDefault: () => {},
                              dataTransfer: { files }
                            } as unknown as React.DragEvent;
                            await handleFileDrop(fakeEvent, index);
                            // Reset the input so the same file can be selected again
                            e.target.value = '';
                          }
                        }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer',
                          top: 0,
                          left: 0
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {isEditMode && (
          <div style={{ 
            marginTop: 'var(--spacing-xl)', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const newSteps = [...data.steps, {
                  title: 'New Step',
                  description: 'Step description',
                  screenshot: '',
                  screenshots: [],
                  link: ''
                }];
                updateData('steps', newSteps);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <Icon name="plus" size={20} />
              Add Step
            </Button>
          </div>
        )}
      </Card>

      {/* Sample Size Calculator for A/B Testing */}
      {data.slug === 'ab-testing' && (
        <SampleSizeCalculator />
      )}

      {/* Screenshots Gallery - Only for methods with screenshots */}
      {data.screenshots && data.screenshots.length > 0 && data.slug === 'usability-testing' && (
        <Card>
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Visual Guide</h2>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            Screenshots showing the key steps in the {data.title.toLowerCase()} process
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--spacing-lg)'
          }}>
            {data.screenshots.map((screenshot, index) => (
              <div 
                key={index}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={getAssetPath(`User-Testing/${screenshot.filename}`)}
                  alt={screenshot.caption}
                  onClick={() => setLightboxImage(getAssetPath(`User-Testing/${screenshot.filename}`))}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    backgroundColor: 'var(--color-background)'
                  }}
                />
                {screenshot.caption && (
                  <p style={{
                    marginTop: 'var(--spacing-sm)',
                    fontSize: 'var(--font-sm)',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center'
                  }}>
                    {screenshot.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Lightbox for viewing screenshots */}
      {lightboxImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            padding: 'var(--spacing-xl)'
          }}
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Enlarged screenshot"
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: 'var(--spacing-xl)',
              right: 'var(--spacing-xl)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ×
          </button>
        </div>
      )}
      
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={() => {
          confirmDialog.onConfirm();
          closeConfirmDialog();
        }}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
      />

      <ConfirmationDialog
        isOpen={alertDialog.isOpen}
        onClose={closeAlertDialog}
        onConfirm={closeAlertDialog}
        title={alertDialog.title}
        message={alertDialog.message}
        confirmText="OK"
        showCancelButton={false}
        variant={alertDialog.variant}
      />
    </div>
  );
}