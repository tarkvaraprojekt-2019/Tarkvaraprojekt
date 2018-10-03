import React from 'react';
import PropTypes from 'prop-types';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';






const IncidentTable = props => {
    const { classes } = props;

    return (
        <div>

        <Paper className={classes.paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Piirkond</TableCell>
                        <TableCell>Muuda</TableCell>
                    </TableRow>
                </TableHead>

            </Table>
        </Paper>
            <Button
                variant="raised"
                color="primary"
            >
                Uus juhtum
            </Button>
        </div>

    );
};

IncidentTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default IncidentTable;