// Utility function to get the correct path with base URL
export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if base already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Handle special encoding issues in filenames
  // Replace Unicode narrow no-break space with regular space
  const fixedPath = cleanPath.replace(/[\u202F\u00A0\u2009\u200A\u200B\u200C\u200D\u2060\uFEFF]/g, ' ');
  
  return `${base}${fixedPath}`;
}; 