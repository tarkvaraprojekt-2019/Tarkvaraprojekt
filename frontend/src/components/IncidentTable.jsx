import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';






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
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            1
                        </TableCell>
                        <TableCell>Tartumaa</TableCell>
                        <TableCell>
                            <Link>
                                MUUDA JUHTUMIT
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </Paper>
            <Link to="/newIncident">
                <Button
                    variant="raised"
                    color="primary"
                >
                    Uus juhtum
                </Button>
            </Link>

        </div>

    );
};

IncidentTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default IncidentTable;