import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

class ErrorBar extends Component {
  render() {
    return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={this.props.open}
      autoHideDuration={6000}
      onClose={this.props.onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{this.props.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.props.onClose}
        >
          <CloseIcon/>
        </IconButton>,
      ]}
    />;
  }
}

ErrorBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorBar;