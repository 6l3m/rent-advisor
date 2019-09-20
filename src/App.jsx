import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';

import Header from './components/Header/Header';
import './App.scss';
import Search from './components/Search/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: 'fr'
    };
  }

  // handleChange = (event) => {
  //   const newlang = event.target.value;
  //   const { i18n } = this.props;
  //   this.setState(() => ({
  //     // value: newlang
  //   }));
  //   i18n.changeLanguage(newlang);
  // };

  render() {
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
  }
}

// App.propTypes = {
//   i18n: PropTypes.shape,
// };

export default App;
