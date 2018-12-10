import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import SwipeableViews from 'react-swipeable-views';

import withRoot from '../../withRoot';
import Layout from '../../components/Layout';
import { isBrowser } from '../../auth';


import { uniqueArr } from '../../util';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { Bar, BarChart, Label } from 'recharts';

import CSVParser from 'papaparse';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';

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

function Chart(props) {
  const colors = ['#82ca9d', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#85144b', '#F012BE', '#B10DC9', '#001f3f', '#111111', '#AAAAAA'];
  return <ResponsiveContainer width="99%" height={320}>
    <BarChart data={props.data}>

      <CartesianGrid vertical={false} strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend/>
      {/*<Bar dataKey="Tartumaa" stroke={colors[0 % colors.length]} activeDot={{ r: 8 }}/>*/}
      {props.states.map((s, i) => (
        <Bar dataKey={s} fill={colors[i % colors.length]}/>
      ))
      }
      <XAxis dataKey="name" interval={0} angle={-90} textAnchor="begin">
        <Label value="piirkond"/>
      </XAxis>
      <YAxis/>


    </BarChart>
  </ResponsiveContainer>;
}

Chart.propTypes = { data: PropTypes.any.isRequired, states: PropTypes.array.isRequired };

class ReportPanel extends Component {
  constructor(props) {
    super(props);
    const ids = {};
    const labels = {};
    for (let c of this.props.columns) {
      ids[c.id] = true;
      labels[c.label] = c.id;
    }
    //const ids = {...this.props.columns.map(c => { return { [c.id]: true}; })}
    this.state = { labels: labels, checkboxValues: ids, selectedTab: 0 };
  }

  handleChange = (event, newTab) => {
    this.setState({ selectedTab: newTab });
  };
  handleChangeIndex = index => {
    this.setState({ selectedTab: index });
  };
  componentDidMount = () => {
    this.getReport();
  };


  getReport = () => {
    if (!isBrowser) {
      return false;
    }

    const paramValues = Object.assign(
      {},
      this.props.formValues,
      this.state.checkboxValues,
    );
    if (this.props.formValues.piirkond === 'koos') {
      delete paramValues.piirkond;
    }

    this.props.axios
      .get('generate_report.php', {
        params: paramValues,
      })
      .then(res => {
        const csv = CSVParser.parse(res.data, { dynamicTyping: true, delimiter: '\t' });
        console.log('report: ', csv);
        this.setState({ data: csv.data });
        //this.data = csv.data;
        this.forceUpdate();
      })
      .catch(err => console.log('report err: ', err));
  };
  topicMap = {
    'unique': 'Unikaalseid kliente',
    'service-hours': 'Osutatud teenused',
    'violence': 'Vägivald',
    'participants': 'Võrgustikutöö teiste organisatsioonidega',
    'hosting': 'Turvaline ajutine majutus',
  };
  subTopicMap = {
    'general': 'Üldine',
    'gov': 'Riigiasutused',
    'medical': 'Meditsiinitöötajad',
    'cause': 'Vägivallatseja',
    'other': 'Muu',
    'type': 'Vägivalla tüüp',
  };
  checkboxChange = field => {
    const checkboxValues = this.state.checkboxValues;
    checkboxValues[field] = !checkboxValues[field];
    this.setState({ checkboxValues });
  };
  processData = (data) => {
    if (!data || data[0].length === 1) {
      return [null, null];
    }
    console.log('process: ', data);
    let nonEmpty = [...data.filter(e => e != '')];
    const longData = [];

    if (nonEmpty[0][0] === 'piirkond') {
      // headers
      for (let name of nonEmpty[0].slice(1)) {
        longData.push({ name });
      }
      // data
      nonEmpty.slice(1).forEach(([piirkond, ...values], i) => {
        values.forEach((e, ii) => longData[ii][piirkond] = values[ii]);
      });
      const piirkonnad = nonEmpty.slice(1).map(p => p[0]);

      // filter out unchecked
      const outData = longData.filter(({ name }) => this.state.checkboxValues[this.state.labels[name]]);
      return [outData, piirkonnad];
    } else {
      // headers
      for (let name of nonEmpty[0].slice(0)) {
        longData.push({ name });
      }
      // data
      nonEmpty.slice(1).forEach(([...values], i) => {
        values.forEach((e, ii) => longData[ii]['summa'] = values[ii]);
      });
      const piirkonnad = ['summa'];

      // filter out unchecked
      const outData = longData.filter(({ name }) => this.state.checkboxValues[this.state.labels[name]]);
      return [outData, piirkonnad];
    }
  };

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   console.log("got update", this.props.formValues)
  //   if (this.props.formValues.alates !== prevProps.formValues.alates ||
  //       this.props.formValues.kuni !== prevProps.formValues.kuni ||
  //       this.props.formValues.piirkond !== prevProps.formValues.piirkond
  //   ) {
  //     console.log("calling getReport");
  //     this.getReport();
  //   }
  // }

  render() {

    const checkbox = (id, statename, label) => (
      <FormControlLabel key={id} control={
        <Checkbox
          checked={statename[id]}
          onClick={() => {
            this.checkboxChange(id);
          }}
        />
      } label={label}/>
    );
    const topic = this.props.columns[0].topic;

    const getSubSelectors = (subtopic) => {
      const curColumns = this.props.columns.filter(c => c.subtopic === subtopic);
      const checkboxes = curColumns.map(({ id, topic, label }) => (
        checkbox(id, this.state.checkboxValues, label)
      ));
      return <div> {checkboxes} </div>;
    };
    const subTopics = uniqueArr(this.props.columns.map(c => c.subtopic));
    const subTitles = subTopics.map(st => this.subTopicMap[st]);
    const title = this.topicMap[topic];
    const selectors = subTopics.map(t => getSubSelectors(t));
    //console.log("DEBUG: ",selectors)
    //debugger;
    const [data, piirkonnad] = this.processData(this.state.data);
    console.log('prev: ', this.state.data);
    console.log('data ', data, 'piirkonnad: ', piirkonnad);
    return <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography className={this.props.classes.heading}>
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={this.props.classes.panel}>
        {subTitles.length > 1 && <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          {subTitles.map(t => <Tab label={t} key={t}/>)}
        </Tabs>
        }
        <SwipeableViews
          index={this.state.selectedTab}
          onChangeIndex={this.handleChangeIndex}
        >
          {selectors}
          {/*{subTopics.map(t => <Typography component="div" style={{padding: 8*3}}>{t}</Typography>)}*/}

        </SwipeableViews>
        {!!data && <Chart data={data} states={piirkonnad} className={this.props.classes.chart}/>}
      </ExpansionPanelDetails>
    </ExpansionPanel>;
  }
}

ReportPanel.propTypes = {
  classes: PropTypes.any,
  columns: PropTypes.array.isRequired,
  formValues: PropTypes.any.isRequired,
};

class Graphs extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = event => {
    const formValues = this.state.formValues;
    const id = event.target.id || event.target.name;
    formValues[id] = event.target.value;
    this.setState({ formValues });
    console.log('handleChange: ', this.state);
  };

  columns =
    [{
      'id': 'kriisinoustamine',
      'label': 'Kriisinõustamiste aeg',
      'topic': 'service-hours',
    },
      {
        'id': 'kriisinoustamine_paeval',
        'label': 'Kriisinõustamisi päeval',
        'topic': 'service-hours',
      },
      {
        'id': 'kriisinoustamine_oosel',
        'label': 'Kriisinõustamisi öösel',
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
        'id': 'vagivallatseja_sugu_mees',
        'label': 'Mees vägivallatseja',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vagivallatseja_sugu_naine',
        'label': 'Naine vägivallatseja',
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
        'id': 'vagivallatseja_vanus_18',
        'label': 'Vägivallatseja alla 18',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vagivallatseja_vanus_24',
        'label': 'Vägivallatseja 18-24',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vagivallatseja_vanus_49',
        'label': 'Vägivallatseja 25-49',
        'subtopic': 'general',
        'topic': 'violence',
      },
      {
        'id': 'vagivallatseja_vanus_64',
        'label': 'Vägivallatseja vanus 50-64',
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
      },
      { 'id': 'session_id', 'label': 'Sessioonide arv', 'topic': 'unique' },
      { 'id': 'kliendi_nr', 'label': 'Klientide arv', 'topic': 'unique' },
      { 'id': 'rahastus', 'label': 'NTK rahastus', 'topic': 'unique' },
      { 'id': 'incident_id', 'label': 'Juhtumite arv', 'topic': 'unique' },
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
        'label': 'Seksuaalne vägivald',
        'subtopic': 'type',
        'topic': 'violence',
      },
      {
        'id': 'inimkaubandus',
        'label': 'Inimkaubandus',
        'subtopic': 'type',
        'topic': 'violence',
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
      }];

  state = {
    formValues: {
      alates: '2017-01-01',
      kuni: '2018-01-01',
      piirkond: 'all',
    },
    data: {},
  };

  componentWillMount() {
    this.getReport();

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
            <form>
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
                                  axios={this.props.axios}/>;
            })
          }
        </div>
        1
      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(Graphs));
