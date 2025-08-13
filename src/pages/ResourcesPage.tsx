import { Card, Button, Icon } from '../design-system';
import { Link } from 'react-router-dom';
import { resources } from '../data/resources';

export default function ResourcesPage() {
  const templates = resources.filter(r => r.category === 'template');
  const guides = resources.filter(r => r.category === 'guide');

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <h1 className="hero-title" style={{ 
          fontSize: 'var(--font-4xl)',
          marginBottom: 'var(--spacing-md)'
        }}>
          Resources & Templates
        </h1>
        <p className="hero-description" style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--font-lg)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Everything you need to conduct professional user research, from templates to quality checklists
        </p>
      </div>
      
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <Icon name="document" size={24} />
          Research Templates
        </h2>
        <div className="resource-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          {templates.map((resource) => (
            <Card key={resource.slug} className="resource-card">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <Icon name={resource.icon as any} size={32} color="var(--color-primary)" />
                <h3 style={{ margin: 0 }}>{resource.title}</h3>
              </div>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                {resource.description}
              </p>
              <Link to={`/resources/${resource.slug}`} style={{ textDecoration: 'none' }}>
                <Button variant="primary" isFullWidth>
                  <Icon name="external-link" size={16} /> View Template
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <Icon name="check-circle" size={24} />
          Quality Assurance
        </h2>
        <div className="resource-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          {guides.map((resource) => (
            <Card key={resource.slug} variant="elevated" className="resource-card">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <Icon 
                  name={resource.icon as any} 
                  size={32} 
                  color={resource.icon === 'alert-triangle' ? 'var(--color-warning)' : 'var(--color-secondary)'} 
                />
                <h3 style={{ margin: 0 }}>{resource.title}</h3>
              </div>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                {resource.description}
              </p>
              <Link to={`/resources/${resource.slug}`} style={{ textDecoration: 'none' }}>
                <Button variant="secondary" isFullWidth>
                  View Guide
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
} 