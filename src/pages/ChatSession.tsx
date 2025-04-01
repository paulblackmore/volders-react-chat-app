import { StyledButton } from '../components/StyledButton';

export const ChatSession = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <footer className='fixed bottom-0 w-2/4 mb-4'>
        <form>
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          />
          <textarea
            id='message'
            rows={4}
            className='block p-2.5 w-full mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Write your thoughts here...'
          />
          <StyledButton onClick={() => {}}>Send</StyledButton>
        </form>
      </footer>
    </div>
  );
};
