import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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

        const searchFields = this.state.searchFields
        searchFields[key] = value

        this.setState((state, props) => 
            Object.assign({}, state, {searchFields})
        )
    }

    searchVictim = (searchFields) => {
        this.axios.get('search_victim.php', {
            params: searchFields,
        })
        .then( res => {
            let data = res.data;

            // Object.keys(data).forEach(function(key) {
            //     let data1 = data[key];
            //     Object.keys(data1).forEach(function (key1) {
            //         if(data1[key1] === null) {
            //             data1[key1] = "-";
            //         }
            //     })
            // });
            this.setState({results: data})

        })
        .catch( err => {
            console.log("search err: ", err)
            this.setState({ open: true })
        })
    }


    state = {
        searchFields: {
            first_name: "",
            id: "",
            last_name: "",
            email: "",
            national_id: "",
            phone: "", 
        },
        results: [
            // {
            //     first_name: "Kristjan",
            //     id: "2013032",
            //     last_name: "Laht",
            //     email: "",
            //     national_id: "",
            //     phone: "", 
            // }
        ], 
        open: false, 
    }

    handleSearch = event => {
        event.preventDefault()
        this.searchVictim(this.state.searchFields)
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };


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
        const showVictims = this.state.results.length !== 0
        return (
            <Layout title="Ülevaade">
                <Paper className={classes.paper} >
                    <form onSubmit={this.handleSearch}>
                        
                        {field("id", "ID")}
                        {field("first_name", "Eesnimi")}
                        {field("last_name", "Perenimi")}
                        {field("national_id", "Isikukood")}
                        {field("phone", "Telefoninumber")}
                        {field("email", "E-Mail")}
                        
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={classes.input}
                        >
                            Otsi
                        </Button>
                    
                    </form>
                </Paper>

                { showVictims && <VictimTable classes={classes} victims={this.state.results} />}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Sellist isikut ei leitud</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
                { this.state.id }
                <br/>
                { this.state.firstname }
                <Paper className={classes.paper}>
                    <Link to={"victim/new/"}>
                        <Button
                            variant="contained"
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
