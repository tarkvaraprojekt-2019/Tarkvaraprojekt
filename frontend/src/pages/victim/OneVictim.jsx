import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


import withRoot from '../../withRoot';
import IncidentTable from "../../components/IncidentTable";

import Layout from '../../components/Layout';

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


class Victim extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props)
        this.axios = this.props.axios
    }

    componentWillMount() {
        this.getIncidents(this.props.victimID)
    }


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    state = {
        victimArea: 'Tartumaa',
        name: 'hai',
        incidents: [{
            id: 0,
            piirkond: "teadmata"
        }], 
        editingEnabled : false
    };

    getIncidents = (client_id) => {
        this.axios.get('get_incidents.php', {
            params:{
                kliendi_nr: client_id,
            }
        })
        .then( res => {
            console.log(res)
            this.setState({
                incidents: res.data
            })
        })
        .catch( err => console.log("search err: ", err))
    }

    render() {
        const {classes} = this.props;

        return (
            <Layout>
                <Typography variant="h4" gutterBottom>
                    Isiku profiil
                </Typography>

                { !this.state.editingEnabled ? 
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ e => this.setState({
                            editingEnabled: !this.state.editingEnabled
                        })}
                    >
                        MUUDA ISIKUANDMEID
                    </Button> : null }

                { this.state.editingEnabled ? 
                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        onClick={ e => this.setState({
                            editingEnabled: !this.state.editingEnabled
                        })}
                    >
                        SALVESTA
                    </Button> : null}

                {this.state.editingEnabled ? 
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={ e => this.setState({
                            editingEnabled: !this.state.editingEnabled
                        })}
                    >
                        TÜHISTA
                    </Button> : null}

                <Paper className={classes.paper}>

                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="victimID">ID</InputLabel>
                            <Input disabled defaultValue="1145"/>

                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstName">Eesnimi</InputLabel>
                            <Input disabled = {!this.state.editingEnabled} defaultValue="Mari"/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastName">Perekonnanimi</InputLabel>
                            <Input disabled = {!this.state.editingEnabled} defaultValue="Maasikas"/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimTel">Telefoninr</InputLabel>
                            <Input disabled = {!this.state.editingEnabled} defaultValue="55889933"/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimEmail">E-maili aadress</InputLabel>
                            <Input disabled = {!this.state.editingEnabled} defaultValue="marimaasikas@mail.ee"/>
                        </FormControl>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <IncidentTable classes={classes} incidents ={this.state.incidents} />
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

export default withRoot(withStyles(styles)(Victim));
