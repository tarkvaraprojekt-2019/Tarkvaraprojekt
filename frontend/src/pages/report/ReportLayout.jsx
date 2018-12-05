import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Layout from '../../components/Layout';
//import ReportImg from 'report.png';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
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
        const children = this.props.children

        return (
            <Layout {...this.props}>
                
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
                    { children }
                
            </Layout>
        )
    }
}



export default withStyles(styles)(ReportLayout);
