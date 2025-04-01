import { AppContainer } from './layout/AppContainer';
import { Aside } from './layout/Aside';
import { Section } from './layout/Section';
import { NewChatSession } from './pages/NewChatSession';

function App() {
  return (
    <AppContainer>
      <Aside>sessionId</Aside>
      <Section>
        <NewChatSession />
      </Section>
    </AppContainer>
  );
}

export default App;
