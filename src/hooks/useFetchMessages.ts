import { useQuery } from '@tanstack/react-query';
import { fetchMessagesBySessionId } from '../services';

export const useFetchSessions = (sessionId: string) => {
  return useQuery({
    queryKey: ['messages', sessionId],
    queryFn: fetchMessagesBySessionId,
    enabled: !!sessionId,
  });
};
