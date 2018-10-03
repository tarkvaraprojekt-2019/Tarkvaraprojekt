import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';





const VictimTable = props => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Piirkond</TableCell>
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

VictimTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default VictimTable;