import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack'

import ImageWrapper from '../ImageWrapper';


export default function ResearcherInfo(props) {
  const [id, setId] = React.useState(props.id);
  const [sex, setSex] = React.useState(props.sex);
  const [rname, setRname] = React.useState(props.rname);
  const [passwd, setPasswd] = React.useState(props.passwd);
  const [dept, setDept] = React.useState(props.dept);

  var usrdict = {
    id: id,
    rname: rname,
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
    setRname(event.target.value);
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

  const [position, setPosition] = React.useState(props.id);
  const [profile, setProfile] = React.useState(props.sex);
  const [work, setWork] = React.useState(props.works);
  const [pic, setPic] = React.useState(props.sex);

  var resdict = {
    pic: pic,
    position: position,
    profile: profile,
    works: work
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    props.onResChange(resdict);
  };

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
    props.onResChange(resdict);
  };

  const handleWorkChange = (event) => {
    setWork(event.target.value);
    props.onResChange(resdict);
  };

  const handlePicChange = (event) => {
    setPic(event.target.value);
    props.onResChange(resdict);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        {props.title}
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <ImageWrapper
            height={500}
            src={props.pic}
            onPicUpdated={handlePicChange}
          />
        </Grid>
        <Grid marginLeft={10} item xs={12} sm={3}>
          <Stack spacing={5}>
            <TextField
              onChange={handleIdChange}
              disabled={!props.allowbasic}
              required
              id="number"
              name="number"
              label="工号"
              defaultValue={props.id}
              variant="standard"
            />
            <TextField
              onChange={handleRnameChange}
              disabled={!props.allowbasic}
              required
              id="name"
              name="name"
              label="姓名"
              defaultValue={props.rname}
              variant="standard"
            />
            <TextField
              onChange={handlePasswdChange}
              required
              id="passwd"
              name="passwd"
              label="密码"
              defaultValue={props.passwd}
              variant="standard"
            />
            <TextField
              onChange={handlePositionChange}
              disabled={!props.allowbasic}
              required
              id="position"
              name="position"
              label="职位"
              defaultValue={props.position}
              variant="standard"
            />
            <TextField
              onChange={handleDeptChange}
              disabled={!props.allowbasic}
              required
              id="dept"
              name="dept"
              label="所在部门"
              defaultValue={props.dept}
              variant="standard"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sex-select">性别</InputLabel>
              <Select
                disabled={!props.allowbasic}
                labelId="sex-select"
                id="sex"
                value={sex}
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
        <Grid marginTop={2} item xs={12}>
          <TextField
            onChange={handleProfileChange}
            id="outlined-multiline-static"
            fullWidth
            label="个人简介"
            multiline
            defaultValue={props.profile}
            rows={10}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleWorkChange}
            id="outlined-multiline-static"
            label="代表成果"
            fullWidth
            multiline
            defaultValue={props.works}
            rows={10}
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}
