import React from 'react';
import { mapIconName } from '../../../utils/iconMapping';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** The name/identifier of the icon to display */
  name: IconName;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon (will be applied as fill) */
  color?: string;
}

// All available icon names from the Icons folder (181 icons)
export type IconName = 
  | '18-plus'
  | 'accounts-fill'
  | 'accounts'
  | 'address-book'
  | 'alcohol'
  | 'alert-circle-fill'
  | 'alert-circle'
  | 'alert-triangle-fill'
  | 'alert-triangle'
  | 'app-update'
  | 'apps'
  | 'arrow-left'
  | 'arrow-right'
  | 'atm'
  | 'bank'
  | 'bell-fill'
  | 'bell'
  | 'bills'
  | 'birth-certificate'
  | 'bolt'
  | 'bonus-interest'
  | 'book'
  | 'briefcase'
  | 'browser'
  | 'bullet-point'
  | 'bus'
  | 'buy-now-pay-later'
  | 'calculator'
  | 'calendar-time'
  | 'calendar'
  | 'call-centre'
  | 'call'
  | 'car-park'
  | 'car'
  | 'card-credit'
  | 'card-fill'
  | 'card'
  | 'cash'
  | 'category'
  | 'chat-fill'
  | 'chat'
  | 'check-circle-fill'
  | 'check-circle'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle-off'
  | 'clear'
  | 'click'
  | 'clock-recurring'
  | 'clock'
  | 'close'
  | 'clothing'
  | 'coffee'
  | 'coin-fill'
  | 'coin-stack'
  | 'coin'
  | 'copy'
  | 'council-rates-strata-landtax'
  | 'data-sharing'
  | 'device-disconnect'
  | 'device-mobile'
  | 'device-tablet'
  | 'devices-wearables'
  | 'digidots-fill'
  | 'digidots'
  | 'digital-wallet'
  | 'dining'
  | 'document'
  | 'dollar'
  | 'download'
  | 'ear'
  | 'edit'
  | 'education'
  | 'electronics'
  | 'eligibility'
  | 'email'
  | 'external-link'
  | 'face-id'
  | 'fees'
  | 'filter'
  | 'fingerprint'
  | 'food-delivery'
  | 'furniture-homewares'
  | 'games'
  | 'gift'
  | 'graph-money'
  | 'grid-fill'
  | 'grid'
  | 'gym'
  | 'hammer'
  | 'heart-broken'
  | 'heart'
  | 'hide'
  | 'home-dollar'
  | 'home-fill'
  | 'home-neat'
  | 'home-own-fixed'
  | 'home-own-var'
  | 'home'
  | 'id-card'
  | 'info-circle-fill'
  | 'info-circle'
  | 'interest'
  | 'key'
  | 'licence'
  | 'link'
  | 'lock'
  | 'logout'
  | 'lottery-gambling'
  | 'map-pin'
  | 'medical'
  | 'menu-close'
  | 'menu-open'
  | 'menu'
  | 'merchant'
  | 'minus-circle'
  | 'minus'
  | 'money-bag'
  | 'more'
  | 'paperclip'
  | 'passkey'
  | 'password'
  | 'payday'
  | 'pending'
  | 'percentage'
  | 'petrol'
  | 'pets'
  | 'photo'
  | 'pizza'
  | 'plane'
  | 'plant'
  | 'player-pause'
  | 'player-play'
  | 'plus-circle'
  | 'plus'
  | 'product'
  | 'promo-bonus'
  | 'question-fill'
  | 'question-mark'
  | 'question'
  | 'read'
  | 'receipt'
  | 'refresh'
  | 'refunds'
  | 'rent'
  | 'reorder'
  | 'retry'
  | 'rewards'
  | 'save-contact'
  | 'save'
  | 'scale'
  | 'scissors'
  | 'search'
  | 'security-question'
  | 'send'
  | 'settings'
  | 'setup'
  | 'share-android'
  | 'share'
  | 'shield-check'
  | 'shield'
  | 'shopping-bag'
  | 'shopping-basket'
  | 'shopping-cart'
  | 'show'
  | 'spend-fill'
  | 'spend'
  | 'split'
  | 'square-check'
  | 'square'
  | 'star'
  | 'swap'
  | 'target'
  | 'tasks'
  | 'taxes'
  | 'theme'
  | 'thumb-down'
  | 'thumb-up'
  | 'tick-verified'
  | 'ticket'
  | 'tool'
  | 'touch-id'
  | 'transfer-in'
  | 'transfer-out'
  | 'transfers'
  | 'trash'
  | 'trending-up'
  | 'unread'
  | 'user-fill'
  | 'user'
  | 'users'
  | 'volume-off'
  | 'volume'
  | 'wand';

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className,
  style,
  ...props 
}) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  
  // Map icon name if it has fa- prefix
  const mappedName = mapIconName(name);

  React.useEffect(() => {
    let isMounted = true;
    
    const loadIcon = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Import the SVG file dynamically
        const basePath = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${basePath}Icons/${mappedName}.svg`);
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${mappedName}`);
        }
        
        const svgText = await response.text();
        
        if (isMounted) {
          setSvgContent(svgText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Error loading icon "${name}":`, error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [mappedName]);

  if (isLoading) {
    // Show a placeholder while loading
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          ...style,
        }}
        {...props}
      >
        <circle 
          cx="12" 
          cy="12" 
          r="8" 
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>
    );
  }

  if (hasError) {
    // Show an error icon if loading failed
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          ...style,
        }}
        {...props}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          fill={color}
        />
      </svg>
    );
  }

  // Parse the SVG content and apply custom styling
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // Update attributes
  svgElement.setAttribute('width', size.toString());
  svgElement.setAttribute('height', size.toString());
  
  // Apply color to all path elements if color is specified
  if (color !== 'currentColor') {
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
      path.setAttribute('fill', color);
    });
  }

  // Add custom className and style
  if (className) {
    svgElement.setAttribute('class', className);
  }

  // Apply inline styles
  const combinedStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style,
  };

  const styleString = Object.entries(combinedStyle)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
    .join('; ');

  svgElement.setAttribute('style', styleString);

  // Apply any additional props
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      svgElement.setAttribute(key, value.toString());
    }
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
      style={{ display: 'inline-block', lineHeight: 0 }}
    />
  );
}; 