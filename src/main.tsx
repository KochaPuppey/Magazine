import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider, createTheme,  } from '@mantine/core';
import '@mantine/core/styles.css';

const myColor = [
  '#eafbee',
  '#dbf2e0',
  '#b9e1c2',
  '#94d0a1',
  '#74c186',
  '#60b874',
  '#54b46a',
  '#449e59',
  '#398d4d',
  '#2a7a3f'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  primaryShade: 6,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <MantineProvider theme={theme}>
    <App /> 
    </MantineProvider>
  </StrictMode>,
)
