import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import withRoot from '../../withRoot';
import Layout from '../../components/layout';
import { Link } from '@reach/router';
import { zipWith3, sampleSize } from '../../util';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
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
  table: {
    minWidth: 400,
    // maxHeight: 1000, // doesn't work, figure out what does
  },
});

const districts = ['Harjumaa', 'Tartumaa', 'Pärnumaa'];
const readWrite = ['X', '', 'X', '', 'X', '', 'X', '', 'X', '', 'X', ''];

function makePerm(district, read, write) {
  return { district, read, write };
}
const permissons = zipWith3(
  makePerm,
  districts,
  sampleSize(readWrite, districts.length),
  sampleSize(readWrite, districts.length)
);

class One extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Paper className={classes.input}>
          <Typography className={classes.input} variant="display1" gutterBottom >Riina Tamm</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Piirkond</TableCell>
                <TableCell>Lugeda</TableCell>
                <TableCell>Kirjutada</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissons.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.district}
                    </TableCell>
                    <TableCell>{n.read}</TableCell>
                    <TableCell>{n.write}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(One));
