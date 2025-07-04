// Data loading utility for CMS collections
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

// Load collection data from multiple files
export async function loadCollectionData<T>(pattern: string): Promise<T[]> {
  try {
    const modules = import.meta.glob('/src/data/**/*.json');
    const matchingModules = Object.keys(modules).filter(path => 
      path.includes(pattern)
    );
    
    const dataPromises = matchingModules.map(async (path) => {
      const module = await modules[path]() as { default: T };
      return module.default;
    });
    
    const data = await Promise.all(dataPromises);
    return data.filter(Boolean);
  } catch (error) {
    console.error(`Error loading collection data for ${pattern}:`, error);
    return [];
  }
}

// Load single file data
export async function loadSingleData<T>(filePath: string): Promise<T | null> {
  try {
    const module = await import(filePath);
    return module.default;
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    return null;
  }
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