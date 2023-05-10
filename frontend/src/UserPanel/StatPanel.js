import { Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AchiLineChart, AchiPieChart } from "../MainPage/Chart";
import { API_URL } from "../Constants";

const mdTheme = createTheme();


function GetStatByYear(year) {
  var uid = window.sessionStorage.getItem('id');
  console.log('c');
  return fetch(API_URL + '/getstatbyyear/', {
    method: 'POST',
    body: JSON.stringify({ curusr: uid, year: year }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.json(); });
}

function GetStatByCollege() {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/getstatbycollege/')
    .then((res) => { return res.json() });
}

function GetStatByType() {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/getstatbytype/', {
    method: 'POST',
    body: JSON.stringify({ curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.json() });
}

export function StatPanel() {
  const [stat, setStat] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [xaxis, setXaxis] = React.useState(0);

  function DrawChart() {
    switch (xaxis) {
      case 1:
        GetStatByType()
          .then((data) => setStat(
            data.map((year, val) => (
              {
                year: year,
                count: val.paper + val.article + val.confpaper + val.book + val.patent
              }
            ))
          ));
        break;
      case 2:
        GetStatByCollege()
          .then((data) => {
            let s = [];
            for (let y in data) {
              let count = data[y].paper + data[y].article +
                data[y].confpaper + data[y].book + data[y].patent;
              s.push({ x: y, y: count });
            }
            setStat(s);
          });
        break;
      case 3:
        GetStatByYear()
          .then((data) => {
            let s = [];
            for (let y in data) {
              let count = data[y].paper + data[y].article +
                data[y].confpaper + data[y].book + data[y].patent;
              s.push({ x: y, y: count });
            }
            setStat(s);
          });
        break;
    }
  }

  const handleClick = (e) => DrawChart();

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={mdTheme}>
        <Grid maxWidth="lg">
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            成果统计
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="axis-select-input">选择横轴</InputLabel>
            <Select
              labelId="type-select"
              id="type"
              label="横轴类型"
              onChange={(e) => setXaxis(e.target.value)}
            >
              <MenuItem value="">
                <em>未设置</em>
              </MenuItem>
              <MenuItem value={1}>成果类型</MenuItem>
              <MenuItem value={2}>作者所属学院</MenuItem>
              <MenuItem value={3}>发表年份</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="chart-select-input">选择图表类型</InputLabel>
            <Select
              labelId="type-select"
              id="chart-type"
              label="图表类型"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="">
                <em>未设置</em>
              </MenuItem>
              <MenuItem value={1}>条形图</MenuItem>
              <MenuItem value={2}>饼图</MenuItem>
              <MenuItem value={3}>折线图</MenuItem>
            </Select>
          </FormControl>
          <Button xs={12} variant="contained" onClick={handleClick}>
            确定
          </Button>
          {stat && value == 1 && <AchiLineChart data={stat} />}
          {stat && value == 2 && <AchiPieChart data={stat} />}
          {stat && value == 3 && <AchiLineChart data={stat} />}
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}
