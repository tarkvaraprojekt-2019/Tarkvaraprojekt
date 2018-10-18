import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import withRoot from '../../withRoot';

import Layout from '../../components/Layout';

import IncidentTable from "../../components/IncidentTable";

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        margin: theme.spacing.unit,
    },
});


class NewVictim extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    state = {
        victimArea: '',
        name: 'hai',
    };
    render() {
        const { classes } = this.props;

        return (
            <Layout title="Uus klient">
                    <Typography variant="h4" gutterBottom>
                        Lisa uus isik
                    </Typography>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="victimID">ID</InputLabel>
                            <Input defaultValue="123"/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstName">Eesnimi</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastName">Perekonnanimi</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimPhone">Telefoninr</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimEmail">E-maili aadress</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victim-area">Piirkond</InputLabel>
                            <Select
                                value={this.state.victimArea}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'victimArea',
                                    id: 'victim-area',
                                }}
                            >
                                <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                                <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                                <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                                <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                                <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                                <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                                <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                                <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                                <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                                <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>

                            </Select>
                        </FormControl>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <IncidentTable classes={classes} incidents = {[]}/>
                </Paper>
                <Paper className={classes.paper}>
                    <Link to="/overview">
                        <Button
                            variant="raised"
                            color="primary"
                        >
                            Salvesta
                        </Button>
                    </Link>
                    <Link to="/overview">

                        <Button
                            variant="raised"
                            color="primary"
                        >
                            Tühista
                        </Button>
                    </Link>
                </Paper>


            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(NewVictim));
