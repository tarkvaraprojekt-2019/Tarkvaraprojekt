import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import withRoot from '../../withRoot';
import { Router } from '@reach/router';

import Layout from '../../components/Layout';

import NewVictim from './NewVictim';
import OneVictim from './OneVictim';
import NewIncident from './newIncident';
import Incident from './Incident';
import NewSession from './newSession';




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
  victimInfo: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  }
});

class VictimIndex extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
        <Router>
          <OneVictim path="victim/:victimID" classes={classes} />
          <NewVictim path="victim/new" />
          <NewIncident path="victim/:victimID/newIncident"/>
            <Incident path="victim/:victimID/:incidentID"/>
            <NewSession path="victim/:victimID/:incidentID/newSession"/>


        </Router>
    );
  }
}

const OldVictim = () => (
  <React.Fragment>
    <Typography variant="display1" gutterBottom>
      Ohvri andmed
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="eesnimi"
          name="eesnimi"
          label="Eesnimi"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="perenimi"
          name="perenimi"
          label="Perenimi"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Suhtluskeel</FormLabel>

        <FormGroup row name="keel">
          <FormControlLabel value="eesti" control={<Checkbox />} label="eesti" />
          <FormControlLabel value="vene" control={<Checkbox />} label="vene" />
          <FormControlLabel value="inglise" control={<Checkbox />} label="inglise" />
          <FormControlLabel value="muu" control={<Checkbox />} label="muu" />
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <FormLabel component="legend">Ohvri vanus</FormLabel>

        <RadioGroup row name="vanus" value="18-24">
          <FormControlLabel value="LT 18" control={<Radio />} label="alla 18" />
          <FormControlLabel value="18-24" control={<Radio />} label="18-24" />
          <FormControlLabel value="25-49" control={<Radio />} label="25-49" />
          <FormControlLabel value="50-64" control={<Radio />} label="50-64" />
          <FormControlLabel value="GT 65" control={<Radio />} label="üle 65" />
        </RadioGroup>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default withRoot(withStyles(styles)(VictimIndex));
