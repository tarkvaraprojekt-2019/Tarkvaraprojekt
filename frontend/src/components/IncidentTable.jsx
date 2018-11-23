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
                                <TableCell>Viimati muudetud</TableCell>
                                <TableCell>Piirkond</TableCell>
                                <TableCell>Füüsiline vägivald</TableCell>
                                <TableCell>Vaimne vägivald</TableCell>
                                <TableCell>Vägivallatseja sugu</TableCell>
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
                                        <TableCell component="th" scope="row">{n.muutmisaeg === null || n.muutmisaeg === "" ? "Teadmata" : n.muutmisaeg}</TableCell>
                                        <TableCell>{n.piirkond}</TableCell>
                                        <TableCell>{n.fuusiline_vagivald === 1 ? "Jah" : "Ei"}</TableCell>
                                        <TableCell>{n.vaimne_vagivald === 1 ? "Jah" : "Ei"}</TableCell>
                                        <TableCell>{n.vagivallatseja_sugu}</TableCell>
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