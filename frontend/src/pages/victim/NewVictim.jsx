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
import TextField from '@material-ui/core/TextField'

import withRoot from '../../withRoot';

import Layout from '../../components/Layout';

import { isBrowser } from '../../auth';


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
    constructor(props) {
        super(props)
        this.axios = this.props.axios
        console.log(this.props)
    }

    createVictim(){
        this.axios.post("create_victim.php", this.state.formValues)

    }

    componentWillMount() {
        const formValues = isBrowser && window.localStorage.clientFields
        ? JSON.parse(window.localStorage.clientFields)
        : {}

        if (formValues !== null) {
            this.setState((state, props) => 
                Object.assign({}, state, {formValues}))
        }
        
    }

    handleChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.id] = event.target.value
        this.setState({formValues});

        console.log(this.state)
    };

    state = {
        formValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            national_id: "",
        },
    }
    render() {
        const { classes } = this.props;

        const field = (id, label) => (
            <TextField
                        id={id}
                        label={label}
                        className={classes.input}
                        value={this.state.formValues[id]}
                        onChange={this.handleChange}
                        margin="normal"
                        fullWidth
            />
        )

        return (
            <Layout title="Uus klient">
                    <Typography variant="h4" gutterBottom>
                        Lisa uus isik
                    </Typography>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        {field("first_name", "Eesnimi")}
                        {field("last_name", "Perenimi")}
                        {field("national_id", "Isikukood")}
                        {field("phone", "Telefoninumber")}
                        {field("email", "E-Mail")}
                        
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <Link to="/overview">
                        <Button
                            onClick={() => {
                                this.createVictim()
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Salvesta
                        </Button>
                    </Link>
                    <Link to="/overview">

                        <Button
                            variant="contained"
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
