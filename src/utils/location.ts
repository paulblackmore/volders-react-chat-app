import { Location } from 'react-router-dom';

export const getSessionId = (location: Location): string =>
  location.pathname.split('/')[2];
