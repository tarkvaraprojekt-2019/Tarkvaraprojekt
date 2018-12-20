import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import withRoot from '../../withRoot';
import Layout from '../../components/Layout';
import { isBrowser } from '../../auth';


import { uniqueArr } from '../../util';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ReportPanel from '../../components/ReportPanel';
import FileSaver from 'file-saver';

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
    margin: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    flexDirection: 'column',
  },
  chart: {
    paddingDown: theme.spacing.unit * 4,
  },
});

class Graphs extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = event => {
    const formValues = this.state.formValues;
    const id = event.target.id || event.target.name;
    formValues[id] = event.target.value;
    this.setState({ formValues });
    //console.log('handleChange: ', this.state);
  };

  columns =
    [{
      'id': 'kriisinoustamine',
      'label': 'Kriisinõustamiste aeg',
      'topic': 'service-hours',
    },
      {
        'id': 'sidevahendid',
        'label': 'Nõustamisi sidevahenditega',
        'topic': 'service-hours',
      },
      {
        'id': 'tegevused_lapsega',
        'label': 'Lastega tegevuste aeg',
        'topic': 'service-hours',
      },
      {
        'id': 'psuhhonoustamine',
        'label': 'Psühhonõustamiste aeg',
        'topic': 'service-hours',
      },
      {
        'id': 'vorgustikutoo',
        'label': 'Võrgustikutöö aeg',
        'topic': 'service-hours',
      },
      {
        'id': 'juhtuminoustamine',
        'label': 'Juhtuminõustamiste aeg',
        'topic': 'service-hours',
      },
      {
        'id': 'juuranoustamine',
        'label': 'Juuranõustamiste aeg',
        'topic': 'service-hours',
      },
      { 'id': 'tugiteenused', 'label': 'Tugiteenuste aeg', 'topic': 'service-hours' },
      {
        'id': 'kriisinoustamise_aeg',
        'label': 'Kriisinõustamisi päeval ja öösel',
        'topic': 'service-hours',
      },
      {
        'id': 'vagivallatseja_sugu',
        'label': 'Vägivallatseja sugu',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vana_ohver',
        'label': 'Eakas lisaohvriks',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'muu_ohver',
        'label': 'Muu lisaohver',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vagivallatseja_vanus',
        'label': 'Vägivallatseja vanus',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'laps_ohver',
        'label': 'Alaealine lisaohvriks',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'politsei',
        'label': 'Politsei kaasatud',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'perearst_kaasatud',
        'label': 'Perearst',
        'subtopic': 'medical',
        'topic': 'participants',
      },
      {
        'id': 'naistearst_kaasatud',
        'label': 'Naistearst',
        'subtopic': 'medical',
        'topic': 'participants',
      },
      {
        'id': 'emo_kaasatud',
        'label': 'EMO',
        'subtopic': 'medical',
        'topic': 'participants',
      },
      {
        'id': 'session_id',
        'label': 'Sessioonide arv',
        'subtopic': 'general',
        'topic': 'unique',
      },
      {
        'id': 'kliendi_nr',
        'label': 'Klientide arv',
        'subtopic': 'general',
        'topic': 'unique',
      },
      {
        'id': 'rahastus',
        'label': 'NTK rahastus',
        'subtopic': 'general',
        'topic': 'unique',
      },
      {
        'id': 'incident_id',
        'label': 'Juhtumite arv',
        'subtopic': 'general',
        'topic': 'unique',
      },
      { 'id': 'laste_arv', 'label': 'Laste arv majutuses', 'topic': 'hosting' },
      {
        'id': 'laste_majutus',
        'label': 'Laste majutuspäevade arv',
        'topic': 'hosting',
      },
      {
        'id': 'naise_majutus',
        'label': 'Naise majutuspäevade arv',
        'topic': 'hosting',
      },
      {
        'id': 'muu_keel',
        'label': 'Muukeelseid',
        'subtopic': 'language',
        'topic': 'unique',
      },
      {
        'id': 'eesti_keel',
        'label': 'Eestikeelseid',
        'subtopic': 'language',
        'topic': 'unique',
      },
      {
        'id': 'vene_keel',
        'label': 'Venekeelseid',
        'subtopic': 'language',
        'topic': 'unique',
      },
      {
        'id': 'inglise_keel',
        'label': 'Ingliskeelseid',
        'subtopic': 'language',
        'topic': 'unique',
      },
      {
        'id': 'politsei_kaasatud',
        'label': 'Politsei',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'prokuratuur_kaasatud',
        'label': 'Prokuratuur',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'lastekaitse_kaasatud',
        'label': 'Lastekaitse',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'ohvriabi_kaasatud',
        'label': 'Riiklik ohvriabi',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'kriminaalkohus_kaasatud',
        'label': 'Kohus (kriminaalasjas)',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'kov_kaasatud',
        'label': 'KOV sotsiaalabi',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'tsiviilkohus_kaasatud',
        'label': 'Kohus (tsiviilasjas)',
        'subtopic': 'gov',
        'topic': 'participants',
      },
      {
        'id': 'partner_vagivallatseja',
        'label': 'Partner vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'ekspartner_vagivallatseja',
        'label': 'Ekspartner vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'sugulane_vagivallatseja',
        'label': 'Sugulane vagivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'tookaaslane_vagivallatseja',
        'label': 'Töökaaslane vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'muu_vagivallatseja',
        'label': 'Muu vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'laps_vagivallatseja',
        'label': 'Laps vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'vanem_vagivallatseja',
        'label': 'Vanem vägivallatseja',
        'subtopic': 'cause',
        'topic': 'violence',
      },
      {
        'id': 'vanus_18',
        'label': 'Klient alla 18',
        'subtopic': 'age',
        'topic': 'unique',
      },
      {
        'id': 'vanus_24',
        'label': 'Klient 18-24',
        'subtopic': 'age',
        'topic': 'unique',
      },
      {
        'id': 'vanus_49',
        'label': 'Klient 25-49',
        'subtopic': 'age',
        'topic': 'unique',
      },
      {
        'id': 'vanus_99',
        'label': 'Klient 65+',
        'subtopic': 'age',
        'topic': 'unique',
      },
      {
        'id': 'vanus_64',
        'label': 'Klient 50-64',
        'subtopic': 'age',
        'topic': 'unique',
      },
      {
        'id': 'rasedus',
        'label': 'Rasedaid',
        'subtopic': 'people',
        'topic': 'unique',
      },
      { 'id': 'puue', 'label': 'Puudega', 'subtopic': 'people', 'topic': 'unique' },
      {
        'id': 'lapsed',
        'label': 'Alaealisi lapsi',
        'subtopic': 'people',
        'topic': 'unique',
      },
      {
        'id': 'teadmata_vagivald',
        'label': 'Teadmata vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'majanduslik_vagivald',
        'label': 'Füüsiline vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'vaimne_vagivald',
        'label': 'Vaimne vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'fuusiline_vagivald',
        'label': 'Füüsiline vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'seksuaalne_vagivald',
        'label': 'Füüsiline vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'inimkaubandus',
        'label': 'Inimkaubandus',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'umarlaud',
        'label': 'Ümarlauad',
        'subtopic': 'other',
        'topic': 'participants',
      },
      {
        'id': 'haridusasutus_kaasatud',
        'label': 'Haridusasutus',
        'subtopic': 'other',
        'topic': 'participants',
      },
      {
        'id': 'tuttavad_kaasatud',
        'label': 'Sõbrad, sugulased',
        'subtopic': 'other',
        'topic': 'participants',
      },
      {
        'id': 'marac',
        'label': 'MARAC',
        'subtopic': 'other',
        'topic': 'participants',
      },
      {
        'id': 'mtu_kaasatud',
        'label': 'MTÜ-d',
        'subtopic': 'other',
        'topic': 'participants',
      }];

  state = {
    formValues: {
      alates: '2017-01-01',
      kuni: '2018-01-01',
      piirkond: 'all',
    },
    data: {},
    checkboxValues: {},
  };

  componentDidMount() {
    //this.getReport();

    const algus = new Date();
    const lopp = new Date();

    algus.setMonth(algus.getMonth() - 1);
    algus.setDate(1);
    lopp.setMonth(lopp.getMonth());
    lopp.setDate(0);
    let formValues = { ...this.state.formValues };
    formValues.alates = algus.toDateInputValue();
    formValues.kuni = lopp.toDateInputValue();

    this.setState({ formValues });
  }

  getReport() {
    if (!isBrowser) {
      return false;
    }

    const paramValues = Object.assign(
      {},
      this.state.formValues,
      this.state.checkboxValues,
    );
    console.log('csvparams: ', paramValues);

    this.props.axios
      .get('generate_report.php', {
        params: paramValues,
      })
      .then(res => {
        //console.log(res);
        this.setState({
          data: res.data,
        });
        this.downloadCSV('aruandlus');

      })
      .catch(err => console.log('report err: ', err));
  }

  downloadCSV = label => {
    let csv = this.state.data;
    //console.log(csv);

    let filename = label + '-' + this.state.formValues.alates + '-' + this.state.formValues.kuni + '.xls';

    const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, filename);
  };
  handleDownload = (event) => {
    event.preventDefault();
    this.getReport();
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


    const topics = uniqueArr(this.columns.map(c => c.topic));


    // const panelSelectors = checkboxes;


    return (
      <Layout title="Aruandlus" error="">
        <div>
          <Paper>
            <form onSubmit={this.handleDownload}>
              {makeDateField('alates', 'Alates')}
              {makeDateField('kuni', 'Kuni')}

              <FormControl margin="normal">
                <InputLabel htmlFor="piirkond">Piirkond</InputLabel>
                <Select
                  value={this.state.formValues.piirkond}
                  onChange={this.handleChange}
                  id="piirkond"
                  inputProps={{
                    name: 'piirkond',
                    id: 'piirkond',
                  }}>
                  <MenuItem value={'all'}>Kõik eraldi</MenuItem>
                  <MenuItem value={'koos'}>Kõik koos</MenuItem>
                  <MenuItem value={'Tartumaa'}>Tartumaa</MenuItem>
                  <MenuItem value={'Harjumaa'}>Harjumaa</MenuItem>
                  <MenuItem value={'Pärnumaa'}>Pärnumaa</MenuItem>
                  <MenuItem value={'Saaremaa'}>Saaremaa</MenuItem>
                  <MenuItem value={'Hiiumaa'}>Hiiumaa</MenuItem>
                  <MenuItem value={'Võrumaa'}>Võrumaa</MenuItem>
                  <MenuItem value={'Ida-Virumaa'}>Ida-Virumaa</MenuItem>
                  <MenuItem value={'Lääne-Virumaa'}>Lääne-Virumaa</MenuItem>
                  <MenuItem value={'Põlvamaa'}>Põlvamaa</MenuItem>
                  <MenuItem value={'Viljandimaa'}>Viljandimaa</MenuItem>
                  <MenuItem value={'Raplamaa'}>Raplamaa</MenuItem>
                  <MenuItem value={'Jõgevamaa'}>Jõgevamaa</MenuItem>
                  <MenuItem value={'Läänemaa'}>Läänemaa</MenuItem>
                  <MenuItem value={'Järvamaa'}>Järvamaa</MenuItem>
                  <MenuItem value={'Valgamaa'}>Valgamaa</MenuItem>

                </Select>
              </FormControl>
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
          {
            topics.map(topic => {
              const columns = this.columns.filter(e => e.topic === topic);
              return <ReportPanel classes={classes} columns={columns} formValues={this.state.formValues}
                                  axios={this.props.axios} checkboxValues={this.state.checkboxValues}/>;
            })
          }
        </div>
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(Graphs));
