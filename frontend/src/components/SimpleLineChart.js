import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { name: 'Mon', Kliente: 2200, Rahastus: 3400, Sessioone: 1200,  },
  { name: 'Tue', Kliente: 1280, Rahastus: 2398, Sessioone: 120,  },
  { name: 'Wed', Kliente: 5000, Rahastus: 4300, Sessioone: 1000,  },
  { name: 'Thu', Kliente: 4780, Rahastus: 2908, Sessioone: 1200,  },
  { name: 'Fri', Kliente: 5890, Rahastus: 4800, Sessioone: 1400,  },
  { name: 'Sat', Kliente: 4390, Rahastus: 3800, Sessioone: 1800,  },
  { name: 'Sun', Kliente: 4490, Rahastus: 4300, Sessioone: 1000,  },
  { name: 'Mon', Kliente: 2200, Rahastus: 3400, Sessioone: 800,  },
  { name: 'Tue', Kliente: 1280, Rahastus: 2398, Sessioone: 200,  },
  { name: 'Wed', Kliente: 5000, Rahastus: 4300, Sessioone: 100,  },
  { name: 'Thu', Kliente: 4780, Rahastus: 2908, Sessioone: 10,  },
  { name: 'Fri', Kliente: 5890, Rahastus: 4800, Sessioone: 1200,  },
  { name: 'Sat', Kliente: 4390, Rahastus: 3800, Sessioone: 1200,  },
  { name: 'Sun', Kliente: 4490, Rahastus: 4300, Sessioone: 1200,  },
];

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Kliente" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Rahastus" stroke="#8884d8" />
        <Line type="monotone" dataKey="Sessioone" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
