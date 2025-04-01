import { useFetchSessions } from '../../hooks';
import { Session } from '../../types';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { Link, useLocation } from 'react-router-dom';

const SessionItem = ({ id }: { id: string }) => {
  const location = useLocation();
  const sessionId = location.pathname.split('/')[2];
  return (
    <Link
      className={`cursor-pointer p-4 border hover:border-green-500 w-full ${
        sessionId === id ? 'border-orange-500' : ''
      }`}
      key={id}
      to={{
        pathname: `session/${id}`,
      }}
    >
      {id}
    </Link>
  );
};

export const SessionList = () => {
  const { data: sessions, isLoading, isError } = useFetchSessions();

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <div className='flex flex-col justify-center items-center gap-3'>
      {sessions?.length ? (
        sessions.map((session: Session) => (
          <SessionItem key={session.sessionId} id={session.sessionId} />
        ))
      ) : (
        <EmptyChatHistory />
      )}
    </div>
  );
};
