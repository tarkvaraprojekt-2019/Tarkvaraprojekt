import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';


class UserTable extends React.Component {

  state = {
    checked: false,
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table fixedHeader={false} style={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell>Parool</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Kustuta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.users.map(n => {
              return (
                <TableRow key={n.name}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.props.handlePassword(n.name)}
                      variant="outlined"
                      color="secondary"
                    >
                      Muuda
                      </Button>
                  </TableCell>
                  <TableCell className="adminNupp">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={n.is_admin === '1'}
                          onChange={(event, checked) => this.props.handleAdmin(n.name, checked)}
                          value="checked"
                          color="primary"
                        />
                      }
                    />
                  </TableCell>
                  <TableCell className="kustutaNupp">
        
                      <DeleteIcon
                        color="action"
                        onClick={() => this.props.handleDelete(n.name)}
                      />
                    
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
};

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAdmin: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
};

export default UserTable;