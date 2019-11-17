import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  TextField, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'baseline',
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
    minWidth: 150,
  },
}));

const propTypes = {
  zipCode: PropTypes.string,
  budget: PropTypes.string,
  t: PropTypes.func,
  handleChange: PropTypes.func,
  codes: PropTypes.array,
};

const defaultProps = {
  zipCode: '',
  budget: '',
  t: () => {},
  handleChange: () => {},
  codes: [],
};

export default function SearchForm(props) {
  const classes = useStyles();
  const {
    t, zipCode, budget, handleChange, codes,
  } = props;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <form className={classes.container}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-zipCode-simple">
          {t('ZipCode')}
        </InputLabel>
        <Select
          value={zipCode}
          onChange={handleChange('zipCode')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'zipCode',
            id: 'outlined-zipCode-simple',
          }}
        >
          {codes.map((code) => (
            <MenuItem key={code.recordid} value={code.fields.code_postal}>
              {code.fields.code_postal}
            </MenuItem>
          ))}
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
