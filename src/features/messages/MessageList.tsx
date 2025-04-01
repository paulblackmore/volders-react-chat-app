import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../../hooks/useFetchMessagesBySessionId';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { MessageFromApi } from '../../types/message';

const MessageItem = ({ message }: { message: MessageFromApi }) => (
  <div className='flex flex-col justify-center items-center bg-slate-500 rounded-lg p-4 w-3/4 gap-4'>
    <p>{message.text}</p>
    <footer className='flex justify-between w-full'>
      <span className='text-sm'>{message.timestamp}</span>
      <span className='text-sm'>Sent</span>
    </footer>
  </div>
);

export const MessageList = () => {
  const { sessionId } = useParams();
  const { data: messages } = useFetchMessagesBySessionId(sessionId || '');

  return (
    <div className='flex flex-col gap-4 justify-start items-center h-screen w-full mt-4'>
      {messages?.length ? (
        messages.map((message: MessageFromApi) => (
          <MessageItem key={message.id} message={message} />
        ))
      ) : (
        <EmptyChatHistory />
      )}
    </div>
  );
};
