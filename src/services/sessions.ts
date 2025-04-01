import { Session } from '../types';
import { handleFetchApi } from '../utils';

export const generateNewChatSession = (payload: Session): Promise<Session> =>
  handleFetchApi(`${import.meta.env.VITE_API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

export const fetchSessions = (): Promise<Session[]> =>
  handleFetchApi(`${import.meta.env.VITE_API_URL}/sessions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
