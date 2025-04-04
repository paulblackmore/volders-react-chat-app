import { SessionHistoryList, SessionHistoryHeader } from './features/sessions';
import { AppContainer } from './layout/AppContainer';
import { Aside } from './layout/Aside';
import { Section } from './layout/Section';
import { ChatSession } from './pages/ChatSession';
import { NewChatSession } from './pages/NewChatSession';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import { RouteError } from './components/RouteError';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Aside>
            <SessionHistoryHeader />
            <SessionHistoryList />
          </Aside>
          <Section>
            <Routes>
              <Route
                index
                element={<NewChatSession />}
                errorElement={<RouteError />}
              />
              <Route
                path='session/:sessionId'
                element={<ChatSession />}
                errorElement={<RouteError />}
              />
            </Routes>
          </Section>
        </AppContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
