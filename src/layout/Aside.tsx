export const Aside = ({ children }: { children: React.ReactNode }) => (
  <aside className='bg-gray-800'>
    <header className='flex justify-center p-4 bg-gray-700'>
      <h3>Chat History</h3>
    </header>
    {/* TODO: style session history */}
    {children}
  </aside>
);
