# Icon Component

The Icon component provides access to the comprehensive icon library extracted from the Global Icons.svg file. All icons follow ubank's design system principles and can be easily customized.

## Usage

```tsx
import { Icon } from '../design-system';

// Basic usage
<Icon name="home" />

// With custom size and color
<Icon 
  name="palette" 
  size={32} 
  color="#00FFEA" 
/>

// Using design tokens
<Icon 
  name="components" 
  size={24} 
  color={designTokens.colors.secondary.default}
/>
```

## Available Icons

The component supports the following icon categories:

### Navigation Icons
- `home`, `palette`, `components`, `typography`, `colors`, `spacing`, `layout`, `tokens`

### Action Icons  
- `plus`, `minus`, `edit`, `delete`, `save`, `copy`, `share`, `download`, `upload`, `refresh`

### UI Icons
- `settings`, `user`, `notification`, `search`, `menu`, `close`, `check`

### Arrow & Chevron Icons
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`

### Status Icons
- `info`, `warning`, `error`, `success`, `help`

### File & Media Icons
- `document`, `folder`, `image`, `video`, `audio`

### Communication Icons  
- `calendar`, `clock`, `phone`, `mail`, `link`, `location`

### Content Icons
- `star`, `heart`, `bookmark`, `tag`, `filter`, `sort`

### Layout Icons
- `grid`, `list`, `card`, `table`, `chart`, `analytics`, `dashboard`

### Security Icons
- `security`, `lock`, `unlock`, `eye`, `eye-off`, `visibility`, `visibility-off`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | required | The name of the icon to display |
| `size` | `number \| string` | `24` | Size of the icon in pixels |
| `color` | `string` | `'currentColor'` | Color of the icon (CSS color value) |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Best Practices

1. **Use semantic icon names** - Choose icons that clearly represent their function
2. **Consistent sizing** - Use standard sizes (16px, 24px, 32px) for consistency
3. **Accessible colors** - Ensure sufficient contrast with background colors
4. **Use design tokens** - Reference `designTokens.colors` for brand-consistent colors

## Examples

```tsx
// Navigation icons with brand colors
<Icon name="home" color={designTokens.colors.secondary.default} />

// Status indicators
<Icon name="success" color={designTokens.colors.success.default} />
<Icon name="warning" color={designTokens.colors.warning.default} />
<Icon name="error" color={designTokens.colors.error.default} />

// Interactive elements
<Icon name="settings" size={20} />
<Icon name="search" size={18} />
```

## SVG Source

Icons are extracted from `Icons/Global Icons.svg` and converted to individual React components. The original SVG contains all path data which is mapped to semantic names in the component. 