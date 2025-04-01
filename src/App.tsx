import { SessionList } from './features/sessions/SessionList';
import { AppContainer } from './layout/AppContainer';
import { Aside } from './layout/Aside';
import { Section } from './layout/Section';
import { ChatSession } from './pages/ChatSession';
import { NewChatSession } from './pages/NewChatSession';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Aside>
            <SessionList />
          </Aside>
          <Section>
            <Routes>
              <Route index element={<NewChatSession />} />
              <Route path='session/:sessionId' element={<ChatSession />} />
            </Routes>
          </Section>
        </AppContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
