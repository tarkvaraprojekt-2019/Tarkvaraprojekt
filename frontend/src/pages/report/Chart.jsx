import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import { Bar, BarChart, Label } from 'recharts';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import PropTypes from 'prop-types';
import React from 'react';

const Chart = (props) => {
  const colors = ['#82ca9d', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#85144b', '#F012BE', '#B10DC9', '#001f3f', '#111111', '#AAAAAA'];
  return <ResponsiveContainer width="99%" height={320}>
    <BarChart data={props.data}>
      <CartesianGrid vertical={false} strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend/>
      {props.states.map((s, i) => <Bar dataKey={s} fill={colors[i % colors.length]}/>)}
      <XAxis dataKey="name" interval={0} angle={-90} textAnchor="begin">
        <Label value="Piirkond"/>
      </XAxis>
      <YAxis/>
    </BarChart>
  </ResponsiveContainer>;
};

Chart.propTypes = { data: PropTypes.any.isRequired, states: PropTypes.array.isRequired };

export default Chart;