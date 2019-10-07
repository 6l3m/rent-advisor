import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

import { createMuiTheme } from '@material-ui/core/styles';
import {
  Grid, CssBaseline, Typography, CircularProgress,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import PropTypes from 'prop-types';

import Header from './components/Header/Header';
import Search from './components/Search/Search';

import './App.scss';
import Ads from './components/Ads/Ads';

import codes from './assets/code-postal-code-insee-2015';

import config from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.i18n.language,
      adSearch: { },
      adsLoading: false,
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

  handleSubmit = async (zipCode, budget) => {
    const inseeCode = codes.find((code) => code.fields.code_postal === zipCode).fields.insee_com;
    const data = { inseeCode, budget };
    this.setState((prevState) => ({ ...prevState, adsLoading: true }));
    const resp = await fetch(config.adsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const respJson = await resp.json();
    this.setState((prevState) => ({
      ...prevState, adSearch: JSON.parse(respJson.resp), adsLoading: true,
    }));
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
      },
    });
    const { lang, adSearch, adsLoading } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" className="app--container">
          <CssBaseline />
          <div className="app--home-container">
            <Header lang={lang} handleChange={this.handleChange} />
            <Search handleSubmit={this.handleSubmit} codes={codes} />
            <Typography variant="caption" className="app--image-credits">
              Photo by Pedro Lastra on Unsplash
            </Typography>
          </div>
          {/* {!!adSearch.products && !!adSearch.products.length ? (
            <Ads ads={adSearch.products} />
          ) : adsLoading && (
            <CircularProgress />
          )} */}
          {adsLoading && (
            <div className="app--progress-container">
              <CircularProgress className="app--progress" />
            </div>
          )}
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

export default withTranslation()(App);
