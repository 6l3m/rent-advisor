import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header/Header';
import './App.scss';
import DarkTheme from './components/DarkTheme/DarkTheme';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <DarkTheme />
    </ThemeProvider>
  );
};

export default App;
