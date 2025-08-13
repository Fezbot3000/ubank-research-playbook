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
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-background)'
          }}
          onMouseEnter={(e) => {
            setHoveredMethod(m.slug);
            e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            // Update icon container background
            const iconContainer = e.currentTarget.querySelector('[data-icon-container]') as HTMLElement;
            if (iconContainer) {
              iconContainer.style.backgroundColor = 'var(--color-primary)';
              iconContainer.style.borderColor = 'var(--color-primary)';
            }
          }}
          onMouseLeave={(e) => {
            setHoveredMethod(null);
            e.currentTarget.style.backgroundColor = 'var(--color-background)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
            // Reset icon container background
            const iconContainer = e.currentTarget.querySelector('[data-icon-container]') as HTMLElement;
            if (iconContainer) {
              iconContainer.style.backgroundColor = 'var(--color-background-secondary)';
              iconContainer.style.borderColor = 'var(--color-border)';
            }
          }}
        >
          <div 
            data-icon-container
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-background-secondary)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon 
              name={iconMap[m.icon] || 'document'} 
              size={28} 
              color={hoveredMethod === m.slug ? '#FFFFFF' : 'var(--color-primary)'} 
            />
          </div>
          <h3 style={{ 
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-sm)',
            fontWeight: 'var(--font-weight-medium)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            {m.title}
          </h3>
        </Card>
      </Link>
    )), [hoveredMethod, dynamicMethods]);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: 'var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl)',
        backgroundColor: 'var(--color-background)'
      }}>
        <h1 style={{ 
          fontSize: 'var(--font-4xl)',
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)'
        }}>
          UBank Research Playbook
        </h1>
        <p style={{ 
          fontSize: 'var(--font-lg)',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Your comprehensive guide to conducting effective user research. 
          Choose a method below or use our decision tree to find the right approach.
        </p>
      </section>

      {/* Research Methods Grid */}
      <section style={{ padding: 'var(--spacing-3xl) var(--spacing-xl)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            fontSize: 'var(--font-2xl)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Research Methods
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            fontSize: 'var(--font-base)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-2xl)'
          }}>
            Select a research method to learn more about when and how to use it
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--spacing-md)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {methodCards}
          </div>
        </div>
      </section>

      {/* Decision Tree Section */}
      <section style={{ 
        backgroundColor: 'var(--color-background-secondary)',
        padding: 'var(--spacing-3xl) var(--spacing-xl)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
            fontSize: 'var(--font-lg)'
          }}>
            Answer a few questions and we'll recommend the best research method for your needs.
          </p>
          <DecisionTree />
        </div>
      </section>

      {/* Help Section */}
      <section style={{ 
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        backgroundColor: 'var(--color-background)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
            gap: 'var(--spacing-lg)'
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