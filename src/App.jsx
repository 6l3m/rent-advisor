import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header/Header';
import './App.scss';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
  });

  const styles = {
    container: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
      height: '100vh',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.container}>
        <Header />
      </div>
    </ThemeProvider>
  );
};

export default App;
