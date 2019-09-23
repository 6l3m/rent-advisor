import React from 'react';

import { withTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import './Search.scss';

const useStyles = makeStyles({
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
});

const propTypes = {
  t: PropTypes.func,
};

const defaultProps = {
  t: Function,
};

function Search(props) {
  const classes = useStyles();
  const { t } = props;

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
          {t('Search')}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default withTranslation()(Search);
