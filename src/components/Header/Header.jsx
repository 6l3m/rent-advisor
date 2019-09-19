import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import './Header.scss';

const useStyles = makeStyles({
  colorPrimary: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonRoot: {
    marginLeft: 'auto',
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" classes={{ colorPrimary: classes.colorPrimary }}>
      <Toolbar>
        <Typography variant="h6" className="header--title">
          Rent_Advisor
        </Typography>
        <Button color="inherit" classes={{ root: classes.buttonRoot }}>Login</Button>
      </Toolbar>
    </AppBar>
  );
}
