export interface Resource {
  slug: string;
  title: string;
  icon: string;
  description: string;
  category: 'template' | 'guide';
}

export const resources: Resource[] = [
  { 
    slug: 'research-brief-template', 
    title: 'Research Brief Template', 
    icon: 'document',
    description: 'Structured template for defining research goals, questions, and methodology',
    category: 'template'
  },
  { 
    slug: 'recruitment-screener', 
    title: 'Recruitment Screener', 
    icon: 'users',
    description: 'Pre-built questions to find the right research participants',
    category: 'template'
  },
  { 
    slug: 'consent-form-template', 
    title: 'Consent Form Template', 
    icon: 'check-circle',
    description: 'GDPR-compliant consent forms for research participation',
    category: 'template'
  },
  { 
    slug: 'playback-presentation-template', 
    title: 'Playback Presentation Template', 
    icon: 'trending-up',
    description: 'Structured template for presenting research findings to stakeholders',
    category: 'template'
  },
  { 
    slug: 'universal-research-quality-checklist', 
    title: 'Universal Research Quality Checklist', 
    icon: 'document',
    description: 'Essential quality criteria that apply to all research methods',
    category: 'guide'
  },
  { 
    slug: 'bias-detection-guide', 
    title: 'Bias Detection Guide', 
    icon: 'alert-triangle',
    description: 'Common research biases and how to avoid them',
    category: 'guide'
  },
];

// Cache for loaded resource data
const resourceDataCache: Map<string, any> = new Map();

// Function to load resource data from JSON file
export async function loadResourceData(slug: string): Promise<any> {
  // Check cache first
  if (resourceDataCache.has(slug)) {
    return resourceDataCache.get(slug);
  }

  try {
    // Use dynamic import for JSON files
    const module = await import(`./resources/${slug}.json`);
    const data = module.default || module;
    resourceDataCache.set(slug, data);
    return data;
  } catch (error) {
    console.error(`Error loading resource data for ${slug}:`, error);
  }
  
  return null;
}

// Clear cache when data is updated
export function clearResourceCache(slug?: string) {
  if (slug) {
    resourceDataCache.delete(slug);
  } else {
    resourceDataCache.clear();
  }
} 