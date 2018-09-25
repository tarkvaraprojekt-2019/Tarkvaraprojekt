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
import Layout from '../../components/layout';
import { Button, TextField } from '@material-ui/core';
import { sampleSize, sumNames, zipWith } from '../../util';


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
const users = zipWith(createUser, names, districts);

const UserTable = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nimi</TableCell>
            <TableCell>Piirkonnad</TableCell>
            <TableCell>Muuda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell>{n.district}</TableCell>
                <TableCell>
                  <Link to={'accounts/' + n.id}>
                    <EditIcon color="action" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
          <UserTable classes={classes} />
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
