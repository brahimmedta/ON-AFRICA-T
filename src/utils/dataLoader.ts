import { useState, useEffect } from 'react';

export interface DataLoaderResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface SettingsData {
  company_name: string;
  logo: string;
  phone: string;
  whatsapp: string;
  fax: string;
  email: string;
  bp: string;
  address: string;
}

export function useDataLoader<T>(filePath: string): DataLoaderResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure the path starts with / and points to the correct location
        let publicPath = filePath;
        if (!publicPath.startsWith('/')) {
          publicPath = `/${publicPath}`;
        }
        
        // Add cache busting parameter to avoid cached responses
        const cacheBuster = `?v=${Date.now()}`;
        const fullPath = `${publicPath}${cacheBuster}`;
        
        console.log(`Loading data from: ${fullPath}`);
        
        const response = await fetch(fullPath, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        });
        
        console.log(`Response status: ${response.status}`);
        console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          // Try to get the response text to see what was actually returned
          const responseText = await response.text();
          console.error(`HTTP ${response.status} error for ${publicPath}:`, responseText.substring(0, 200));
          throw new Error(`Failed to load ${publicPath}: HTTP ${response.status} - ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        console.log(`Content-Type: ${contentType}`);
        
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON but received:', {
            contentType,
            responseStart: text.substring(0, 200),
            url: fullPath
          });
          throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}. The file ${publicPath} may not exist or is not accessible.`);
        }
        
        const jsonData = await response.json();
        console.log(`Successfully loaded data from ${publicPath}:`, jsonData);
        
        if (isMounted) {
          setData(jsonData);
        }
      } catch (err) {
        console.error(`Error loading data from ${filePath}:`, err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [filePath]);

  return { data, loading, error };
}

export async function loadSingleData<T>(filePath: string): Promise<T> {
  try {
    // Ensure the path starts with / and points to the correct location
    let publicPath = filePath;
    if (!publicPath.startsWith('/')) {
      publicPath = `/${publicPath}`;
    }
    
    // Add cache busting parameter to avoid cached responses
    const cacheBuster = `?v=${Date.now()}`;
    const fullPath = `${publicPath}${cacheBuster}`;
    
    console.log(`Loading single data from: ${fullPath}`);
    
    const response = await fetch(fullPath, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error(`HTTP ${response.status} error for ${publicPath}:`, responseText.substring(0, 200));
      throw new Error(`Failed to load ${publicPath}: HTTP ${response.status} - ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON but received:', {
        contentType,
        responseStart: text.substring(0, 200),
        url: fullPath
      });
      throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}. The file ${publicPath} may not exist or is not accessible.`);
    }
    
    const jsonData = await response.json();
    console.log(`Successfully loaded single data from ${publicPath}:`, jsonData);
    
    return jsonData;
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    throw error;
  }
}

export function useMultipleDataLoader<T>(filePaths: string[]): DataLoaderResult<T[]> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Loading multiple data files:`, filePaths);
        
        const promises = filePaths.map(path => loadSingleData<T>(path));
        const results = await Promise.all(promises);
        
        console.log(`Successfully loaded ${results.length} data files`);
        
        if (isMounted) {
          setData(results);
        }
      } catch (err) {
        console.error('Error loading multiple data files:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAllData();

    return () => {
      isMounted = false;
    };
  }, [filePaths.join(',')]);

  return { data, loading, error };
}