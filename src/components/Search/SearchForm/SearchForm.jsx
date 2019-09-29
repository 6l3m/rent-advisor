import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const propTypes = {
  zipCode: PropTypes.string,
  budget: PropTypes.string,
  t: PropTypes.func,
  handleChange: PropTypes.func,
};

const defaultProps = {
  zipCode: '',
  budget: '',
  t: () => {},
  handleChange: () => {},
};

export default function SearchForm(props) {
  const classes = useStyles();
  const {
    t, zipCode, budget, handleChange,
  } = props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-zipcode"
        label={t('ZipCode')}
        className={classes.textField}
        value={zipCode}
        onChange={handleChange('zipCode')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-budget"
        label={t('Budget')}
        className={classes.textField}
        value={budget}
        onChange={handleChange('budget')}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
