import { createContext, useState } from 'react';
import { MessageInput } from '../../../types/message';

type ContextProps = {
  failedMessages: MessageInput[];
  setFailedMessages: React.Dispatch<React.SetStateAction<MessageInput[]>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const FailedMessageContext = createContext<ContextProps>({
  failedMessages: [],
  setFailedMessages: () => {},
});

const FailedMessageProvider = ({ children }: ProviderProps) => {
  const [failedMessages, setFailedMessages] = useState<MessageInput[]>([]);

  return (
    <FailedMessageContext.Provider
      value={{ failedMessages, setFailedMessages }}
    >
      {children}
    </FailedMessageContext.Provider>
  );
};

export { FailedMessageContext, FailedMessageProvider };
