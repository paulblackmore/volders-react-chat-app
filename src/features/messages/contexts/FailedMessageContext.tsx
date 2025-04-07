import { createContext } from 'react';
import { MessageInput } from '../../../types/message';

type Props = {
  failedMessages: MessageInput[];
  setFailedMessages: React.Dispatch<React.SetStateAction<MessageInput[]>>;
};

export const FailedMessageContext = createContext<Props>({
  failedMessages: [],
  setFailedMessages: () => {},
});
