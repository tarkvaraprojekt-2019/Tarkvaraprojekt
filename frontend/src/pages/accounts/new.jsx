import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';



import { withStyles } from '@material-ui/core/styles';

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




class Report extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        id: '',
        users: [],
    };

    render() {
        const { classes } = this.props;

        return (
            <Layout title="Uus kasutaja">
<Typography variant="h4" gutterBottom>
                        Lisa uus isik
                    </Typography>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Nimi</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">E-mail</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimTel">Telefoninr</InputLabel>
                            <Input/>
                        </FormControl>
                        <Button className={classes.input} variant="contained" color="primary">
                            Salvesta
                        </Button>
                    </form>
                </Paper>
            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(Report));
