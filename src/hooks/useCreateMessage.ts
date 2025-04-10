import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMesssage } from '../services';
import { MessageFromApi } from '../types/message';
import { FailedMessageContext } from '../features/messages/contexts';

export const useCreateMessage = (sessionId: string) => {
  const queryClient = useQueryClient();
  const { setFailedMessages } = useContext(FailedMessageContext);

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
            timestamp: new Date().getTime(), // add temporary timestamp to match UI
            status: 'sending', // set status to sending when performing optimistic update
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
      // Invalidate messages cache when mutatuon has settled
      queryClient.invalidateQueries({
        queryKey: ['messages', sessionId],
      });
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
      // Add failed message content to failed message context
      setFailedMessages((prevMessages) => [...prevMessages, { ...res }]);
    },
  });
};
