import { StyledButton } from '../../components/StyledButton';

type Props = {
  handleNewSession: () => void;
};

export const StartNewChatSession = ({ handleNewSession }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h3 className='text-2xl'>Start a new chat by clicking below</h3>
      <StyledButton onClick={handleNewSession}>Start new chat</StyledButton>
    </div>
  );
};
