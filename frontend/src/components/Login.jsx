import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { navigate } from 'gatsby';
import { handleLogin, setToken } from '../auth';
import { FormHelperText } from '@material-ui/core';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class SignIn extends React.Component {
  state = {
    username: "", 
    password: "",
  }

  handleUsername = event => {
    this.setState({ username: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    handleLogin({ username: this.state.username, password: this.state.password })
    .then( res => {
      console.log("success: ", res)
      setToken(atob(res.data))
      navigate("/overview")
    })
    .catch ( err => {
      if (err.message === "Request failed with status code 400") {
        this.setState({error: "Viga. Proovisid otsida ilma parameetriteta."})
    } else if (err.message === "NO_CLIENTS_FOUND") {
        this.setState({error: "Ühtegi sellist kasutajat ei leitud."})
    } else if (err.message === "Request failed with status code 401") {
        this.setState({error: "Sisselogimine ebaõnnestus. Vale kasutajatunnus või parool. "})
    }
      console.log("error: ", err)
      setToken("")
  })
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>

            <Typography variant="headline">Logi sisse</Typography>

            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormHelperText>
                {this.state.error}
              </FormHelperText>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Kasutajatunnus</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus onChange={ this.handleUsername }/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Parool</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                />
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sisene

              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);
