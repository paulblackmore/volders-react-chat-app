import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../hooks/useFetchMessagesBySessionId';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { MessageList, MessageForm } from '../features/messages';

export const ChatSession = () => {
  const { sessionId } = useParams();
  const { isLoading, isError } = useFetchMessagesBySessionId(sessionId || '');

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <MessageList />
      <footer className='fixed bottom-0 w-2/4 mb-4'>
        <MessageForm />
      </footer>
    </div>
  );
};
