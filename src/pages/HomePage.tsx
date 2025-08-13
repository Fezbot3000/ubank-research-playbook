import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { methods, getMethodsWithUpdatedTitles, Method } from '../data/methods';
import { Card, Button, Icon } from '../design-system';
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
    </div>
  );
} 