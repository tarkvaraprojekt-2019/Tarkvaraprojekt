import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
        <div>
          <br/>
          <br/>
        <Link to="accounts/new/">
          <Button variant="contained" color="primary">
            Lisa kasutaja
          </Button>
        </Link>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(Accounts);
