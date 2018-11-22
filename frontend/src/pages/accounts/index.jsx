import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from '@material-ui/core';
import { sampleSize, sumNames, zipWith } from '../../util';

import Layout from '../../components/Layout';
import UserTable from '../../components/UserTable';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';

let id = 0;
function createUser(name, district) {
  id += 1;
  return { id, name, district };
}

const lastNames = ['Kütt', 'Tamm', 'Mägi', 'Saar', 'Kukk'];
const firstNames = ['Kadri', 'Riina', 'Anneli', 'Maria', 'Tiina'];

const piirkonnad = [
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
  'Harjumaa',
  'Tartumaa',
  'Pärnumaa',
];



const names = zipWith(sumNames, firstNames, lastNames);
const districts = sampleSize(piirkonnad, names.length);
const currentUsers = zipWith(createUser, names, districts);


const drawerWidth = 240;

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
  handleChangePassword = (event) => {
    this.manageUsers({
      action: 'create',
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
    this.manageUsers({
      action: 'set_admin',
      name: username,
      admin_status: admin_status,
    });
  };

  handleDelete = (username) => {
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
          this.setState({ error: 'Viga. Ei tohiks kunagi juhtuda nii. Kontakteeru haldajaga. ' });
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
        <div>
          <SearchIcon />
          <TextField name="userSearch" label="Otsing..." />
        </div>

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
            <TextField
              autoFocus
              margin="dense"
              type="password"
              id="password"
              label="Parool"
              fullWidth
              onChange={(event) => this.setState({ password: event.target.value })}
            />
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
