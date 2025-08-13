import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();
  
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/resources', label: 'Resources' },
    { to: '/analysis', label: 'Analysis' }
  ];

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--spacing-md) var(--spacing-xl)',
      backgroundColor: 'var(--color-background)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        fontSize: 'var(--font-xl)', 
        fontWeight: 'var(--font-weight-bold)' 
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: 'var(--color-text-primary)' 
        }}>
          UBank Research Playbook
        </Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <nav style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
                           (item.to.includes('#') && location.pathname === '/');
            
            return item.to.includes('#') ? (
              <a 
                key={item.to}
                href={item.to}
                style={{
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.2s',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                style={({ isActive }) => ({
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.2s',
                  border: '1px solid transparent'
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
} 