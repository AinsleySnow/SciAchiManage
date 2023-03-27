import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack'


export default function UserInfo(props) {
  const [id, setId] = React.useState(props.id);
  const [uname, setUname] = React.useState(props.uname);
  const [passwd, setPasswd] = React.useState(props.passwd);
  const [dept, setDept] = React.useState(props.dept);
  const [sex, setSex] = React.useState(props.sex);

  React.useEffect(
    () => setUname(props.uname),
    [props.uname]
  );
  React.useEffect(
    () => setPasswd(props.passwd),
    [props.passwd]
  );
  React.useEffect(
    () => setDept(props.dept),
    [props.dept]
  );
  React.useEffect(
    () => setSex(props.sex),
    [props.sex]
  );


  var usrdict = {
    id: id,
    uname: uname,
    passwd: passwd,
    dept: dept,
    sex: sex
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
    props.onUsrChange(usrdict);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    props.onUsrChange(usrdict);
  };

  const handleRnameChange = (event) => {
    setUname(event.target.value);
    props.onUsrChange(usrdict);
  };

  const handlePasswdChange = (event) => {
    setPasswd(event.target.value);
    props.onUsrChange(usrdict);
  };

  const handleDeptChange = (event) => {
    setDept(event.target.value);
    props.onUsrChange(usrdict);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        {props.title}
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid marginLeft={10} item xs={12} sm={3}>
          <Stack spacing={5}>
            <TextField
              onChange={handleIdChange}
              disabled={!props.allowbasic}
              required
              id="number"
              name="number"
              label="工号"
              value={id}
              variant="standard"
            />
            <TextField
              onChange={handleRnameChange}
              disabled={!props.allowbasic}
              required
              id="name"
              name="name"
              label="姓名"
              value={uname}
              variant="standard"
            />
            <TextField
              onChange={handlePasswdChange}
              required
              id="passwd"
              name="passwd"
              label="密码"
              value={passwd}
              variant="standard"
            />
            <TextField
              onChange={handleDeptChange}
              disabled={!props.allowbasic}
              required
              id="dept"
              name="dept"
              label="所在部门"
              value={dept}
              variant="standard"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sex-select">性别</InputLabel>
              <Select
                labelId="sex-select"
                id="sex"
                value={sex}
                disabled={!props.allowbasic}
                onChange={handleSexChange}
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
      </Grid>
    </React.Fragment >
  );
}
