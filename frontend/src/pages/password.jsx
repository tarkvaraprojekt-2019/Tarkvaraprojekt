import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import FormHelperText from '@material-ui/core/es/FormHelperText/FormHelperText';

import { getName } from '../auth';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paper: {
    margin: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  input: {
    margin: theme.spacing.unit,
  },
});


class ChangePassword extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    formValues: {
      name: getName(),
      password: '',
      password_again: '',
      action: 'set_pass',
    },
    error: '',
    formError: '',
  };

  handleSend = event => {
    event.preventDefault();
    if (this.state.formValues.password !== this.state.formValues.password_again) {
      this.setState({ formError: 'Viga. Paroolid ei ole võrdsed. ' });
      return;
    }
    this.props.axios.post('manage_users.php', this.state.formValues)
      .then(res => {
        const data = res.data;
        console.log('result: ', data);
        navigate('/overview');
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga. Proovisid muuta parooli mõnda lahtrit täitmata.' });
        } else if (err.message === 'Request failed with status code 403') {
          this.setState({ error: 'Viga. Kasutaja pole administraator.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
      });
  };

  handleChange = event => {

    const key = event.target.id;
    const value = event.target.value;

    const formValues = this.state.formValues;
    formValues[key] = value;

    this.setState((state, props) =>
      Object.assign({}, state, { formValues }),
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout title="Muuda parooli" error={this.state.error}>
        <Paper className={classes.paper}>
          <form className={classes.form} autoComplete="off" onSubmit={this.handleSend}>
            <FormHelperText className={classes.input}>
              {this.state.formError}
            </FormHelperText>
            <TextField
              type="password"
              id="password_again"
              label="Parool"
              className={classes.input}
              value={this.state.formValues.password_again}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              type="password"
              id="password"
              label="Parool uuesti"
              className={classes.input}
              value={this.state.formValues.password}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              required
            />
            <Button
              type="submit"
              className={classes.input}
              variant="contained"
              color="primary"
            >
              Salvesta
            </Button>
          </form>
        </Paper>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(ChangePassword));