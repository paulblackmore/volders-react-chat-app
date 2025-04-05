import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../../hooks/useFetchMessagesBySessionId';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { MessageFromApi } from '../../types/message';
import { messageStatusIndicator } from '../../helpers';

const MessageItem = ({ message }: { message: MessageFromApi }) => {
  const messagePosition = message.kind ? 'items-end' : 'items-start';
  const messageBgColor = message.status
    ? messageStatusIndicator[message.status]
    : 'bg-green-600';
  const messageStatus = message.kind
    ? 'recived'
    : message.status
    ? message.status
    : 'sent';

  return (
    <div className={`flex flex-col gap-4 ${messagePosition} w-210`}>
      <div
        className={`flex flex-col justify-center items-center ${messageBgColor} rounded-lg p-2 w-1/2 gap-1`}
      >
        <p className='font-semibold p-1'>{message.text}</p>
        <footer className='flex justify-between w-full'>
          <span className='text-xs'>{message.timestamp}</span>
          <span className='text-xs text-transform: capitalize'>
            {/* TODO: ask for status to be added to message entity */}
            {messageStatus}
          </span>
        </footer>
      </div>
    </div>
  );
};

export const MessageList = () => {
  const { sessionId } = useParams();
  const { data: messages } = useFetchMessagesBySessionId(sessionId || '');
  return (
    <div className='h-screen w-full mt-4'>
      {messages?.length ? (
        <div className='flex flex-col justify-start items-center w-full h-6/7 overflow-y-scroll'>
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
