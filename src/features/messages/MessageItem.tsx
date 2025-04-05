const Text = ({ text }: { text: string }) => (
  <p className='font-semibold p-1'>{text}</p>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
  <footer className='flex justify-between w-full'>{children}</footer>
);

const TimeStamp = ({ timestamp }: { timestamp: string }) => (
  <span className='text-xs'>{timestamp}</span>
);

const Status = ({ status }: { status: string }) => (
  <span className='text-xs text-transform: capitalize'>{status}</span>
);

const MessageItem = ({
  children,
  position,
  BgColor,
}: {
  children: React.ReactNode;
  position: string;
  BgColor: string;
}) => (
  <div className={`flex flex-col gap-4 ${position} w-210`}>
    <div
      className={`flex flex-col justify-center items-center ${BgColor} rounded-lg p-2 w-1/2 gap-1`}
    >
      {children}
    </div>
  </div>
);

MessageItem.Text = Text;
MessageItem.Footer = Footer;
MessageItem.TimeStamp = TimeStamp;
MessageItem.Status = Status;

export { MessageItem };
