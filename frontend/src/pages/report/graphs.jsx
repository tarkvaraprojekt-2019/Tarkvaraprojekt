import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Chip from '@material-ui/core/Chip';

import withRoot from '../../withRoot';

import ReportLayout from './ReportLayout';
import SimpleLineChart from '../../components/SimpleLineChart';

import { zip, range } from '../../util'
//import ReportImg from 'report.png';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paper: {
    margin: theme.spacing.unit * 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  input: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
  }
});

class Graphs extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = event => {
    const formValues = this.state.formValues;
    formValues[event.target.id] = event.target.value;
    this.setState({ formValues });
    console.log(this.state);
  };

  defaultChips = {
    unique: ['incident_id', 'session_id', 'kliendi_nr', 'rahastus'],
    service_hours: [
      'sidevahendid',
      'kriisinoustamine',
      'kriisinoustamise_aeg',
      'juhtuminoustamine',
      'vorgustikutoo',
      'psuhhonoustamine',
      'juuranoustamine',
      'tegevused_lapsega',
      'tugiteenused',
    ],
    violence: [
      'fuusiline_vagivald',
      'vaimne_vagivald',
      'majanduslik_vagivald',
      'seksuaalne_vagivald',
      'inimkaubandus',
      'teadmata_vagivald',
      'partner_vagivallatseja',
      'ekspartner_vagivallatseja',
      'vanem_vagivallatseja',
      'laps_vagivallatseja',
      'sugulane_vagivallatseja',
      'tookaaslane_vagivallatseja',
      'muu_vagivallatseja',
      'vagivallatseja_vanus',
      'vagivallatseja_sugu',
      'laps_ohver',
      'vana_ohver',
      'muu_ohver',
      'politsei',
    ],
    hosting: ['naise_majutus', 'laste_arv', 'laste_majutus'],
    participants: [
      'umarlaud',
      'marac',
      'perearst_kaasatud',
      'emo_kaasatud',
      'naistearst_kaasatud',
      'politsei_kaasatud',
      'prokuratuur_kaasatud',
      'ohvriabi_kaasatud',
      'lastekaitse_kaasatud',
      'kov_kaasatud',
      'tsiviilkohus_kaasatud',
      'kriminaalkohus_kaasatud',
      'haridusasutus_kaasatud',
      'mtu_kaasatud',
      'tuttavad_kaasatud',
    ],
  };
  
  cs = this.defaultChips.unique
  chipsId = zip(range(this.cs.length), this.cs)

  state = {
    formValues: {
      alates: '2017-01-01',
      kuni: '2018-01-01',
      piirkond: 'all',
    },
    data: {},
    chipData: this.chipsId, 
  };

  componentWillMount() {
    this.getReport();
  }

  getReport() {
    const paramValues = Object.assign(
      {},
      this.state.formValues,
      this.defaultChips.unique
    );

    this.props.axios
      .get('generate_report.php', {
        params: paramValues,
      })
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data,
        });
      })
      .catch(err => console.log('report err: ', err));
  }

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;
    const { alates, kuni, piirkond } = this.state.formValues;
    // const currentDate = new Date().toDateInputValue();

    const makeDateField = (id, label) => (
      <FormControl required margin="normal" className={classes.formControl}>
        <TextField
          value={this.state.formValues[id]}
          id={id}
          label={label}
          type="date"
          onChange={this.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    );

    const error = alates && kuni;

    const chips = this.state.chipData.map((data) => (
            <Chip
              key={data[0]}
              label={data[1]}
              onDelete={this.handleDelete(data)}
              className={classes.input}
            />
    ))

    return (
      <ReportLayout title="Aruandlus" selectedTab={0}>
        <React.Fragment>
          <Paper className={classes.formControl}>
            <form>
              {makeDateField('alates', 'Alates')}
              {makeDateField('kuni', 'Kuni')}
              <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={classes.formControl}
                        >
                            Lae tabel alla csv'na
                        </Button>
            </form>
          </Paper>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Unikaalseid kliente
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes>
                <div className={classes.chips}>
                    
                    { chips }
                </div>
              <SimpleLineChart/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Osutatud teenused
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Vägivald</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Turvaline ajutine majutus
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Võrgustikutöö teiste organisatsioonidega
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </React.Fragment>
      </ReportLayout>
    );
  }
}

export default withRoot(withStyles(styles)(Graphs));
