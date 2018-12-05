import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

class DoublePassword extends Component {
  state = {
    password: '',
    password_again: '',
  };
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value }, () => {
        const equals = this.state.password === this.state.password_again;
        const length = this.state.password.length >= 6;
        let error = '';
        if (!equals)
          error = 'Paroolid ei ole võrdsed';
        else if (!length)
          error = 'Parooli pikkus ei ole piisav. Parool peab koosnema vähemalt 6 tähemärgist';
        this.props.checkCallback(equals && length, this.state.password, error);
      },
    );
  };

  render() {
    return <>
      <TextField
        type="password"
        id="password"
        label="Parool"
        className={this.props.classes.input}
        value={this.state.password}
        onChange={this.onChange}
        fullWidth
        required
      />
      <TextField
        type="password"
        id="password_again"
        label="Parool uuesti"
        className={this.props.classes.input}
        value={this.state.password_again}
        onChange={this.onChange}
        margin="normal"
        fullWidth
        required
      />
    </>;
  }
}

DoublePassword.propTypes = {
  checkCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(DoublePassword);