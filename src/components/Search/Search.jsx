import React from 'react';

import { withTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { withStyles } from '@material-ui/styles';

import './Search.scss';

import SearchForm from './SearchForm/SearchForm';

const styles = {
  icon: {
    fill: 'red',
    width: '3em',
    height: '3em'
  }
};

const propTypes = {
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  codes: PropTypes.array,
  bgCredits: PropTypes.string,
  classes: PropTypes.object,
  zipCode: PropTypes.string,
  budget: PropTypes.string,
  handleFormValue: PropTypes.func
};

const defaultProps = {
  t: Function,
  handleSubmit: () => {},
  codes: [],
  bgCredits: '',
  classes: {},
  zipCode: '',
  budget: '',
  handleFormValue: () => {}
};

const Search = props => {
  const {
    handleSubmit,
    t,
    codes,
    bgCredits,
    classes,
    zipCode,
    budget,
    handleFormValue
  } = props;

  const submitForm = event => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <Card className="search--card-container">
      <div className="search--card-image">
        <Typography variant="caption" className="search--card-credits">
          {bgCredits}
        </Typography>
      </div>
      <CardContent className="search--card-content">
        <div className="search--card-icon">
          <LocationSearchingIcon className={classes.icon} />
        </div>
        <Typography variant="h5" component="h2">
          {t('SearchAds')}
        </Typography>
        <SearchForm
          t={t}
          zipCode={zipCode}
          budget={budget}
          codes={codes}
          handleFormValue={handleFormValue}
          submitForm={submitForm}
        />
      </CardContent>
      <CardActions classes={{ root: 'search--card-actions' }}>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          onClick={handleSubmit}
        >
          {t('Search')}
        </Button>
      </CardActions>
    </Card>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default withTranslation()(withStyles(styles)(Search));
