import { useNewSessionId } from '../hooks';
import { v4 as uuidv4 } from 'uuid';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { GenerateNewSession } from '../features/sessions/GenerateNewSession';

export const NewChatSession = () => {
  const { mutate, isPending, isError } = useNewSessionId();

  return isPending ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <GenerateNewSession
      handleNewSession={() => mutate({ sessionId: uuidv4() })}
    />
  );
};
