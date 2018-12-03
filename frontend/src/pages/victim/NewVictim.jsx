import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'

import withRoot from '../../withRoot';

import Layout from '../../components/Layout';

import {isBrowser} from '../../auth';
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


class NewVictim extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props)
        this.axios = this.props.axios
    }

    createVictim() {
        this.axios.post("create_victim.php", this.state.formValues)
            .then(res => {
                let data = res.data;
                if (data.length === 0)  {
                    this.setState({error: 'Tekkis ootamatu viga.'});
                    setTimeout(() => this.setState({error: ''}), 6000);
                } else {
                    console.log("result: ", data)
                    navigate("/victim/" + data)
                }
            })
            .catch(err => {
                if (err.message === "Request failed with status code 400") {
                    this.setState({error: 'Viga. Proovisid lisada ilma parameetriteta.'});
                }
                else if (err.message === "Request failed with status code 401") {
                    this.setState({error: 'Autentimisviga. Proovi uuesti sisse logida.'});
                }
                setTimeout(() => this.setState({error: ''}), 6000);
                console.log("adding err: ", err)
            })
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

    handleCreate = event => {
        event.preventDefault()
        this.createVictim()
    }


    state = {
        formValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            national_id: "",
        },
        error: '',
    }

    render() {
        const {classes} = this.props;

        const field = (id, label, pattern) => (
            <TextField
                type={id === "email" ? "email" : "text"}
                id={id}
                label={label}
                className={classes.input}
                value={this.state.formValues[id]}
                onChange={this.handleChange}
                margin="normal"
                inputProps={{pattern: pattern}}

                fullWidth
            />
        )

        return (
            <Layout title="Uus klient" error={this.state.error}>
                <Typography variant="h4" gutterBottom>
                    Lisa uus isik
                </Typography>
                <Paper className={classes.paper}>

                    <form className={classes.form} onSubmit={this.handleCreate}>

                        {field('first_name', 'Eesnimi', "\\p{Letter}*")}
                        {field('last_name', 'Perenimi', "\\p{Letter}*")}
                        {field('national_id', 'Isikukood', "([1-6]\\d\\d(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|30|31)\\d{4})?")}
                        {field('phone', 'Telefoninumber', "([+]\\d+)?\\d*")}
                        {field('email', 'E-Mail', "(.*?)")}

                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              spacing={8}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    className={classes.button}

                                    variant="contained"
                                    color="primary"
                                >
                                    Salvesta
                                </Button>
                                <Link to="/overview">

                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Tühista
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(NewVictim));
