import { StyledButton } from '../components/StyledButton';
import { useGenerateNewChatSession } from '../hooks';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export const NewChatSession = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useGenerateNewChatSession();

  return isPending ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h3 className='text-2xl'>Start a new chat by clicking below</h3>
      <StyledButton
        onClick={() => {
          mutate(
            {
              sessionId: uuidv4(),
            },
            {
              onSuccess: ({ sessionId }: { sessionId: string }) => {
                navigate(`session/${sessionId}`);
              },
            }
          );
        }}
      >
        Start new chat
      </StyledButton>
    </div>
  );
};
