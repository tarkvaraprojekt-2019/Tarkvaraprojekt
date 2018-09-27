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





const UserTable = props => {
    const { classes } = props;
  
    return (
      <Paper className={classes.paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell>Piirkonnad</TableCell>
              <TableCell>Muuda</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map(n => {
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

  export default UserTable;