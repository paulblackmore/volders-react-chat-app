import { useGenerateNewChatSession } from '../hooks';
import { v4 as uuidv4 } from 'uuid';

export const NewChatSession = () => {
  const generateNewChatSession = useGenerateNewChatSession();

  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h3 className='text-2xl'>Start a new chat by clicking below</h3>
      <button
        className='bg-transparent hover:bg-green-500 white-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded cursor-pointer'
        onClick={() => {
          generateNewChatSession.mutate({
            sessionId: uuidv4(),
          });
        }}
      >
        Start new chat
      </button>
    </div>
  );
};
