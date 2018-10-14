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
import DeleteIcon from '@material-ui/icons/Delete'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button'


class UserTable extends React.Component {

  state = {
    checked: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table >
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
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="secondary">
                      Lähtesta
                      </Button>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedB}
                          onChange={this.handleChange('checked')}
                          value="checked"
                          color="primary"
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>
        
                      <DeleteIcon
                          color="action"
                          onClick = {event => window.confirm("Kas oled kindel, et tahad selle kasutaja ära kustatada?")}
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
};

export default UserTable;