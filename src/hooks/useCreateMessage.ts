import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMesssage } from '../services';

export const useCreateMessage = (sessionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['messages', sessionId],
    mutationFn: createMesssage,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['messages', sessionId] }),
  });
};
