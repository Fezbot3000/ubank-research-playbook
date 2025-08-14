import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Icon } from '../design-system';
import { loadResourceData, clearResourceCache } from '../data/resources';
import { EditableText } from '../components/EditableText';
import { useEditMode } from '../contexts/EditModeContext';
import Breadcrumbs from '../components/Breadcrumbs';

interface ResourceSection {
  title: string;
  content: string;
}

interface ResourceData {
  title: string;
  sections: ResourceSection[];
}

export default function ResourcePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isEditMode, toggleEditMode, hasUnsavedChanges, setHasUnsavedChanges, isDevelopment } = useEditMode();
  const [data, setData] = useState<ResourceData | null>(null);
  const [originalData, setOriginalData] = useState<ResourceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load resource data
  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const resourceData = await loadResourceData(slug);
        if (resourceData) {
          setData(resourceData);
          setOriginalData(JSON.parse(JSON.stringify(resourceData)));
        } else {
          setError('Resource not found');
        }
      } catch (err) {
        setError('Error loading resource');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [slug]);

  // Check for unsaved changes
  useEffect(() => {
    if (!data || !originalData) {
      setHasUnsavedChanges(false);
      return;
    }
    
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [data, originalData, setHasUnsavedChanges]);

  // Save changes
  const saveChanges = useCallback(async () => {
    if (!data || !slug || !hasUnsavedChanges) return;
    
    try {
      const response = await fetch(`/api/save-resource/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, null, 2),
      });
      
      if (response.ok) {
        setHasUnsavedChanges(false);
        setOriginalData(JSON.parse(JSON.stringify(data)));
        if (isEditMode) {
          toggleEditMode(true);
        }
        clearResourceCache(slug);
        window.dispatchEvent(new CustomEvent('resourceDataUpdated', { detail: { slug } }));
      } else {
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes. Please try again.');
    }
  }, [data, slug, hasUnsavedChanges, setHasUnsavedChanges, isEditMode, toggleEditMode]);

  // Listen for save event
  useEffect(() => {
    const handleSave = () => saveChanges();
    window.addEventListener('saveAllChanges', handleSave);
    return () => window.removeEventListener('saveAllChanges', handleSave);
  }, [saveChanges]);

  // Update section content
  const updateSectionContent = (sectionIndex: number, newContent: string) => {
    if (!data) return;
    
    const newData = { ...data };
    newData.sections = [...data.sections];
    newData.sections[sectionIndex] = {
      ...newData.sections[sectionIndex],
      content: newContent
    };
    setData(newData);
  };

  // Update section title
  const updateSectionTitle = (sectionIndex: number, newTitle: string) => {
    if (!data) return;
    
    const newData = { ...data };
    newData.sections = [...data.sections];
    newData.sections[sectionIndex] = {
      ...newData.sections[sectionIndex],
      title: newTitle
    };
    setData(newData);
  };

  // Add new section
  const addSection = () => {
    if (!data) return;
    
    const newData = { ...data };
    newData.sections = [...data.sections, {
      title: 'New Section',
      content: 'Add content here...'
    }];
    setData(newData);
  };

  // Delete section
  const deleteSection = (sectionIndex: number) => {
    if (!data) return;
    
    const newData = { ...data };
    newData.sections = data.sections.filter((_, index) => index !== sectionIndex);
    setData(newData);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
        <p>Loading resource...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
        <p style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-lg)' }}>
          {error || 'Resource not found'}
        </p>
        <Button onClick={() => navigate('/resources')}>
          Back to Resources
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />

      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)'
        }}>
          {isDevelopment && !isEditMode ? (
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
          ) : isDevelopment && isEditMode ? (
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
          ) : null}
          {hasUnsavedChanges && (
            <span style={{
              fontSize: 'var(--font-sm)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              marginLeft: 'var(--spacing-sm)'
            }}>
              <Icon name="alert-circle" size={16} />
              Unsaved
            </span>
          )}
        </div>
        
        <h1 style={{ 
          fontSize: 'var(--font-4xl)',
          marginBottom: 'var(--spacing-md)',
          paddingRight: 'var(--spacing-3xl)'
        }}>
          {data.title}
        </h1>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data.sections.map((section, index) => (
          <Card key={index} style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <EditableText
                value={section.title}
                onChange={(newTitle: string) => updateSectionTitle(index, newTitle)}
                style={{
                  fontSize: 'var(--font-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  margin: 0
                }}
                tag="h2"
              />
              {isEditMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSection(index)}
                  aria-label="Delete section"
                >
                  <Icon name="trash" size={16} />
                </Button>
              )}
            </div>
            
            <EditableText
              value={section.content}
              onChange={(newContent: string) => updateSectionContent(index, newContent)}
              multiline
              style={{
                color: 'var(--color-text-secondary)',
                whiteSpace: 'pre-wrap'
              }}
            />
          </Card>
        ))}

        {isEditMode && (
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Button onClick={addSection} variant="secondary">
              <Icon name="plus" size={16} /> Add Section
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 