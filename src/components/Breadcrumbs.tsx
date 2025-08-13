import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { methods, getMethodsWithUpdatedTitles, Method } from '../data/methods';
import { resources, Resource } from '../data/resources';
import { Icon } from '../design-system';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dynamicMethods, setDynamicMethods] = useState<Method[]>(methods);
  const [currentMethodTitle, setCurrentMethodTitle] = useState<string>('');

  // Load method titles from JSON files
  useEffect(() => {
    const loadMethods = async () => {
      const updatedMethods = await getMethodsWithUpdatedTitles();
      setDynamicMethods(updatedMethods);
      
      // Set current method title
      if (slug) {
        const currentMethod = updatedMethods.find(m => m.slug === slug);
        if (currentMethod) {
          let cleanTitle = currentMethod.title;
          if (cleanTitle.includes(' - ')) {
            cleanTitle = cleanTitle.split(' - ')[0];
          }
          setCurrentMethodTitle(cleanTitle);
        }
      }
    };
    loadMethods();

    // Listen for method data updates
    const handleMethodUpdate = () => {
      loadMethods();
    };
    
    window.addEventListener('methodDataUpdated', handleMethodUpdate);
    return () => window.removeEventListener('methodDataUpdated', handleMethodUpdate);
  }, [slug]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (pathSegments.length === 0) {
      // On home page, don't show breadcrumbs
      return [];
    }

    // Handle different routes
    if (pathSegments[0] === 'methods' && slug) {
      // Method page: Research Methods > [Method Name]
      breadcrumbs.push({ 
        label: window.innerWidth < 768 ? 'Methods' : 'Research Methods', 
        path: '/#methods' 
      });
      
      const method = dynamicMethods.find(m => m.slug === slug);
      if (method) {
        // Clean up the method title - remove redundant words
        let cleanTitle = method.title;
        if (cleanTitle.includes(' - ')) {
          cleanTitle = cleanTitle.split(' - ')[0];
        }
        breadcrumbs.push({ label: cleanTitle });
      } else {
        breadcrumbs.push({ label: 'Method Not Found' });
      }
    } else if (pathSegments[0] === 'resources') {
      if (pathSegments[1]) {
        // Resource detail page
        breadcrumbs.push({ 
          label: window.innerWidth < 768 ? 'Resources' : 'Resources & Templates', 
          path: '/resources' 
        });
        
        const resource = resources.find(r => r.slug === pathSegments[1]);
        if (resource) {
          breadcrumbs.push({ label: resource.title });
        }
      } else {
        // Resources list page: Just show Resources & Templates
        breadcrumbs.push({ 
          label: window.innerWidth < 768 ? 'Resources' : 'Resources & Templates' 
        });
      }
    } else if (pathSegments[0] === 'analysis') {
      // Analysis page: Just show Decision Tree Analysis
      breadcrumbs.push({ 
        label: window.innerWidth < 768 ? 'Analysis' : 'Decision Tree Analysis' 
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const currentMethod = dynamicMethods.find(m => m.slug === slug);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div style={{
      marginBottom: 'var(--spacing-lg)',
      padding: 'var(--spacing-sm) 0',
      fontSize: 'var(--font-sm)',
      color: 'var(--color-text-secondary)'
    }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-md)'
      }}>
        <ol style={{ 
          display: 'flex', 
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: 'var(--spacing-xs)',
          flexWrap: 'wrap',
          flex: 1
        }}>
          {breadcrumbs.map((crumb, index) => (
            <li key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-xs)' 
            }}>
              {index > 0 && (
                <Icon 
                  name="chevron-right" 
                  size={14} 
                  color="var(--color-text-tertiary)" 
                  style={{ flexShrink: 0 }}
                />
              )}
              {crumb.path ? (
                <Link 
                  to={crumb.path} 
                  style={{ 
                    color: 'var(--color-primary)', 
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ 
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap'
                }}>
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Method Dropdown - only show on method pages */}
        {currentMethod && (
          <div ref={dropdownRef} style={{ 
            position: 'relative',
            flexShrink: 0
          }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-background-tertiary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <span>Switch Method</span>
              <Icon name="chevron-down" size={14} />
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + var(--spacing-xs))',
                right: 0,
                minWidth: '250px',
                maxWidth: window.innerWidth < 768 ? 'calc(100vw - 2rem)' : 'none',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto',
              }}>
                {dynamicMethods.map((method) => {
                  const isActive = method.slug === slug;
                  let cleanTitle = method.title;
                  if (cleanTitle.includes(' - ')) {
                    cleanTitle = cleanTitle.split(' - ')[0];
                  }
                  
                  return (
                    <button
                      key={method.slug}
                      onClick={() => {
                        navigate(`/methods/${method.slug}`);
                        setDropdownOpen(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'var(--color-text-primary)',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 'var(--font-sm)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {cleanTitle}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
} 