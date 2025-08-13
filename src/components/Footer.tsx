export default function Footer() {
  return (
    <footer style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{ 
        margin: 0,
        color: 'var(--color-text-tertiary)',
        fontSize: 'var(--font-sm)'
      }}>
        © 2024 UBank Research Playbook. Built with care for better user research.
      </p>
    </footer>
  );
} 