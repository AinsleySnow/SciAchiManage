import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../UserPanel/Title';
import { Box } from '@mui/material';
import { BarChart, Bar, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';


export function AchiLineChart(props) {
  const theme = useTheme();

  return (
    <Box>
      <Title>{props.title}</Title>
      <Box sx={{ paddingLeft: 35 }}>
        <LineChart
          data={props.data}
          width={400}
          height={200}
        >
          <XAxis
            dataKey="x"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="y"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </Box>
    </Box>
  );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

export function AchiPieChart(props) {
  let data = [];
  for (let i = 0; i < props.data.length; i++) {
    const obj = props.data[i];
    const keys = Object.keys(obj);
    const secondKey = keys[1];
    const value = obj[secondKey];
    data.push({ name: obj[keys[0]], value: value });
  }

  return (
    <PieChart width={400} height={300}>
      <Legend />
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}


export function AchiBarChart(props) {
  const theme = useTheme();

  return (
    <Box>
      <Title>{props.title}</Title>
      <Box sx={{ paddingLeft: 35 }}>
        { console.log(props.data) }
        <BarChart
          data={props.data}
          width={400}
          height={200}
        >
          <XAxis
            dataKey="x"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Bar
            dataKey='y'
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
          />
          <Legend/>
          <Bar
            dataKey='期刊论文'
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
          />
            <Bar
            dataKey='会议论文'
            stroke={theme.palette.secondary.main}
            fill={theme.palette.secondary.main}
            />
            <Bar
            dataKey='获奖'
            stroke={theme.palette.error.main}
            fill={theme.palette.error.main}
            />
            <Bar
            dataKey="专著"
            stroke={theme.palette.info.main}
            fill={theme.palette.info.main}
            />
            <Bar
            dataKey="专利"
            stroke={theme.palette.warning.main}
            fill={theme.palette.warning.main}
            />
            <Bar
            dataKey="报刊文章"
            stroke={theme.palette.success.main}
            fill={theme.palette.success.main}
            />
        </BarChart>
      </Box>
    </Box>
  );
}
