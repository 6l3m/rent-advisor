import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Age
        </InputLabel>
        <Select
          value={zipCode}
          onChange={handleChange('zipCode')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: 'outlined-age-simple',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
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
