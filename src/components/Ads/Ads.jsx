import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import './Ads.scss';

import config from '../../config';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '1rem'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  }
});

const propTypes = {
  ads: PropTypes.array
};

const defaultProps = {
  ads: []
};

export default function Ads(props) {
  const classes = useStyles();
  const { ads } = props;

  const bull = <span className={classes.bullet}>•</span>;

  const tags = ad =>
    ad.tags.map(tag => (
      <React.Fragment key={tag}>
        <span>{tag}</span>
        {tag !== ad.tags[ad.tags.length - 1] && bull}
      </React.Fragment>
    ));

  return (
    <>
      <div className="ads--container">
        {ads.map(
          ad =>
            !!ad.id &&
            typeof ad.id === 'number' && (
              <Card key={ad.id} className="ads--card-container">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`${ad.estateType}, Prix: ${ad.pricing.price} ${ad.pricing.priceNote}`}
                  </Typography>
                  <Typography variant="h5" component="h3">
                    {tags(ad)}
                  </Typography>
                  {ad.photosQty && (
                    <img
                      src={`${config.apiUrl}${config.adPhotoUrl}?url=${ad.photos[0]}`}
                      alt=""
                      key={ad.photos[0]}
                    />
                  )}
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            )
        )}
      </div>
    </>
  );
}

Ads.propTypes = propTypes;
Ads.defaultProps = defaultProps;
