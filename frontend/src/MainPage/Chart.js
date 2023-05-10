import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../UserPanel/Title';
import { Box } from '@mui/material';


export function AchiLineChart(props) {
  const theme = useTheme();

  return (
    <Box>
      <Title>{props.title}</Title>
      <Box sx={{ paddingLeft: 35 }}>
        { console.log(props.data) }
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


export function AchiPieChart(props) {

}


export function AchiBarChart(props) {

}
