import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMesssage } from '../services';
import { MessageFromApi } from '../types/message';

export const useCreateMessage = (sessionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['messages', sessionId],
    mutationFn: createMesssage,
    retry: 0, // stop retrying mutation
    onMutate: (res) => {
      // Optimistic update of message cache
      queryClient.setQueryData(
        ['messages', sessionId],
        (prevMessages: MessageFromApi[]) => [
          ...prevMessages,
          {
            ...res.message,
            timestamp: new Date().getTime(),
            status: 'pending', // set status to pending when performing optimistic update
          },
        ]
      );
    },
    onSuccess: (_, res) => {
      // Update message status in cache when successfully sent
      queryClient.setQueryData(
        ['messages', sessionId],
        (prevMessages: MessageFromApi[]) =>
          prevMessages.map((prevMessage) => {
            if (prevMessage.id === res.message.id) {
              return { ...prevMessage, status: 'sent' };
            }
            return prevMessage;
          })
      );
    },
    onError: (_, res) => {
      // Remove message from cache if process failed
      queryClient.setQueryData(
        ['messages', sessionId],
        (prevMessages: MessageFromApi[]) =>
          prevMessages.filter(
            (prevMessage) => prevMessage.id !== res.message.id
          )
      );
    },
    onSettled: (_, error) => {
      // Invalidate messages cache when mutatuon has settled
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: ['messages', sessionId],
        });
      }
    },
  });
};
