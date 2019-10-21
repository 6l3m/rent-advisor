import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Typography, CardActions, Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const propTypes = {
  ads: PropTypes.array,
};

const defaultProps = {
  ads: [],
};

export default function Ads(props) {
  const classes = useStyles();
  const { ads } = props;

  return (
    <>
      {ads.map((ad) => (
        !!ad.id && typeof ad.id === 'number' && (
          <Card key={ad.id} className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {`${ad.typedebien}, Prix: ${ad.pricing.price}`}
              </Typography>
              <Typography variant="h5" component="h2">
                be
                nev
                lent
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
        )
      ))}
    </>
  );
}

Ads.propTypes = propTypes;
Ads.defaultProps = defaultProps;
