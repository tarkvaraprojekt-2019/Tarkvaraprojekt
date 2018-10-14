import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate} from 'gatsby';


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
                        <TableCell>Eesnimi</TableCell>
                        <TableCell>Perenimi</TableCell>
                        <TableCell>Isikukood</TableCell>
                        <TableCell>Telefoninumber</TableCell>
                        <TableCell>E-Mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.victims.map(n => {
                        return (
                                <TableRow 
                                    hover
                                    onClick={e => navigate("/victims/" + n.id)}
                                    key={n.id}
                                >
                                    <TableCell component="th" scope="row">{n.id}</TableCell>
                                    <TableCell>{n.first_name}</TableCell>
                                    <TableCell>{n.last_name}</TableCell>
                                    <TableCell>{n.email}</TableCell>
                                    <TableCell>{n.national_id}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
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