import React, { Component } from 'react';
import { isBrowser } from '../../auth';
import CSVParser from 'papaparse';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import { shallowCompare, uniqueArr } from '../../util';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Chart from './Chart';
import axios from 'axios';

export class ReportPanel extends Component {
  state = {
    selectedTab: 0,
    data: null,
  };

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

  static getDerivedStateFromProps(props, state) {
    console.log('comparison: ', props.formValues, state.formValues);
    if (!shallowCompare(props.formValues, state.formValues)) {
      console.log('true');
      return {
        data: null,
        formValues: { ...props.formValues },
      };
    }
    console.log('false');
    return null;
  }

  componentDidMount = () => {
    this.getReport();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.data === null) {
      this.getReport();
    }
  }

  componentWillUnmount() {
    if (this._request) {
      this._request.cancel();
    }
  }

  handleChange = (event, newTab) => {
    this.setState({ selectedTab: newTab });
  };
  handleChangeIndex = index => {
    this.setState({ selectedTab: index });
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

    this._request = axios.CancelToken.source();
    this.props.axios
      .get('generate_report.php', {
        params: paramValues,
        cancelToken: this._request.token,
      })
      .then(res => {
        const csv = CSVParser.parse(res.data, { dynamicTyping: true, delimiter: '\t' });
        console.log('report: ', csv);
        this.setState({ data: csv.data });
        this._request = null;
        //this.data = csv.data;
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

    const getSubSelectors = (subtopic) => {
      const curColumns = this.props.columns.filter(c => c.subtopic === subtopic);
      const checkboxes = curColumns.map(({ id, topic, label }) => (
        checkbox(id, this.state.checkboxValues, label)
      ));
      return <div> {checkboxes} </div>;
    };

    const topic = this.props.columns[0].topic;
    const title = this.topicMap[topic];

    const subTopics = uniqueArr(this.props.columns.map(c => c.subtopic));
    const subTitles = subTopics.map(st => this.subTopicMap[st]);

    const selectors = subTopics.map(t => getSubSelectors(t));

    const [data, piirkonnad] = this.processData(this.state.data);

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
        </Tabs>}


        <SwipeableViews
          index={this.state.selectedTab}
          onChangeIndex={this.handleChangeIndex}
        >
          {selectors}
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