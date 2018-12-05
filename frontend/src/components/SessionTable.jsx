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


const SessionTable = props => {
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
                                <TableCell>Sessiooni kuupäev</TableCell>
                                <TableCell>Kirjeldus</TableCell>
                                <TableCell>Kriisinõustamine (h)</TableCell>
                                <TableCell>Viimati muudetud</TableCell>
                                <TableCell>Muutja</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.sessions.map(n => {
                                return (
                                    <TableRow
                                    hover
                                    key={n.id}
                                    onClick={() => {
                                        navigate("/victim/" + props.uid + "/" + props.incidentID + "/" + n.id, {
                                            state: {
                                                session: props.sessions.find(inc => inc.id === n.id)
                                            }
                                        })
                                    }}
                                    >
                                        <TableCell component="th" scope="row">{n.kuupaev === null || n.kuupaev === "" ? "Teadmata" : n.kuupaev}</TableCell>
                                        <TableCell>{n.kirjeldus === null || n.kirjeldus === "" ? "-" : n.kirjeldus}</TableCell>
                                        <TableCell>{n.kriisinoustamine === null || n.kriisinoustamine === "" ? "Teadmata" : n.kriisinoustamine}</TableCell>

                                        <TableCell>{n.muutmisaeg === null || n.muutmisaeg === "" ? "Teadmata" : n.muutmisaeg}</TableCell>
                                        <TableCell>{n.muutja === null || n.muutja === "" ? "Teadmata" : n.muutja}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs>
                        <Button
                            onClick={e => navigate("/victim/" + props.uid + "/" + props.incidentID + "/newSession" )}
                            variant="contained"
                            color="primary"
                        >
                            Uus Sessioon
                        </Button>
                </Grid>
            </Grid>

        </Paper>


        </div>

    );
};

SessionTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (SessionTable);