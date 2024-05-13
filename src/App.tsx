import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { ModalsProvider } from '@mantine/modals';
import { Game } from './components/Game';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <Game />
      </ModalsProvider>
    </MantineProvider>
  );
}
