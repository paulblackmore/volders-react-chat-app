import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateNewChatSession } from '../services';

export const useNewSessionId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sessions'],
    mutationFn: generateNewChatSession,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  });
};
