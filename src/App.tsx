import { AppContainer } from './layout/AppContainer';
import { Aside } from './layout/Aside';
import { Section } from './layout/Section';

function App() {
  return (
    <AppContainer>
      <Aside>sessionId</Aside>
      <Section>Chat goes here</Section>
    </AppContainer>
  );
}

export default App;
