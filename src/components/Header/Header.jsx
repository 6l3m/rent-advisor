import React from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, Select, MenuItem,
} from '@material-ui/core';

import './Header.scss';

const useStyles = makeStyles({
  colorPrimary: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonRoot: {
    marginLeft: '1rem',
  },
  selectRoot: {
    marginLeft: 'auto',
  },
});

const propTypes = {
  lang: PropTypes.string,
  handleChange: PropTypes.func,
};

const defaultProps = {
  lang: '',
  handleChange: Function,
};

export default function Header(props) {
  const classes = useStyles();
  const { lang, handleChange } = props;

  return (
    <AppBar position="static" classes={{ colorPrimary: classes.colorPrimary }}>
      <Toolbar className="header--toolbar-container">
        <Typography variant="h6" className="header--title">
          Rent_Advisor
        </Typography>
        <div className="header--block-right">
          <Select
            value={lang}
            onChange={handleChange}
          >
            <MenuItem value="fr">FR</MenuItem>
            <MenuItem value="en">EN</MenuItem>
          </Select>
          <Button color="inherit" classes={{ root: classes.buttonRoot }}>Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
