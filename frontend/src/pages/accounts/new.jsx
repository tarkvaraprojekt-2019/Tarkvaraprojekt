import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { withStyles } from '@material-ui/core/styles';

import withRoot from '../../withRoot';

import Layout from '../../components/Layout';
import TextField from '@material-ui/core/TextField/TextField';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';


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


class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.axios = this.props.axios;
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    userFields: {
      name: '',
      password: '',
      action: 'create',
    },
    error: '',
    users: [],
    dialogOpen: false,
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

  componentDidMount() {
    this.getUsers();
  }

  handleChange = event => {

    const key = event.target.id;
    const value = event.target.value;

    const userFields = this.state.userFields;
    userFields[key] = value;

    this.setState((state, props) =>
      Object.assign({}, state, { userFields }),
    );
  };
  handleNew = (event) => {
    event.preventDefault();
    const usernames = this.state.users.map(u => u.name);
    // user already exists
    if (usernames.indexOf(this.state.userFields.name) !== -1) {
      this.handleClickOpen();
    } else {
      // all good
      this.addNewUser();
    }
  };


  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  addNewUser = () => {
    this.axios.post('manage_users.php', this.state.userFields)
      .then(res => {
        const data = res.data;
        console.log('result: ', data);
        this.handleClose();
        navigate('/accounts');
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga. Proovisid lisada kasutajat mõnda lahtrit täitmata.' });
        } else if (err.message === 'Request failed with status code 403') {
          this.setState({ error: 'Viga. Kasutaja pole administraator.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout title="Uus kasutaja" error={this.state.error}>
        <Typography variant="h4" gutterBottom>
          Lisa uus isik
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} autoComplete="off" onSubmit={this.handleNew}>

            <TextField
              type="username"
              id="name"
              label="Kasutajanimi"
              className={classes.input}
              value={this.state.userFields.name}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="password"
              id="password"
              label="Parool"
              className={classes.input}
              value={this.state.userFields.password}
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
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Muuda eksisteerivat kasutajat?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sellise nimega kasutaja juba eksisteerib. Jätkates salvestamisega
              kirjutad eelmise kasutaja üle.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Tagasi
            </Button>
            <Button onClick={this.addNewUser} color="secondary">
              Salvesta
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(NewUser));
