// Data loading utility for CMS collections with cache busting
export interface ServiceData {
  title: string;
  description: string;
  image: string;
  icon: string;
  price_range?: string;
  duration?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  year: number;
  location?: string;
  client?: string;
  category: string;
}

export interface PartnerData {
  name: string;
  description: string;
  logo: string;
  website?: string;
  email?: string;
  partnership_type: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  experience_years: number;
  projects_count: number;
  partners_count: number;
  satisfaction_rate: number;
}

export interface DirectorData {
  photo1: string;
  photo2: string;
  message1: string;
  message2: string;
  message3: string;
  position: string;
}

export interface SettingsData {
  company_name: string;
  phone: string;
  fax: string;
  whatsapp: string;
  email: string;
  bp: string;
  address: string;
  logo: string;
}

// Cache for loaded data
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load collection data from multiple files with cache busting
export async function loadCollectionData<T>(pattern: string): Promise<T[]> {
  const cacheKey = `collection_${pattern}`;
  const now = Date.now();
  
  // Check cache first
  const cached = dataCache.get(cacheKey);
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Using cached data for ${pattern}`);
    return cached.data;
  }
  
  try {
    console.log(`🔄 Loading fresh data for ${pattern}...`);
    
    // Add cache busting parameter
    const cacheBuster = `?v=${now}`;
    const modules = import.meta.glob('/src/data/**/*.json');
    const matchingModules = Object.keys(modules).filter(path => 
      path.includes(pattern)
    );
    
    const dataPromises = matchingModules.map(async (path) => {
      try {
        // Force fresh load by adding cache buster
        const response = await fetch(path.replace('/src', '') + cacheBuster);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.warn(`Failed to load ${path}:`, error);
        // Fallback to import if fetch fails
        const module = await modules[path]() as { default: T };
        return module.default;
      }
    });
    
    const data = await Promise.all(dataPromises);
    const filteredData = data.filter(Boolean);
    
    // Cache the result
    dataCache.set(cacheKey, { data: filteredData, timestamp: now });
    
    console.log(`✅ Loaded ${filteredData.length} items for ${pattern}`);
    return filteredData;
  } catch (error) {
    console.error(`Error loading collection data for ${pattern}:`, error);
    
    // Return cached data if available, even if expired
    if (cached) {
      console.log(`⚠️ Using expired cache for ${pattern} due to error`);
      return cached.data;
    }
    
    return [];
  }
}

// Load single file data with cache busting
export async function loadSingleData<T>(filePath: string): Promise<T | null> {
  const cacheKey = `single_${filePath}`;
  const now = Date.now();
  
  // Check cache first
  const cached = dataCache.get(cacheKey);
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Using cached data for ${filePath}`);
    return cached.data;
  }
  
  try {
    console.log(`🔄 Loading fresh data for ${filePath}...`);
    
    // Add cache busting parameter
    const cacheBuster = `?v=${now}`;
    
    try {
      // Try fetch first for fresh data
      const response = await fetch(filePath.replace('../', '/') + cacheBuster);
      if (response.ok) {
        const data = await response.json();
        // Cache the result
        dataCache.set(cacheKey, { data, timestamp: now });
        console.log(`✅ Loaded fresh data for ${filePath}`);
        return data;
      }
    } catch (fetchError) {
      console.warn(`Fetch failed for ${filePath}, trying import:`, fetchError);
    }
    
    // Fallback to import
    const module = await import(filePath);
    const data = module.default;
    
    // Cache the result
    dataCache.set(cacheKey, { data, timestamp: now });
    
    console.log(`✅ Loaded data for ${filePath} via import`);
    return data;
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    
    // Return cached data if available, even if expired
    if (cached) {
      console.log(`⚠️ Using expired cache for ${filePath} due to error`);
      return cached.data;
    }
    
    return null;
  }
}

// Clear cache function for manual refresh
export function clearDataCache() {
  dataCache.clear();
  console.log('🗑️ Data cache cleared');
}

// Force refresh data
export async function refreshData<T>(pattern: string): Promise<T[]> {
  const cacheKey = `collection_${pattern}`;
  dataCache.delete(cacheKey);
  return loadCollectionData<T>(pattern);
}

// Force refresh single data
export async function refreshSingleData<T>(filePath: string): Promise<T | null> {
  const cacheKey = `single_${filePath}`;
  dataCache.delete(cacheKey);
  return loadSingleData<T>(filePath);
}

// Icon mapping for services
export const iconMap = {
  Building: 'Building',
  Hammer: 'Hammer',
  Sprout: 'Sprout',
  Droplets: 'Droplets',
  Truck: 'Truck',
  Wrench: 'Wrench',
  Plus: 'Plus'
} as const;

export type IconName = keyof typeof iconMap;

// Auto-refresh data every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    console.log('🔄 Auto-refreshing data cache...');
    clearDataCache();
  }, 5 * 60 * 1000);
}