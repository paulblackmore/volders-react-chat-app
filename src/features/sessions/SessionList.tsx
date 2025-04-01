import { useFetchSessions } from '../../hooks';
import { Session } from '../../types';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { Link } from 'react-router-dom';

const SessionItem = ({ sessionId }: { sessionId: string }) => (
  // TODO: hightlight active chat
  <Link
    className='cursor-pointer p-4 border hover:border-green-500 w-full'
    key={sessionId}
    to={{
      pathname: `session/${sessionId}`,
    }}
  >
    {sessionId}
  </Link>
);

export const SessionList = () => {
  const {
    data: sessions,
    isLoading,
    isError,
    isRefetching,
  } = useFetchSessions();

  return isLoading || isRefetching ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <div className='flex flex-col justify-center items-center gap-3'>
      {sessions?.length ? (
        sessions.map((session: Session) => (
          <SessionItem key={session.sessionId} sessionId={session.sessionId} />
        ))
      ) : (
        <EmptyChatHistory />
      )}
    </div>
  );
};
