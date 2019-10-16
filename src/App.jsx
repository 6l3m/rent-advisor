import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

import { createMuiTheme } from '@material-ui/core/styles';
import {
  Grid, CssBaseline, Typography, CircularProgress, Fab,
} from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import PropTypes from 'prop-types';

import jump from 'jump.js';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Ads from './components/Ads/Ads';

import './App.scss';

import codes from './assets/code-postal-code-insee-2015';

import config from './config';

const styles = {
  upArrow: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.i18n.language,
      adSearch: { },
      adsLoading: false,
    };
    this.progress = React.createRef();
    this.home = React.createRef();
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
    this.setState((prevState) => (
      { ...prevState, adsLoading: true }
    ), () => jump(this.progress.current));
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

  goTop = () => jump(this.home.current)

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
      },
    });
    const { lang, adSearch, adsLoading } = this.state;
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" className="app--container">
          <CssBaseline />
          <div ref={this.home} className="app--home-container">
            <Header lang={lang} handleChange={this.handleChange} />
            <Search
              handleSubmit={this.handleSubmit}
              codes={codes}
              bgCredits={config.searchBgCredits}
            />
            <Typography variant="caption" className="app--image-credits">
              {config.homeBgCredits}
            </Typography>
          </div>
          {!!adSearch.cards && !!adSearch.cards.list && !!adSearch.cards.list.length ? (
            <>
              <Ads ads={adSearch.cards.list} />
              <Fab color="primary" className={classes.upArrow} onClick={this.goTop}>
                <ArrowUpwardIcon />
              </Fab>
            </>
          ) : adsLoading && (
            <>
              <div ref={this.progress} className="app--progress-container">
                <CircularProgress className="app--progress" />
              </div>
              <Fab color="primary" className={classes.upArrow} onClick={this.goTop}>
                <ArrowUpwardIcon />
              </Fab>
            </>
          )}
        </Grid>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object,
  classes: PropTypes.object,
};

App.defaultProps = {
  i18n: {},
  classes: {},
};

export default withTranslation()(withStyles(styles)(App));
