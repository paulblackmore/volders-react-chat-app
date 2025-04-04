type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
};

export const StyledButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}: Props) => (
  <button
    className='bg-transparent hover:bg-green-500 white-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded cursor-pointer'
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
