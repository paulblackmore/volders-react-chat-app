import { Link } from 'react-router-dom';

export const SessionHistoryHeader = () => (
  <header className='flex justify-between items-center p-4'>
    <h3 className='text-2xl'>Session History</h3>
    <Link to='/'>
      <span className='text-sm'>Home</span>
    </Link>
  </header>
);
