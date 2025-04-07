import { useContext } from 'react';
import { FailedMessageContext } from './contexts';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCreateMessage, useFetchMessagesBySessionId } from '../../hooks';

export const FailedMessages = () => {
  const { sessionId } = useParams();
  const { isRefetching } = useFetchMessagesBySessionId(sessionId || '');
  const { mutate, status } = useCreateMessage(sessionId || '');

  const { failedMessages, setFailedMessages } =
    useContext(FailedMessageContext);

  return (
    <div className='grid grid-cols-6 gap-4 mb-4'>
      {failedMessages.map((message) => (
        <div
          className='flex justify-between items-center bg-red-600 p-2 rounded'
          key={message.message.id}
        >
          <p>{message.message.text}</p>
          <button
            className='text-2xl cursor-pointer'
            disabled={status === 'pending' || isRefetching}
            onClick={() => {
              mutate({
                sessionId: message.sessionId,
                message: { ...message.message },
              });
              // Remove message from failed message state
              setFailedMessages((prevMessages) =>
                prevMessages.filter(
                  (prevMessage) => prevMessage.message.id !== message.message.id
                )
              );
            }}
          >
            <IoMdRefreshCircle />
          </button>
        </div>
      ))}
    </div>
  );
};
