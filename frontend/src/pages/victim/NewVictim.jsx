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
        const formValues = this.state.formValues
        formValues[event.target.id] = event.target.value
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

        return (
            <Layout title="Uus klient">
                    <Typography variant="h4" gutterBottom>
                        Lisa uus isik
                    </Typography>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="first_name">Eesnimi</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="last_name">Perekonnanimi</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="national_id">Isikukood</InputLabel>
                            <Input id="national_id" onChange={this.handleChange} value={this.state.formValues.national_id}/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="phone">Telefoninr</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="email">E-maili aadress</InputLabel>
                            <Input/>
                        </FormControl>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <Link to="/overview">
                        <Button
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
