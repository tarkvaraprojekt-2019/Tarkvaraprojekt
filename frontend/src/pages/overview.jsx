import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import VictimTable from "../components/VictimTable";



const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        margin: theme.spacing.unit,
        minWidth: theme.spacing.unit * 20
    },
});




class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.axios = this.props.axios
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    handleChange = event => {

        const key = event.target.id
        const value = event.target.value

        const fields = {}
        fields[key] = value

        this.setState((state, props) => 
            Object.assign({}, state, fields)
        )
        console.log(this.state)
    }

    getData = (searchFields) => {
        this.axios.get('search_victim.php', {
            params: searchFields,
        })
        .then( res => console.log(res))
        .catch( err => console.log("search err: ", err))
    }

    state = {
        id: "",
        firstname: "", 
    }


    render() {
        const { classes } = this.props;

        const field = (id, label) => (
            <TextField
                        id={id}
                        label={label}
                        className={classes.input}
                        value={this.state.id}
                        onChange={this.handleChange}
                        margin="normal"
            />
        )
        
        return (
            <Layout>
                <Paper className={classes.paper} >

                    {field("id", "ID")}
                    {field("firstname", "Eesnimi")}
                    {field("lastname", "Perenimi")}
                    {field("nid", "Isikukood")}
                    {field("phone", "Telefoninumber")}
                    {field("mail", "E-Mail")}
                    
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.input}
                        onClick={ e => this.getData(this.state)}
                    >
                        Otsi
                    </Button>

                </Paper>

                { this.state.users && this.state.users.length !== 0 && <VictimTable classes={classes} users={this.state.users} /> }
                { this.state.id }
                <br/>
                { this.state.firstname }
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
