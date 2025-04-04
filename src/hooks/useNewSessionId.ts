import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateNewChatSession } from '../services';
import { useNavigate } from 'react-router-dom';

export const useNewSessionId = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sessions'],
    mutationFn: generateNewChatSession,
    onSuccess: ({ sessionId }: { sessionId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      // Navigate to new session route
      navigate(`session/${sessionId}`);
    },
  });
};
