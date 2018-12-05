import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import FormHelperText from '@material-ui/core/es/FormHelperText/FormHelperText';

import { getName } from '../auth';
import DoublePassword from '../components/DoublePassword';

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

});

class ChangePassword extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    formValues: {
      name: getName(),
      password: '',
      action: 'set_pass',
    },
    error: '',
    formError: '',
  };

  handleSend = event => {
    event.preventDefault();
    if (!this.state.isCorrect) {
      this.setState({ error: 'Viga. Paroolid ei ole korrektsed.' });
      setTimeout(() => this.setState({ error: '' }), 6000);
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

  handlePassword = (isCorrect, password, formError) => {
    const oldForm = this.state.formValues;
    const formValues = Object.assign({}, oldForm, { password });

    this.setState({ isCorrect, formError, formValues });
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
            <DoublePassword checkCallback={this.handlePassword}/>
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