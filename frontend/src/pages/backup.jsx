import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';


import withRoot from '../withRoot';

import Layout from '../components/Layout';


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




class Backup extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    render() {
        const { classes } = this.props;

        return (
            <Layout>

            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(Backup));
