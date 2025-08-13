export interface Method {
  slug: string;
  title: string;
  icon: string; // Font Awesome class
}

export const methods: Method[] = [
  { slug: 'comprehension-survey', title: 'Comprehension Survey', icon: 'fa-brain' },
  { slug: 'usability-testing', title: 'Usability Testing', icon: 'fa-mouse-pointer' },
  { slug: 'moderated-usability-testing', title: 'Moderated Usability Testing', icon: 'fa-comments' },
  { slug: 'card-sorting', title: 'Card Sorting', icon: 'fa-layer-group' },
  { slug: 'tree-testing', title: 'Tree Testing', icon: 'fa-sitemap' },
  { slug: 'survey', title: 'Survey Research', icon: 'fa-clipboard-list' },
  { slug: 'benchmarking-analysis', title: 'Benchmarking Analysis', icon: 'fa-chart-bar' },
  { slug: 'diary-study', title: 'Diary Study', icon: 'fa-book' },
  { slug: 'ab-testing', title: 'A/B Testing', icon: 'fa-vial' },
  { slug: 'heuristic-analysis', title: 'Heuristic Analysis', icon: 'fa-list-check' },
];

// Cache for loaded method data
const methodDataCache: Map<string, any> = new Map();

// Function to load method data from JSON file
export async function loadMethodData(slug: string): Promise<any> {
  // Check cache first
  if (methodDataCache.has(slug)) {
    return methodDataCache.get(slug);
  }

  try {
    // Use dynamic import for JSON files
    const module = await import(`./methods/${slug}.json`);
    const data = module.default || module;
    methodDataCache.set(slug, data);
    return data;
  } catch (error) {
    console.error(`Error loading method data for ${slug}:`, error);
  }
  
  return null;
}

// Function to get methods with updated titles from JSON files
export async function getMethodsWithUpdatedTitles(): Promise<Method[]> {
  const updatedMethods = await Promise.all(
    methods.map(async (method) => {
      const data = await loadMethodData(method.slug);
      if (data && data.title) {
        return { ...method, title: data.title };
      }
      return method;
    })
  );
  
  return updatedMethods;
}

// Clear cache when data is updated
export function clearMethodCache(slug?: string) {
  if (slug) {
    methodDataCache.delete(slug);
  } else {
    methodDataCache.clear();
  }
} 