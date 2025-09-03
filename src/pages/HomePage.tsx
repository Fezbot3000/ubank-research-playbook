import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { methods, getMethodsWithUpdatedTitles, Method } from '../data/methods';
import { researchPlays } from '../data/research-plays';
import { Card, Button, Icon, Badge } from '../design-system';
import DecisionTree from '../components/DecisionTree';
import Modal from '../components/Modal';

export default function HomePage() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
  const [dynamicMethods, setDynamicMethods] = useState<Method[]>(methods);

  // Load method titles from JSON files
  useEffect(() => {
    const loadMethods = async () => {
      const updatedMethods = await getMethodsWithUpdatedTitles();
      setDynamicMethods(updatedMethods);
    };
    loadMethods();

    // Listen for method data updates
    const handleMethodUpdate = () => {
      loadMethods();
    };
    
    window.addEventListener('methodDataUpdated', handleMethodUpdate);
    return () => window.removeEventListener('methodDataUpdated', handleMethodUpdate);
  }, []);

  // Map Font Awesome icons to our Icon component names
  const iconMap: Record<string, any> = {
    'fa-mouse-pointer': 'click',
    'fa-comments': 'chat',
    'fa-vial': 'settings',
    'fa-layer-group': 'grid',
    'fa-sitemap': 'share',
    'fa-clipboard-list': 'document',
    'fa-brain': 'star',
    'fa-book': 'book',
    'fa-list-check': 'check-circle',
    'fa-chart-bar': 'trending-up'
  };

  // Method descriptions
  const methodDescriptions: Record<string, string> = {
    'comprehension-survey': 'Test if users understand content and instructions',
    'usability-testing': 'Test designs with real users at scale (25 participants)',
    'moderated-usability-testing': 'One-on-one testing sessions with live feedback',
    'card-sorting': 'Learn how users organise and categorise information',
    'tree-testing': 'Test if users can find information in your navigation',
    'survey': 'Gather quantitative data from large groups of users',
    'benchmarking-analysis': 'Measure current performance for comparison',
    'diary-study': 'Understand user behaviour over time in natural context',
    'ab-testing': 'Compare two versions to see which performs better',
    'heuristic-analysis': 'Expert review to identify usability issues quickly'
  };

  const methodCards = useMemo(() => 
    dynamicMethods.map((m) => (
      <Link 
        key={m.slug} 
        to={`/methods/${m.slug}`} 
        style={{ textDecoration: 'none' }}
      >
        <Card 
          variant="outlined"
          className="method-card"
          onMouseEnter={() => setHoveredMethod(m.slug)}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div data-icon-container>
            <Icon 
              name={iconMap[m.icon] || 'document'} 
              size={28} 
              color={hoveredMethod === m.slug ? '#FFFFFF' : 'var(--color-primary)'} 
            />
          </div>
          <h3>{m.title}</h3>
          <p style={{
            color: hoveredMethod === m.slug ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            margin: '8px 0 0 0'
          }}>
            {methodDescriptions[m.slug] || 'Research method'}
          </p>
        </Card>
      </Link>
    )), [hoveredMethod, dynamicMethods]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 style={{ 
          fontSize: 'var(--font-size-xxl)', 
          marginBottom: 'var(--spacing-md)',
          textAlign: 'center'
        }}>
          Ubank Research Playbook
        </h1>
        <p className="hero-description">
          Your comprehensive guide to conducting effective user research. 
          Choose a method below or use our decision tree to find the right approach.
        </p>
      </section>

      {/* Research Methods Grid */}
      <section className="methods-section">
        <h2>Research Methods</h2>
        <p>Select a research method to learn more about when and how to use it</p>
        <div className="method-grid">
          {methodCards}
        </div>
      </section>

      {/* Decision Tree Section */}
      <section style={{ 
        backgroundColor: 'var(--color-background-secondary)',
        padding: 'var(--spacing-2xl) 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 var(--spacing-lg)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            fontSize: 'var(--font-3xl)'
          }}>
            Not Sure Which Method to Use?
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)',
            fontSize: 'var(--font-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-xl)'
          }}>
            Answer a few questions and we'll recommend the best research method for your needs.
          </p>
          <DecisionTree />
        </div>
      </section>

      {/* Help Section */}
      <section style={{ 
        padding: 'var(--spacing-2xl) 0',
        backgroundColor: 'var(--color-background)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 var(--spacing-lg)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'var(--spacing-xl)',
            fontSize: 'var(--font-3xl)'
          }}>
            Need Additional Support?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-md)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <Card style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <Icon name="users" size={48} color="var(--color-primary)" />
              <h3 style={{ 
                marginTop: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-sm)' 
              }}>
                Research Planning Help
              </h3>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                Get personalized guidance from our research team to plan your study effectively.
              </p>
              <Button 
                variant="primary"
                onClick={() => setHelpModalOpen(true)}
                isFullWidth
              >
                Contact Research Team
              </Button>
            </Card>
            
            <Card style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <Icon name="book" size={48} color="var(--color-primary)" />
              <h3 style={{ 
                marginTop: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-sm)' 
              }}>
                Templates & Resources
              </h3>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                Access templates, guides, and tools to support your research process.
              </p>
              <Link to="/resources" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" isFullWidth>
                  Browse Resources
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Modal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="Research Planning Help"
      >
        <p>Need help choosing the right research method or planning your study?</p>
        <p>Contact Matt for personalized research planning assistance. We can help you:</p>
        <ul style={{ marginLeft: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
          <li>Choose the right research method for your goals</li>
          <li>Plan your study timeline and logistics</li>
          <li>Create research questions and scenarios</li>
          <li>Review and validate your research approach</li>
        </ul>
        <Button 
          variant="primary"
          onClick={() => setHelpModalOpen(false)}
          style={{ marginTop: 'var(--spacing-md)' }}
        >
          Got it
        </Button>
      </Modal>

      {/* Research Plays Section */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-lg)',
        backgroundColor: 'var(--color-background-secondary)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 'var(--spacing-3xl)' 
          }}>
            <h2 style={{ 
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family-primary)'
            }}>
              Research Plays
            </h2>
            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 'var(--line-height-relaxed)'
            }}>
              Ready-to-use research workflows for common scenarios. Each play is a tested sequence of methods designed to achieve specific outcomes.
            </p>
          </div>

          {/* Plays Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            {researchPlays.map((play) => (
              <Card 
                key={play.id} 
                style={{ 
                  padding: 'var(--spacing-xl)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Card Header */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-sm)',
                    gap: 'var(--spacing-md)'
                  }}>
                    <h3 style={{ 
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      margin: 0,
                      color: 'var(--color-text-primary)',
                      lineHeight: 'var(--line-height-tight)'
                    }}>
                      {play.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: 'var(--spacing-xs)',
                      flexShrink: 0
                    }}>
                      <Badge 
                        variant={play.effort === 'High' ? 'error' : play.effort === 'Medium' ? 'warning' : 'success'} 
                        size="sm"
                      >
                        {play.effort}
                      </Badge>
                      <Badge variant="info" size="sm">
                        {play.timeline}
                      </Badge>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    fontStyle: 'italic',
                    marginBottom: 'var(--spacing-md)',
                    lineHeight: 'var(--line-height-normal)'
                  }}>
                    "{play.scenario}"
                  </p>
                  
                  <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-lg)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    {play.objective}
                  </p>
                </div>

                {/* Sequence Rationale Section */}
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-primary)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--spacing-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: 'var(--line-height-tight)'
                  }}>
                    Why This Sequence?
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--line-height-normal)'
                  }}>
                    {play.sequenceRationale}
                  </div>
                </div>

                {/* Steps Section */}
                <div style={{ 
                  flex: '1', 
                  marginBottom: 'var(--spacing-lg)' 
                }}>
                  <h4 style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-md)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: 'var(--line-height-tight)'
                  }}>
                    Workflow Steps
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'var(--spacing-sm)' 
                  }}>
                    {play.steps.map((step) => (
                      <div 
                        key={step.stepNumber}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 'var(--spacing-md)',
                          backgroundColor: 'var(--color-background)',
                          borderRadius: 'var(--border-radius-md)',
                          border: '1px solid var(--color-border)',
                          gap: 'var(--spacing-sm)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-text-on-primary)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          flexShrink: 0
                        }}>
                          {step.stepNumber}
                        </div>
                        <div style={{ flex: '1' }}>
                          <div style={{ 
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--color-text-primary)',
                            lineHeight: 'var(--line-height-tight)'
                          }}>
                            {step.title}
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--color-text-secondary)',
                          flexShrink: 0
                        }}>
                          {step.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome Section */}
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-success)'
                }}>
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-success)',
                    marginBottom: 'var(--spacing-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: 'var(--line-height-tight)'
                  }}>
                    Expected Outcome
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--line-height-normal)'
                  }}>
                    {play.outcome}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 