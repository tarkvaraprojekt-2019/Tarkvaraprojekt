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
import { isBrowser } from '../../auth';
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
  },
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
    unique: {
        'incident_id': 'Juhtumite arv',
         'session_id': 'Sessioonide arv',
          'kliendi_nr': 'Klientide arv',
           'rahastus': 'NTK rahastus',
        },
    service_hours: {
        "sidevahendid" :'Nõustamisi sidevahenditega',
         "kriisinoustamine" :'Kriisinõustamiste aeg',
         "kriisinoustamise_aeg": 'Kriisinõustamisi päeval ja öösel',
         "juhtuminoustamine" :'Juhtuminõustamiste aeg',
         "vorgustikutoo" :'Võrgustikutöö aeg',
         "psuhhonoustamine" :'Psühhonõustamiste aeg',
         "juuranoustamine" :'Juuranõustamiste aeg',
         "tegevused_lapsega" :'Lastega tegevuste aeg',
         "tugiteenused" :'Tugiteenuste aeg', 
     },
    violence: {
        "fuusiline_vagivald" :'Füüsiline vägivald',
        "vaimne_vagivald" :'Vaimne vägivald',
        "majanduslik_vagivald" :'Füüsiline vägivald',
        "seksuaalne_vagivald" :'Füüsiline vägivald',
        "inimkaubandus" :'Inimkaubandus',
        "teadmata_vagivald" :'Teadmata vägivald',
        "partner_vagivallatseja" :'Partner vägivallatseja',
        "ekspartner_vagivallatseja" :'Ekspartner vägivallatseja',
        "vanem_vagivallatseja" :'Vanem vägivallatseja',
        "laps_vagivallatseja" :'Laps vägivallatseja',
        "sugulane_vagivallatseja" :'Sugulane vagivallatseja',
        "tookaaslane_vagivallatseja" :'Töökaaslane vägivallatseja',
        "muu_vagivallatseja" :'Muu vägivallatseja',
        "vagivallatseja_vanus": 'Vägivallatseja vanus',
        "vagivallatseja_sugu": 'Vägivallatseja sugu',
        "laps_ohver" :'Alaealine lisaohvriks',
        "vana_ohver" :'Eakas lisaohvriks',
        "muu_ohver" :'Muu lisaohver',
        "politsei" :'Politsei kaasatud',
    },
    hosting: {
        "naise_majutus" :'Naise majutuspäevade arv',
        "laste_arv" :'Laste arv majutuses',
        "laste_majutus" :'Laste majutuspäevade arv',
    },
    participants: {
        "umarlaud" :'Ümarlauad',
        "marac" :'MARAC',
        "perearst_kaasatud" :'Perearst',
        "emo_kaasatud" :'EMO',
        "naistearst_kaasatud" :'Naistearst',
        "politsei_kaasatud" :'Politsei',
        "prokuratuur_kaasatud" :'Prokuratuur',
        "ohvriabi_kaasatud" :'Riiklik ohvriabi',
        "lastekaitse_kaasatud" :'Lastekaitse',
        "kov_kaasatud" :'KOV sotsiaalabi',
        "tsiviilkohus_kaasatud" :'Kohus (tsiviilasjas)',
        "kriminaalkohus_kaasatud" :'Kohus (kriminaalasjas)',
        "haridusasutus_kaasatud" :'Haridusasutus',
        "mtu_kaasatud" :'MTÜ-d',
        "tuttavad_kaasatud" :'Sõbrad, sugulased',
    }}

  state = {
    formValues: {
      alates: '2017-01-01',
      kuni: '2018-01-01',
      piirkond: 'all',
    },
    data: {},
    chipData: this.defaultChips.unique, 
  };

  componentWillMount() {
    this.getReport();
  }

  getReport() {
    if (!isBrowser) {
      return false;
    }

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

  handleDelete = key => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      delete chipData[key];
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

    const chips = Object.entries(this.state.chipData).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              onDelete={this.handleDelete(key)}
              className={classes.input}
            />
    ))

    return (
      <ReportLayout title="Aruandlus" selectedTab={0}>
        <div>
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
                            Lae valitud andmed alla csv'na
                        </Button>
            </form>
          </Paper>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Unikaalseid kliente
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
        </div>
      </ReportLayout>
    );
  }
}

export default withRoot(withStyles(styles)(Graphs));
