import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
import Header from './components/Header/Header';
import './App.scss';
import Search from './components/Search/Search';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className="app--container">
        <CssBaseline />
        <Header />
        <Search />
        <Typography variant="caption" className="app--image-credits">
          Photo by Pedro Lastra on Unsplash
        </Typography>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
