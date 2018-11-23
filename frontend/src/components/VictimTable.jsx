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

const mapEmpty = row => {
    return Object.assign(...Object.entries(row).map(([key, value]) => {
        if (value === null) {
            return {[key]: "-"}
        }
        return {[key]: value}
    }))
}

const VictimTable = props => {
    const { classes } = props;


    return (
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
                    {props.victims.map(row => {
                        const n = mapEmpty(row)
                        return (
                                <TableRow 
                                    hover
                                    onClick={e => navigate("/victim/" + n.id)}
                                    key={n.id}
                                >
                                    <TableCell component="th" scope="row">{n.id}</TableCell>
                                    <TableCell>{n.first_name}</TableCell>
                                    <TableCell>{n.last_name}</TableCell>
                                    <TableCell>{n.national_id}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
                                    <TableCell>{n.email}</TableCell>
                                </TableRow>
                            
                        );
                    })}
                </TableBody>
            </Table>
    );
};

VictimTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default VictimTable;