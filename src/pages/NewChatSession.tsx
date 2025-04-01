import { StyledButton } from '../components/StyledButton';
import { useGenerateNewChatSession } from '../hooks';
import { v4 as uuidv4 } from 'uuid';

export const NewChatSession = () => {
  const generateNewChatSession = useGenerateNewChatSession();

  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h3 className='text-2xl'>Start a new chat by clicking below</h3>
      <StyledButton
        onClick={() => {
          generateNewChatSession.mutate({
            sessionId: uuidv4(),
          });
        }}
      >
        Start new chat
      </StyledButton>
    </div>
  );
};
