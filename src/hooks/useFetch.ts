import useSWR from 'swr';
import { memoryFetcher } from './memoryFetcher';

export function useFetch<T = any>(url: string) {
  const { data, error } = useSWR<T>(url, memoryFetcher);

  const postAnswer = (questionId: number, userId: number, status: boolean) => {
  
    
  };

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
