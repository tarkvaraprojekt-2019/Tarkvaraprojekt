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

import { isBrowser } from '../auth';


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
        window.localStorage.clientFields = JSON.stringify(searchFields) // HACK! replace with redux, when feeling like you have time
    }

    searchVictim = (searchFields) => {
        this.axios.get('get_victim.php', {
            params: searchFields,
        })
        .then( res => {
            let data = res.data;
            console.log("result: ", data)
            if (!data.length) {
                throw new Error("NO_CLIENTS_FOUND")
            }
            this.setState({results: data})

        })
        .catch( err => {
            if (err.message === "Request failed with status code 400") {
                this.setState({error: "Viga. Proovisid otsida ilma parameetriteta."})
            } else if (err.message === "NO_CLIENTS_FOUND") {
                this.setState({error: "Ühtegi sellist kasutajat ei leitud."})
            } else if (err.message === "Request failed with status code 401") {
                this.setState({error: "Autentimisviga. Proovi uuesti sisse logida."})
            }
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
        results: [], 
        open: false, 
        error: "", 
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
                        type={id === "id" || id === "phone" || id === "national_id" ? "number" : "text"}
                        id={id}
                        label={label}
                        className={classes.input}
                        value={this.state.searchFields[id]}
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
                    message={<span id="message-id">{this.state.error}</span>}
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
