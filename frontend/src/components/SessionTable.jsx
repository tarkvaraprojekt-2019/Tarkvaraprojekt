import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import EditIcon from '@material-ui/icons/Edit';
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
                  spacing = "8">
                <Grid item xs = {12}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Kuupäev</TableCell>
                                <TableCell>Kirjeldus</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.sessions.map(n => {
                                return (
                                    <TableRow
                                    hover
                                    key={n.id}
                                    onClick={() => {
                                        navigate("/victim/" + props.uid + "/" + props.incidentID + "/" + n.id)
                                    }}
                                    >
                                        <TableCell component="th" scope="row">{n.id}</TableCell>
                                        <TableCell>{n.kuupaev === null || n.kuupaev === "" ? "Teadmata" : n.kuupaev}</TableCell>
                                        <TableCell>{n.kirjeldus === null || n.kirjeldus === "" ? "Teadmata" : n.kirjeldus}</TableCell>
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