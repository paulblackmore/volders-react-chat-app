import { Link } from 'react-router-dom';

export const Aside = ({ children }: { children: React.ReactNode }) => (
  <aside className='border-r-3 border-black'>
    <header className='flex justify-between items-center p-4'>
      <h3 className='text-2xl'>Chat History</h3>
      <Link to='/'>
        <span className='text-sm'>Home</span>
      </Link>
    </header>
    {children}
  </aside>
);
