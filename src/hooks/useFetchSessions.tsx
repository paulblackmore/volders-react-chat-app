import { useQuery } from '@tanstack/react-query';
import { fetchSessions } from '../services';

export const useFetchSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });
};
