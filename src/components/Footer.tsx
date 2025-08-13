export default function Footer() {
  return (
    <footer style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        © 2024 Ubank Research Playbook. Built with care for better user research.
      </p>
    </footer>
  );
} 