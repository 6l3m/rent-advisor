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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  locationIcon: {
    width: '3em',
    height: '3em',
    color: 'red',
  },
};

const propTypes = {
  t: PropTypes.func,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  t: Function,
  classes: {},
  handleSubmit: () => {},
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      budget: '',
    };
  }

  getUrl = () => 'http://localhost/api/slapi/ads';

  handleChange = (name) => (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  submitForm = async () => {
    const { zipCode, budget } = this.state;
    const { handleSubmit } = this.props;
    const data = { zipCode, budget };
    const resp = await fetch(this.getUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const respJson = await resp.json();
    handleSubmit(JSON.parse(respJson.resp));
  }

  render() {
    const { t, classes } = this.props;
    const { zipCode, budget } = this.state;

    return (
      <Card className="search--card-container">
        <div className="search--card-image">
          <Typography variant="caption" className="search--card-credits">
            Photo by Sebastien Gabriel on Unsplash
          </Typography>
        </div>
        <CardContent className="search--card-content">
          <div className="search--icon-container">
            <LocationSearchingIcon classes={{ root: classes.locationIcon }} />
          </div>
          <Typography variant="h5" component="h2">
            {t('SearchAds')}
          </Typography>
          <SearchForm
            t={t}
            zipCode={zipCode}
            budget={budget}
            handleChange={this.handleChange}
          />
        </CardContent>
        <CardActions classes={{ root: 'search--card-actions' }}>
          <Button variant="outlined" size="large" onClick={this.submitForm}>{t('Search')}</Button>
        </CardActions>
      </Card>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default withStyles(styles)(withTranslation()(Search));
