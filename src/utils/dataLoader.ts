// Data loading utility for CMS collections with proper JSON handling
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

// Load collection data from multiple files
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
    
    // Define known data files for each collection
    const collectionFiles: Record<string, string[]> = {
      services: [
        '/data/services/construction.json',
        '/data/services/terrassement.json',
        '/data/services/amenagement-agricole.json',
        '/data/services/adduction-eau.json',
        '/data/services/logistique.json',
        '/data/services/location-engins.json'
      ],
      projects: [
        '/data/projects/2024-batiment-industriel.json',
        '/data/projects/2024-terrassement-infrastructure.json',
        '/data/projects/2023-amenagement-agricole.json',
        '/data/projects/2023-adduction-eau.json'
      ],
      partners: [
        '/data/partners/partenaires-internationaux.json',
        '/data/partners/partenaires-locaux.json',
        '/data/partners/institutions-publiques.json',
        '/data/partners/partenaires-financiers.json'
      ]
    };
    
    const files = collectionFiles[pattern] || [];
    
    const dataPromises = files.map(async (filePath) => {
      try {
        // Add cache busting parameter
        const cacheBuster = `?v=${now}`;
        const response = await fetch(filePath + cacheBuster);
        
        if (!response.ok) {
          console.warn(`Failed to fetch ${filePath}: ${response.status}`);
          return null;
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.warn(`Error loading ${filePath}:`, error);
        return null;
      }
    });
    
    const results = await Promise.all(dataPromises);
    const data = results.filter(Boolean); // Remove null values
    
    // Cache the result
    dataCache.set(cacheKey, { data, timestamp: now });
    
    console.log(`✅ Loaded ${data.length} items for ${pattern}`);
    return data;
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

// Load single file data with proper JSON handling
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
    
    // Convert relative path to absolute path
    const absolutePath = filePath.replace('../', '/');
    
    // Add cache busting parameter
    const cacheBuster = `?v=${now}`;
    
    const response = await fetch(absolutePath + cacheBuster);
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${absolutePath}: ${response.status}`);
      
      // Return cached data if available, even if expired
      if (cached) {
        console.log(`⚠️ Using expired cache for ${filePath} due to fetch error`);
        return cached.data;
      }
      
      return null;
    }
    
    const data = await response.json();
    
    // Cache the result
    dataCache.set(cacheKey, { data, timestamp: now });
    
    console.log(`✅ Loaded fresh data for ${filePath}`);
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