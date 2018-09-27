import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from '@material-ui/core';
import { sampleSize, sumNames, zipWith } from '../../util';

import Layout from '../../components/Layout';
import UserTable from '../../components/UserTable';

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
  tableContainer: {
    height: 320,
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
    // maxHeight: 1000, // doesn't work, figure out what does
  },
});

class Accounts extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Typography variant="display1" gutterBottom>
          Kasutajad
        </Typography>
        <div>
          <SearchIcon />
          <TextField name="userSearch" label="Otsing..." />
        </div>

        <div className={classes.tableContainer}>
          <UserTable classes={classes} users={currentUsers}/>
        </div>
        <Link to="accounts/new/">
          <Button variant="fab" color="primary">
            <AddIcon />
          </Button>
        </Link>
      </Layout>
    );
  }
}

export default withStyles(styles)(Accounts);
