import React, { Component } from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import PropTypes from 'prop-types';

import Header from './components/Header/Header';
import Search from './components/Search/Search';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'fr',
    };
  }

  handleChange = (event) => {
    const newlang = event.target.value;
    const { i18n } = this.props;
    this.setState(() => ({
      lang: newlang,
    }));
    i18n.changeLanguage(newlang);
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
      },
    });
    const { lang } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" className="app--container">
          <CssBaseline />
          <Header lang={lang} handleChange={this.handleChange} />
          <Search />
          <Typography variant="caption" className="app--image-credits">
            Photo by Pedro Lastra on Unsplash
          </Typography>
        </Grid>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object,
};

App.defaultProps = {
  i18n: {},
};

export default App;
