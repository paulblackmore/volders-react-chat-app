import { StyledButton } from '../components/StyledButton';

const ChatItem = () => (
  <div className='flex flex-col justify-center items-center bg-slate-500 rounded-lg p-4 w-3/4 gap-4'>
    <p>Chat Item</p>
    <footer className='flex justify-between w-full'>
      <span className='text-sm'>time</span>
      <span className='text-sm'>Status</span>
    </footer>
  </div>
);

export const ChatSession = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <div className='flex flex-col gap-4 justify-start items-center h-screen w-full mt-4'>
        {/* TODO: loop over chat items after fetching from api */}
        <ChatItem />
      </div>
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
