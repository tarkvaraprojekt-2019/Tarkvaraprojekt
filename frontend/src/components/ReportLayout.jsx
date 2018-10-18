import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';



import withRoot from '../withRoot';

import Layout from './Layout';
//import ReportImg from 'report.png';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     margin: theme.spacing.unit * 4,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
    //         .spacing.unit * 3}px`,
    // },
    // input: {
    //     margin: theme.spacing.unit,
    // },
});

class ReportLayout extends React.Component {
    static defaultProps = {
        selectedTab: 0,
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    }

    handleChange = (event, selectedTab) => {
        if (selectedTab === 0) {
            navigate("/report/graphs/")
        } else if (selectedTab === 1) {
            navigate("/report/columnSelection/")
        }

    }

    render() {
        const { classes } = this.props;
        const Child = Children.only(this.props.children)

        return (
            <Layout {...this.props}>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.props.selectedTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Ülevaade tegevusest" />
                        <Tab label="Edasijõudnud valikud" />
                    </Tabs>
                    { Child }
                </Paper>
            </Layout>
        )
    }
}



export default withStyles(styles)(ReportLayout);
