import { SessionList } from './components/SessionList';
import { AppContainer } from './layout/AppContainer';
import { Aside } from './layout/Aside';
import { Section } from './layout/Section';
import { ChatSession } from './pages/ChatSession';
// import { NewChatSession } from './pages/NewChatSession';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <Aside>
          <SessionList />
        </Aside>
        <Section>
          {/* <NewChatSession /> */}
          <ChatSession />
        </Section>
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
