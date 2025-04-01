export const NewChatSession = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h3 className='text-2xl'>Stat a new chat by clicking link below</h3>
      <button className='bg-transparent hover:bg-green-500 white-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded cursor-pointer'>
        Start new chat
      </button>
    </div>
  );
};
