import { useQuery } from '@tanstack/react-query';
import { fetchMessagesBySessionId } from '../services';

export const useFetchMessagesBySessionId = (sessionId: string) => {
  return useQuery({
    queryKey: ['messages', sessionId],
    queryFn: () => fetchMessagesBySessionId(sessionId),
    enabled: !!sessionId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
