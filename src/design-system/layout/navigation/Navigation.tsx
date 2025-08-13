import React from 'react';
import { Icon, IconName } from '../../components/icon';
import { designTokens } from '../../tokens';

export interface NavigationItem {
  to: string;
  icon: IconName;
  label: string;
}

export interface NavigationProps {
  /**
   * Array of navigation items to display
   */
  items: NavigationItem[];
  /**
   * Current active pathname for highlighting
   */
  activePathname?: string;
  /**
   * Custom link component to use (e.g., React Router Link, Next.js Link)
   * Defaults to standard anchor tag
   */
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }>;
  /**
   * Optional className for the nav element
   */
  className?: string;
  /**
   * Optional style overrides
   */
  style?: React.CSSProperties;
}

/**
 * A flexible navigation component that works with any routing solution
 * 
 * @example
 * // With React Router
 * import { Link, useLocation } from 'react-router-dom';
 * 
 * const RouterLink = ({ href, ...props }) => <Link to={href} {...props} />;
 * 
 * function App() {
 *   const location = useLocation();
 *   return (
 *     <Navigation
 *       items={navItems}
 *       activePathname={location.pathname}
 *       linkComponent={RouterLink}
 *     />
 *   );
 * }
 * 
 * @example
 * // With Next.js
 * import Link from 'next/link';
 * import { usePathname } from 'next/navigation';
 * 
 * function App() {
 *   const pathname = usePathname();
 *   return (
 *     <Navigation
 *       items={navItems}
 *       activePathname={pathname}
 *       linkComponent={Link}
 *     />
 *   );
 * }
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  activePathname,
  linkComponent: LinkComponent = 'a',
  className,
  style,
}) => {
  return (
    <nav
      className={className}
      style={{
        display: 'flex',
        gap: designTokens.spacing[12],
        padding: `${designTokens.spacing[12]} ${designTokens.spacing[24]}`,
        borderBottom: `1px solid var(--color-border-primary)`,
        marginBottom: designTokens.spacing[24],
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {items.map((item) => {
        const isActive = activePathname === item.to;
        
        const linkStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: designTokens.spacing[8],
          padding: `${designTokens.spacing[8]} ${designTokens.spacing[12]}`,
          borderRadius: designTokens.borders.radius.sm,
          backgroundColor: isActive 
            ? 'var(--color-surface-secondary)' 
            : 'transparent',
          color: isActive 
            ? 'var(--color-text-primary)' 
            : 'var(--color-text-secondary)',
          textDecoration: 'none',
          fontSize: designTokens.typography.fontSize.sm,
          fontWeight: isActive 
            ? designTokens.typography.fontWeight.medium 
            : designTokens.typography.fontWeight.normal,
          transition: 'all 0.2s ease',
          border: `1px solid ${
            isActive 
              ? 'var(--color-border-focus)' 
              : 'transparent'
          }`,
          cursor: 'pointer',
        };

        const linkContent = (
          <>
            <Icon 
              name={item.icon} 
              size={16} 
              color="currentColor" 
            />
            <span>{item.label}</span>
          </>
        );

        // Type assertion needed because LinkComponent could be a string or component
        const Link = LinkComponent as any;

        return (
          <Link
            key={item.to}
            href={item.to}
            style={linkStyle}
          >
            {linkContent}
          </Link>
        );
      })}
    </nav>
  );
}; 