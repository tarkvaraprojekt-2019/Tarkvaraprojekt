import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import {navigate} from "gatsby";
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})


const IncidentTable = props => {
    const { classes } = props;

    return (
        <div>

        <Paper className={classes.paper}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                spacing = {8}>
                <Grid item xs = {12}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Piirkond</TableCell>
                                <TableCell>Suhtluskeel</TableCell>
                                <TableCell>Vanus</TableCell>
                                <TableCell>Elukoht</TableCell>
                                <TableCell>Viimati muudetud</TableCell>
                                <TableCell>Muutja</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.incidents.map(n => {
                                return (
                                    <TableRow
                                    hover
                                    key={n.id}
                                    onClick={() => {
                                        navigate(("/victim/" + props.uid + "/" + n.id), {
                                            state: {
                                                incident: props.incidents.find(inc => inc.id === n.id)
                                            }
                                        })
                                    }}
                                    >
                                        <TableCell component="th" scope="row">{n.piirkond}</TableCell>
                                        <TableCell>{n.keel === null ||n.keel === "teadmata" || n.keel === "" ? "Teadmata" : n.keel}</TableCell>
                                        <TableCell>{n.vanus === null ||n.vanus === "teadmata" || n.vanus === "" ? "Teadmata" : n.vanus}</TableCell>
                                        <TableCell>{n.elukoht === null ||n.elukoht === "teadmata" || n.elukoht === "" ? "Teadmata" : n.elukoht}</TableCell>
                                        <TableCell>{n.muutmisaeg === null || n.muutmisaeg === "" ? "Teadmata" : n.muutmisaeg}</TableCell>
                                        <TableCell>{n.muutja === null ||n.muutja === "teadmata" || n.muutja === "" ? "Teadmata" : n.muutja}</TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs>
                        <Button
                            onClick={e => navigate("/victim/" + props.uid + "/newIncident")}
                            variant="contained"
                            color="primary"
                        >
                            Uus juhtum
                        </Button>
                </Grid>
            </Grid>

        </Paper>


        </div>

    );
};

IncidentTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (IncidentTable);