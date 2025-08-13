import { Card, Button, Icon } from '../design-system';

export default function DecisionTreeAnalysisPage() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ 
          fontSize: 'var(--font-4xl)',
          marginBottom: 'var(--spacing-md)'
        }}>
          Research Method Decision Flow
        </h1>
        <p style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--font-lg)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Understanding how our decision tree guides you to the right research method
        </p>
      </div>

      <Card style={{ padding: 'var(--spacing-xl)' }}>
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2>Research Method Decision Flow</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            This diagram shows how different research needs lead to specific method recommendations.
          </p>
        </div>

        <Card variant="filled" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
          <h3>Key Decision Points:</h3>
          <ul style={{ marginLeft: 'var(--spacing-lg)' }}>
            <li><strong>Content Testing:</strong> When you need to test comprehension of text, instructions, or interface labels</li>
            <li><strong>Generative Research:</strong> When exploring user needs and discovering new opportunities</li>
            <li><strong>Evaluative Research:</strong> When testing and improving existing features or designs</li>
            <li><strong>Existing Feature Feedback:</strong> When gathering feedback on features already in production</li>
          </ul>
        </Card>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          <Card variant="outlined">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
              <Icon name="document" size={20} color="var(--color-primary)" />
              Most Common Paths
            </h4>
            <ul style={{ fontSize: 'var(--font-sm)', marginLeft: 'var(--spacing-md)' }}>
              <li>Content Testing → Comprehension Survey</li>
              <li>Task Testing → Usability Testing</li>
              <li>Information Architecture → Card Sorting</li>
              <li>Design Comparison → A/B Testing</li>
            </ul>
          </Card>

          <Card variant="outlined">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
              <Icon name="alert-circle" size={20} color="var(--color-warning)" />
              When to Get Help
            </h4>
            <ul style={{ fontSize: 'var(--font-sm)', marginLeft: 'var(--spacing-md)' }}>
              <li>Complex research questions</li>
              <li>Multiple methods needed</li>
              <li>Unclear research goals</li>
              <li>First-time researchers</li>
            </ul>
          </Card>

          <Card variant="outlined">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
              <Icon name="check-circle" size={20} color="var(--color-success)" />
              Method Categories
            </h4>
            <ul style={{ fontSize: 'var(--font-sm)', marginLeft: 'var(--spacing-md)' }}>
              <li><strong>Surveys:</strong> Quick quantitative feedback</li>
              <li><strong>Testing:</strong> Task-based evaluation</li>
              <li><strong>Card Sorting:</strong> Information organization</li>
              <li><strong>Analysis:</strong> Expert review methods</li>
            </ul>
          </Card>
        </div>

        <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            Use the interactive decision tree on the home page to get personalized method recommendations
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            <Icon name="map-pin" size={16} />
            Go to Decision Tree
          </Button>
        </div>
      </Card>
    </div>
  );
} 