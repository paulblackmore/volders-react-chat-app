import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMesssage } from '../services';
import { MessageFromApi } from '../types/message';

export const useCreateMessage = (sessionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['messages', sessionId],
    mutationFn: createMesssage,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', sessionId] });
    },
    onMutate: (variables) => {
      // Optimistic update of message state
      // TODO add mutation status to chache
      queryClient.setQueryData(
        ['messages', sessionId],
        (prevMessages: MessageFromApi[]) => [
          ...prevMessages,
          { ...variables.message },
        ]
      );
    },
  });
};
