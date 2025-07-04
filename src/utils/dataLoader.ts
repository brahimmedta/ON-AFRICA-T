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
        
        // Ensure the path starts with / for absolute path
        const publicPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        
        console.log(`Loading data from: ${publicPath}`);
        
        const response = await fetch(publicPath, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-cache'
        });
        
        console.log(`Response status: ${response.status}`);
        console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const responseText = await response.text();
          console.error(`HTTP ${response.status} error for ${publicPath}:`, responseText.substring(0, 200));
          throw new Error(`Failed to load ${publicPath}: HTTP ${response.status} - ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        console.log(`Content-Type: ${contentType}`);
        
        // Try to parse as JSON regardless of content-type header
        let jsonData;
        try {
          const text = await response.text();
          jsonData = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          throw new Error(`Invalid JSON format in ${publicPath}`);
        }
        
        if (isMounted) {
          setData(jsonData);
          console.log(`Successfully loaded: ${publicPath}`);
        }
      } catch (err) {
        console.error(`Error loading ${filePath}:`, err);
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
    const publicPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    
    console.log(`Loading single data from: ${publicPath}`);
    
    const response = await fetch(publicPath, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache'
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error(`HTTP ${response.status} error for ${publicPath}:`, responseText.substring(0, 200));
      throw new Error(`Failed to load ${publicPath}: HTTP ${response.status} - ${response.statusText}`);
    }
    
    // Try to parse as JSON regardless of content-type header
    let jsonData;
    try {
      const text = await response.text();
      jsonData = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      throw new Error(`Invalid JSON format in ${publicPath}`);
    }
    
    console.log(`Successfully loaded single data from ${publicPath}`);
    return jsonData;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
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