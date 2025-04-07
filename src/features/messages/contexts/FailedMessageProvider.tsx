import { useState } from 'react';
import { MessageInput } from '../../../types/message';
import { FailedMessageContext } from './FailedMessageContext';

type Props = {
  children: React.ReactNode;
};

export const FailedMessageProvider = ({ children }: Props) => {
  const [failedMessages, setFailedMessages] = useState<MessageInput[]>([]);

  return (
    <FailedMessageContext.Provider
      value={{ failedMessages, setFailedMessages }}
    >
      {children}
    </FailedMessageContext.Provider>
  );
};
