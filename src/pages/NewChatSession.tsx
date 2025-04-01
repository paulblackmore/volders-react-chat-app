import { useNewSessionId } from '../hooks';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { StartNewChatSession } from '../features/sessions/StartNewChatSession';

export const NewChatSession = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useNewSessionId();

  const handleNewSession = () =>
    mutate(
      {
        sessionId: uuidv4(),
      },
      {
        onSuccess: ({ sessionId }: { sessionId: string }) => {
          navigate(`session/${sessionId}`);
        },
      }
    );

  return isPending ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <StartNewChatSession handleNewSession={handleNewSession} />
  );
};
