import React from 'react';

import PropTypes from 'prop-types';

import {
  Snackbar, Button, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//   close: {
//     padding: theme.spacing(0.5),
//   },
// }));

const propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
};

const defaultProps = {
  children: null,
  classes: {},
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      snackOpen: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(_error, info) {
    this.setState((prevState) => (
      {
        ...prevState,
        hasError: true,
        snackOpen: true,
        error: _error,
        errorInfo: info,
      }
    ));
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState((prevState) => ({ ...prevState, snackOpen: false }));
  };

  render() {
    const { hasError, snackOpen, errorInfo } = this.state;
    const { children, classes } = this.props;

    if (hasError) {
      return (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={snackOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{errorInfo}</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = propTypes;
ErrorBoundary.defaultProps = defaultProps;

export default ErrorBoundary;
