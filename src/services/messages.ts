import { MessageFromApi, MessageInput } from '../types/message';
import { handleFetchApi } from '../utils';

export const createMesssage = (payload: MessageInput): Promise<MessageInput> =>
  handleFetchApi(`${import.meta.env.VITE_API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

export const fetchMessagesBySessionId = (
  sessionId: string
): Promise<MessageFromApi[]> =>
  handleFetchApi(`${import.meta.env.VITE_API_URL}/messages/${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
