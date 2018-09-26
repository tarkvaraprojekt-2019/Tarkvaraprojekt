import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import withRoot from '../withRoot';
import Layout from '../components/layout';
import {Link} from '@reach/router';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
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
    };

    render() {
        const {classes} = this.props;

        return (
            <Layout>
                <Paper className={classes.paper}>
                    <TextField
                        id="id-field"
                        label="ID"
                        className={classes.input}
                        value={this.state.name}
                        onChange={event => this.setState({id: event.target.value})}
                        margin="normal"
                    />
                    <Link to={"victim/" + this.state.id}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={classes.input}
                        >
                            Otsi
                        </Button>
                    </Link>

                </Paper>
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
