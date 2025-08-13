import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Icon } from '../design-system';
import { designTokens } from '../design-system/tokens';

const headerStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${designTokens.spacing[16]} ${designTokens.spacing[24]}`,
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    minHeight: '64px'
  },
  logo: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.bold
  },
  logoLink: {
    textDecoration: 'none',
    color: 'var(--color-text-primary)'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: designTokens.spacing[16]
  },
  navContainer: {
    display: 'flex',
    gap: designTokens.spacing[8]
  },
  mobileNav: {
    display: 'none',
    alignItems: 'center',
    gap: designTokens.spacing[8]
  },
  menuButton: {
    background: 'none',
    border: 'none',
    padding: designTokens.spacing[8],
    cursor: 'pointer',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px',
    minHeight: '44px',
    borderRadius: designTokens.borders.radius.sm
  },
  mobileMenu: {
    position: 'fixed' as const,
    top: '64px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-background)',
    zIndex: 999,
    padding: designTokens.spacing[16],
    borderTop: '1px solid var(--color-border)'
  },
  mobileNavItems: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: designTokens.spacing[8]
  }
};

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/resources', label: 'Resources' },
    { to: '/analysis', label: 'Analysis' }
  ];

  const getNavLinkStyle = (isActive: boolean) => ({
    padding: `${designTokens.spacing[8]} ${designTokens.spacing[16]}`,
    borderRadius: designTokens.borders.radius.md,
    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)',
    textDecoration: 'none',
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: 'all 0.2s',
    border: '1px solid transparent',
    display: 'inline-block'
  });

  const getMobileNavLinkStyle = (isActive: boolean) => ({
    padding: `${designTokens.spacing[16]} ${designTokens.spacing[24]}`,
    borderRadius: designTokens.borders.radius.md,
    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-secondary)',
    color: isActive ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)',
    textDecoration: 'none',
    fontSize: designTokens.typography.fontSize.base,
    fontWeight: designTokens.typography.fontWeight.medium,
    textAlign: 'center' as const,
    display: 'block',
    width: '100%'
  });

  return (
    <>
      <header style={headerStyles.container}>
        <div style={headerStyles.logo}>
          <Link to="/" style={headerStyles.logoLink}>
            {isMobile ? 'UBank' : 'UBank Research Playbook'}
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={headerStyles.desktopNav}>
            <nav style={headerStyles.navContainer}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={getNavLinkStyle(isActive)}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <ThemeToggle />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div style={{ ...headerStyles.mobileNav, display: 'flex' }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={headerStyles.menuButton}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={headerStyles.mobileMenu}>
          <nav style={headerStyles.mobileNavItems}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={getMobileNavLinkStyle(isActive)}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
} 