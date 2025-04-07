import { useParams } from 'react-router-dom';
import { useFetchMessagesBySessionId } from '../../hooks/useFetchMessagesBySessionId';
import { EmptyChatHistory } from '../../components/EmptyChatHistory';
import { MessageFromApi } from '../../types/message';
import { messageStatusIndicator } from '../../helpers';
import { MessageItem as Message } from './MessageItem';

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
    <Message position={messagePosition} BgColor={messageBgColor}>
      <Message.Text text={message.text} />
      <Message.Footer>
        <Message.TimeStamp timestamp={message.timestamp} />
        {/* TODO: ask for status to be added to message entity */}
        <Message.Status status={messageStatus} />
      </Message.Footer>
    </Message>
  );
};

export const MessageList = () => {
  const { sessionId } = useParams();
  const { data: messages } = useFetchMessagesBySessionId(sessionId || '');
  return (
    <div className='h-screen w-full mt-4'>
      {messages?.length ? (
        <div className='flex flex-col justify-start items-center w-full h-185 overflow-y-scroll'>
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
