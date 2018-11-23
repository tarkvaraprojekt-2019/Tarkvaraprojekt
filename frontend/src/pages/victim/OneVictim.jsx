import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';


import withRoot from '../../withRoot';
import IncidentTable from "../../components/IncidentTable";

import Layout from '../../components/Layout';
import {navigate} from "gatsby";

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
    button: {
        margin: theme.spacing.unit,
    },
});


class Victim extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.axios = this.props.axios
    }

    componentWillMount() {

        this.getIncidents();
        this.getVictim()

    }

    handleChange = event => {
        const formValues = this.state.formValues;
        formValues[event.target.id] = event.target.value;
        this.setState({ formValues });
    };

    state = {
        victimArea: 'Tartumaa',
        name: 'hai',
        incidents: [{
            id: 0,
            piirkond: "teadmata"
        }], 
        editingEnabled : false,
        formValues: {
            id: this.props.victimID,
            first_name: "",
            last_name: "", 
            phone: "", 
            email: "", 
            national_id: "", 
        },
    };

    getVictim = () => {
        this.axios.get('get_victim.php', {
            params: {
                id: this.props.victimID,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                national_id: "",
            },
        })
        .then( res => {
            console.log(res.data);

            this.setState({formValues: res.data[0]})
        })
        .catch( err => console.log("search err: ", err))
    };



    updateVictim = () => {
        this.axios.post("update_victim.php", this.state.formValues);
        this.getVictim()
    };


    getIncidents = () => {
        this.axios.get('get_incidents.php', {
            params:{
                kliendi_nr: this.props.victimID,
            }
        })
        .then( res => {
            console.log(res);
            this.setState({
                incidents: res.data
            })
        })
        .catch( err => console.log("search err: ", err))
    };

    render() {
        const {classes} = this.props;

        return (
            <Layout title="Klient">
                <Typography variant="h4" gutterBottom>
                    Isiku profiil
                </Typography>
                <Paper className={classes.paper}>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing = {8}>
                    <Grid item>

                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="victimID">ID</InputLabel>
                                    <Input
                                        id="id"
                                        disabled
                                        placeholder="1145"
                                        value={this.props.victimID}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="firstName">Eesnimi</InputLabel>
                                    <Input
                                        id="first_name"
                                        disabled = {!this.state.editingEnabled}
                                        // placeholder="Mari"
                                        onChange={this.handleChange}
                                        value={this.state.formValues.first_name}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="lastName">Perekonnanimi</InputLabel>
                                    <Input
                                        id="last_name"
                                        disabled = {!this.state.editingEnabled}
                                        // placeholder="Maasikas"
                                        onChange={this.handleChange}
                                        value={this.state.formValues.last_name}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="national_id">Isikukood</InputLabel>
                                    <Input
                                        type="number"
                                        id="national_id"
                                        disabled = {!this.state.editingEnabled}
                                        // placeholder="Maasikas"
                                        onChange={this.handleChange}
                                        value={this.state.formValues.national_id}
                                    />
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="victimTel">Telefoninr</InputLabel>
                                    <Input
                                        type="number"
                                        id="phone"
                                        disabled = {!this.state.editingEnabled}
                                        // placeholder="55889933"
                                        onChange={this.handleChange}
                                        value={this.state.formValues.phone}
                                    />
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="victimEmail">E-maili aadress</InputLabel>
                                    <Input
                                        id="email"
                                        disabled = {!this.state.editingEnabled}
                                        // placeholder="marimaasikas@mail.ee"
                                        onChange={this.handleChange}
                                        value={this.state.formValues.email}
                                    />
                                </FormControl>
                            </form>

                    </Grid>
                    <Grid item>
                        { !this.state.editingEnabled ?
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={ e => this.setState({
                                    editingEnabled: !this.state.editingEnabled
                                })}
                            >
                                MUUDA ISIKUANDMEID
                            </Button> : null }

                        { this.state.editingEnabled ?
                            <Button
                                className={classes.button}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={ e => {

                                    this.setState({
                                        editingEnabled: !this.state.editingEnabled
                                    });

                                    this.updateVictim()
                                }}
                            >
                                SALVESTA
                            </Button> : null}

                        {this.state.editingEnabled ?
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={ e => {
                                    this.setState({
                                        editingEnabled: !this.state.editingEnabled
                                    });
                                    this.getVictim()
                                }}
                            >
                                TÜHISTA
                            </Button> : null}

                    </Grid>
                </Grid>
                </Paper>

                    <IncidentTable classes={classes} uid={this.props.victimID} incidents ={this.state.incidents} />


                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={e => navigate("/overview")}

                >
                    TAGASI
                </Button>



            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(Victim));
