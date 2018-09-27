import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import UserTable from '../components/UserTable';


let id = 0;
function createUser(name, district) { // TODO refactor?
    id += 1;
    return { id, name, district };
}

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




class Overview extends React.Component {
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
            <Layout>
                <Paper className={classes.paper} >
                    <TextField
                        id="id-field"
                        label="ID"
                        className={classes.input}
                        value={this.state.name}
                        onChange={event => this.setState({
                            users: [{
                                id: 0,
                                name: event.target.value,
                                district: "Harjumaa",
                            }]})}
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.input}
                        onClick={event => this.setState({
                            users: [{
                                id: 0,
                                name: this.state.id,
                                district: "Harjumaa",
                            }]
                        })}
                    >
                        Otsi
                    </Button>

                </Paper>

                { this.state.users.length != 0 && <UserTable classes={classes} users={this.state.users} /> }

                <Paper className={classes.paper}>
                    <Link to={"newUser/"}>
                        <Button
                            variant="raised"
                            color="primary"
                        >
                            Uus isik
                    </Button>
                    </Link>

                </Paper>

            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(Overview));
