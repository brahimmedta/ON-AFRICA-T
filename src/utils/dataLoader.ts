import { useState, useEffect } from 'react';

export interface DataLoaderResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
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
        
        // Convert relative path to absolute path from public directory
        const publicPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        
        const response = await fetch(publicPath);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON but received:', text.substring(0, 100));
          throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
        }
        
        const jsonData = await response.json();
        
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
    // Convert relative path to absolute path from public directory
    const publicPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    
    const response = await fetch(publicPath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON but received:', text.substring(0, 100));
      throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
    }
    
    return await response.json();
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
        
        const promises = filePaths.map(path => loadSingleData<T>(path));
        const results = await Promise.all(promises);
        
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