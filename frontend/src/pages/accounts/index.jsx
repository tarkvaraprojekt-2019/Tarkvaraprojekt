import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import Layout from '../../components/Layout';
import UserTable from '../../components/UserTable';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';
import { getName } from '../../auth';
import DoublePassword from '../../components/DoublePassword';
import FormHelperText from '@material-ui/core/es/FormHelperText/FormHelperText';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
    // maxHeight: 1000, // doesn't work, figure out what does
  },
  input: {
    margin: theme.spacing.unit,
    minWidth: theme.spacing.unit * 20,
  },
});

class Accounts extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handlePassword = (name) => {
    this.setState({ passwordSelectedName: name });
    this.handleClickOpen();
  };
  handleChangePassword = event => {
    if (!this.state.isCorrect) {
      this.setState({ error: 'Viga. Paroolid ei ole korrektsed.' });
      setTimeout(() => this.setState({ error: '' }), 6000);
      return;
    }
    this.manageUsers({
      action: 'set_pass',
      name: this.state.passwordSelectedName,
      password: this.state.password,
    });
    this.handleClose();
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  componentWillMount() {
    this.getUsers();
  }

  state = {
    users: [],
    passwordSelectedName: '',
    password: '',
    dialogOpen: false,
    error: '',
    passwordError: '',
  };

  getUsers = () => {
    this.props.axios.get('get_users.php')
      .then(res => {
        const data = res.data;
        console.log('users: ', data);
        this.setState({ users: data });
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga. Proovisid ' });
        } else if (err.message === 'Request failed with status code 403') {
          this.setState({ error: 'Viga. Kasutaja pole administraator.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
      });
  };
  handleAdmin = (username, admin_status) => {
    if (username === getName()) {
      this.setState({ error: 'Viga. Proovisid eemaldada admini õigusi enda kasutajat. ' });
      setTimeout(() => this.setState({ error: '' }), 6000);
      return;
    }
    this.manageUsers({
      action: 'set_admin',
      name: username,
      admin_status: admin_status,
    });
  };

  handleDelete = (username) => {
    if (username === getName()) {
      this.setState({ error: 'Viga. Proovisid kustutada ennast.' });
      setTimeout(() => this.setState({ error: '' }), 6000);
      return;
    }
    this.manageUsers({
      action: 'delete',
      name: username,
    });
  };
  manageUsers = params => {
    this.props.axios.post('manage_users.php', params)
      .then(res => {
        const data = res.data;
        console.log('result: ', data);
        this.getUsers();
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga.' });
        } else if (err.message === 'Request failed with status code 403') {
          this.setState({ error: 'Viga. Kasutaja pole administraator.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <Layout title="Kasutajad" error={this.state.error}>
        <Typography variant="h4" gutterBottom>
          Kasutajad
        </Typography>

        <div className={classes.tableContainer}>
          <UserTable
            classes={classes}
            users={this.state.users}
            handleDelete={this.handleDelete}
            handleAdmin={this.handleAdmin}
            handlePassword={this.handlePassword}
          />
        </div>
        <Link to="accounts/new/">
          <Button variant="contained" color="primary" className={classes.input}>
            Lisa uus kasutaja
          </Button>
        </Link>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Muuda kasutaja parooli
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Parooli muutmiseks sisesta uus parool siia.
            </DialogContentText>
            <FormHelperText className={classes.input}>
              {this.state.formError}
            </FormHelperText>
            <DoublePassword
              checkCallback={(isCorrect, password, formError) => this.setState({ password, isCorrect, formError })}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Tagasi
            </Button>
            <Button onClick={this.handleChangePassword} color="secondary">
              Muuda
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(Accounts));
