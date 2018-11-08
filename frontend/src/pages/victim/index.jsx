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
import Session from './Session';





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
            <Session path="victim/:victimID/:incidentID/:sessionID"/>

        </Router>
    );
  }
}

export default withRoot(withStyles(styles)(VictimIndex));
