import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../../hooks/useFetchMessagesBySessionId';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { MessageFromApi } from '../../types/message';
import { messageStatusIndicator } from '../../helpers';

const MessageItem = ({ message }: { message: MessageFromApi }) => {
  const messageBgColor = message.status
    ? messageStatusIndicator[message.status]
    : 'bg-green-600';

  return (
    <div
      className={`flex flex-col justify-center items-center ${messageBgColor} rounded-lg p-2 w-3/4 gap-1`}
    >
      <p className='text-sm font-semibold p-1'>{message.text}</p>
      <footer className='flex justify-between w-full'>
        <span className='text-xs'>{message.timestamp}</span>
        <span className='text-xs text-transform: capitalize'>
          {/* TODO: ask for status to be added to message entity */}
          {message.status ? message.status : 'sent'}
        </span>
      </footer>
    </div>
  );
};

export const MessageList = () => {
  const { sessionId } = useParams();
  const { data: messages } = useFetchMessagesBySessionId(sessionId || '');

  return (
    <div className='h-screen w-full mt-4'>
      {messages?.length ? (
        <div className=' flex flex-col gap-2 justify-start items-center w-full h-6/7 overflow-y-scroll'>
          {messages.map((message: MessageFromApi) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      ) : (
        <EmptyChatHistory />
      )}
    </div>
  );
};
