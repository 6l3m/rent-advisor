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
};

const defaultProps = {
  t: Function,
  classes: {},
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, classes } = this.props;

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
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default withStyles(styles)(withTranslation()(Search));
