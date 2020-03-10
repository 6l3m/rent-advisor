import React, { useState } from 'react';

import { withTranslation } from 'react-i18next';

import { createMuiTheme } from '@material-ui/core/styles';
import { Grid, CssBaseline, Typography, CircularProgress, Fab } from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import PropTypes from 'prop-types';

import jump from 'jump.js';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Ads from './components/Ads/Ads';

import { ReactComponent as ParisLogo } from './assets/images/Ville_de_Paris_logo_2019.svg';

import './App.scss';

import codes from './assets/code-postal-code-insee-2015.json';

import config from './config';

import useAdsApi from './hooks/useAdsApi';

import SearchFormContext from './contexts/SearchFormContext';

const styles = {
  upArrow: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem'
  }
};

function App(props) {
  const { classes, i18n } = props;

  const [lang, setLang] = useState('fr');
  const [searchForm, setSearchForm] = useState({
    value: {
      zipCode: {
        value: '',
        valid: false
      },
      budget: {
        value: '',
        valid: false
      }
    },
    valid: false
  });
  const [{ adSearch, adsLoading }, doFetch] = useAdsApi(
    {
      inseeCode: '',
      budget: ''
    },
    {
      cards: {
        list: []
      }
    }
  );

  const setProgress = element => {
    if (element) {
      jump(element);
    }
  };

  const handleLangChange = event => {
    const newlang = event.target.value;
    setLang(newlang);
    i18n.changeLanguage(newlang);
  };

  const handleFormValue = (name, _value) => {
    const { value } = searchForm;
    if (value[name].value !== _value) {
      setSearchForm({
        ...searchForm,
        value: {
          ...searchForm.value,
          [name]: { ...searchForm.value[name], value: _value }
        }
      });
    }
  };

  const handleSubmit = () => {
    const inseeCode = codes.find(code => code.fields.code_postal === searchForm.value.zipCode.value)
      .fields.insee_com;
    const body = { inseeCode, budget: searchForm.value.budget.value };
    doFetch(body);
  };

  const goTop = () =>
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  const theme = createMuiTheme({
    palette: {
      type: 'dark' // Switching the dark mode on is a single property value change.
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className="app--container">
        <CssBaseline />
        <div className="app--home-container">
          <Header lang={lang} handleChange={handleLangChange} />
          <div className="app--home-content">
            <ParisLogo className="app--city-logo" />
            <SearchFormContext.Provider
              value={{ searchForm, handleFormValue, handleSubmit, codes }}
            >
              <Search bgCredits={config.searchBgCredits} />
            </SearchFormContext.Provider>
          </div>
          <Typography variant="caption" className="app--image-credits">
            {config.homeBgCredits}
          </Typography>
        </div>
        {adSearch.cards.list.length ? (
          <>
            <Ads ads={adSearch.cards.list} />
            <Fab color="primary" className={classes.upArrow} onClick={goTop}>
              <ArrowUpwardIcon />
            </Fab>
          </>
        ) : (
          adsLoading && (
            <>
              <div ref={setProgress} className="app--progress-container">
                <CircularProgress className="app--progress" />
              </div>
              <Fab color="primary" className={classes.upArrow} onClick={goTop}>
                <ArrowUpwardIcon />
              </Fab>
            </>
          )
        )}
      </Grid>
    </ThemeProvider>
  );
}

App.propTypes = {
  i18n: PropTypes.object,
  classes: PropTypes.object
};

App.defaultProps = {
  i18n: {},
  classes: {}
};

export default withTranslation()(withStyles(styles)(App));
