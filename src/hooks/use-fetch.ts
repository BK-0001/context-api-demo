import { useEffect, useState } from "react";

const INITIAL_OPTIONS: RequestInit = {
  headers: {
    "Content-Type": "application/json"
  }
};

export function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(url, { ...INITIAL_OPTIONS, ...options });

        if (!response.ok) {
          throw new Error(
            "Something has gone wrong while getting the articles"
          );
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const post = async (getUrl?: RequestInfo | URL, options?: RequestInit) => {
    try {
      setIsLoading(true);

      const response = await fetch(getUrl || url, {
        ...INITIAL_OPTIONS,
        ...options
      });

      if (!response.ok) {
        throw new Error("");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, post };
}
