import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import VictimTable from '../components/VictimTable';
import { letterPattern } from '../util';


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
    minWidth: theme.spacing.unit * 20,
  },
});

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.axios = this.props.axios;
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };


  handleChange = event => {

    const key = event.target.id;
    const value = event.target.value;

    const searchFields = this.state.searchFields;
    searchFields[key] = value;

    this.setState((state, props) =>
      Object.assign({}, state, { searchFields }),
    );
  };

  searchVictim = (searchFields) => {
    this.axios.get('get_victim.php', {
      params: searchFields,
    })
      .then(res => {
        let data = res.data;
        console.log('result: ', data);
        if (!data.length) {
          throw new Error('NO_CLIENTS_FOUND');
        }
        this.setState({ results: data });

      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga. Proovisid otsida ilma parameetriteta.' });
        } else if (err.message === 'NO_CLIENTS_FOUND') {
          this.setState({ error: 'Ühtegi sellist kasutajat ei leitud.' });
        } else if (err.message === 'Request failed with status code 401') {
          this.setState({ error: 'Autentimisviga. Proovi uuesti sisse logida.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
        console.log('search err: ', err);
        this.setState({ results: [] });
        this.setState({ drawerOpen: true });
      });
  };


  state = {
    searchFields: {
      first_name: '',
      id: '',
      last_name: '',
      email: '',
      national_id: '',
      phone: '',
    },
    results: [],
    error: '',
  };

  handleSearch = event => {
    event.preventDefault();
    this.searchVictim(this.state.searchFields);
  };


  render() {
    const { classes } = this.props;

    const field = (id, label, pattern) => (
      <TextField
        type={id === 'email' ? 'email' : 'text'}
        id={id}
        label={label}
        className={classes.input}
        value={this.state.searchFields[id]}
        onChange={this.handleChange}
        margin="normal"
        inputProps={{ pattern: pattern }}
      />
    );
    const showVictims = this.state.results.length !== 0;
    return (
      <Layout title="Ülevaade" error={this.state.error}>
        <Paper className={classes.paper}>

          <form onSubmit={this.handleSearch}>
            {field('id', 'ID', '\\d*')}
            {field('first_name', 'Eesnimi', letterPattern)} // can't use unicode groups. bug in FF, check up on
            https://bugzilla.mozilla.org/show_bug.cgi?id=1361876
            {field('last_name', 'Perenimi', letterPattern)}
            {field('national_id', 'Isikukood', '([1-6]\\d\\d(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|30|31)\\d{4})?')}
            {field('phone', 'Telefoninumber', '([+]\\d+)?\\d*')}
            {field('email', 'E-Mail', '(.*?)')}

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


        <Paper className={classes.paper}>

          <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}>
            <Grid item>
              {(showVictims && <VictimTable classes={classes} victims={this.state.results}/>)}

            </Grid>
            <Grid item>
              <Link to={'victim/new/'}>
                <Button
                  variant="contained"
                  color="primary"
                >
                  Uus isik
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>


      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(Overview));
