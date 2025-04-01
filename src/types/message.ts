export type MessageInput = {
  sessionId: string;
  message: {
    id: string;
    text: string;
  };
};

export type MessageFromApi = {
  id: string;
  kind: 'user' | 'robot';
  text: string;
  backendId: string;
  timestamp: string;
};
