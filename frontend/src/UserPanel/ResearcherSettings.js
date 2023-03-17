import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack'
import Image from 'mui-image';

export default function ResearcherSettings() {
  const [sex, setSex] = React.useState('');

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        修改个人信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={500} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid marginLeft={10} item xs={12} sm={3}>
          <Stack spacing={5}>
            <TextField
              required
              id="number"
              name="number"
              label="工号"
              variant="standard"
            />
            <TextField
              required
              id="name"
              name="name"
              label="姓名"
              variant="standard"
            />
            <TextField
              required
              id="position"
              name="position"
              label="职位"
              variant="standard"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sex-select">性别</InputLabel>
              <Select
                labelId="sex-select"
                id="sex"
                value={sex}
                onChange={handleChange}
                label="性别"
              >
                <MenuItem value="">
                  <em>未设置</em>
                </MenuItem>
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={2}>女</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid marginTop={2} item xs={12}>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            label="个人简介"
            multiline
            rows={10}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="代表成果"
            fullWidth
            multiline
            rows={10}
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}
