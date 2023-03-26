import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';

import { Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Routes, Route } from 'react-router-dom'

import { API_URL } from '../Constants';
import { GetUser } from './Common';
import { GetResearcher } from './Common';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import InfoTable from './InfoTable';
import ResearcherInfo from './ResearcherInfo';
import { ArticleInfo, BookInfo, ConferenceInfo, JournalInfo,
  NewspaperInfo, PaperInfo, PatentInfo } from './ApplyForm';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const resListItems = (
  <React.Fragment>
    <ListItemButton href='/my/achievements'>
      <ListItemIcon>
        <EmojiEventsRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="我的成果" />
    </ListItemButton>
    <ListItemButton href='/my/apply'>
      <ListItemIcon>
        <ApprovalRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="添加成果" />
    </ListItemButton>
    <ListItemButton href='/my/settings'>
      <ListItemIcon>
        <SettingsRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="修改信息" />
    </ListItemButton>
  </React.Fragment>
);

const mdTheme = createTheme();

function SettingPanel() {
  const [rname, SetRname] = React.useState('');
  const [passwd, setPassws] = React.useState('');
  const [sex, SetSex] = React.useState('');
  const [dept, SetDept] = React.useState('');

  const [position, SetPosition] = React.useState('');
  const [profile, SetProfile] = React.useState('');
  const [work, SetWork] = React.useState('');
  const [pic, SetPic] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  React.useEffect(() => {
    GetUser(uid, uid)
      .then((data) => {
        SetRname(data['name']);
        setPassws(data['passwd']);
        SetSex(data['sex']);
        SetDept(data['dept']);
      });

    GetResearcher(uid)
      .then((data) => {
        SetPic(API_URL + data['pic']);
        SetPosition(data['position']);
        SetProfile(data['profile']);
        SetWork(data['works']);
      });
  }, []);


  var newpasswd = '';

  var resdict = {
    pic: pic,
    position: position,
    profile: profile,
    works: work
  };

  const handlePasswdChange = (dict) => {
    newpasswd = dict['passwd'];
  };

  const handleResChange = (dict) => {
    resdict = { ...dict };
  };


  return (
    <ResearcherInfo
      onUsrChange={handlePasswdChange}
      onResChange={handleResChange}
      allowbasic={false}
      title={'基本信息'}
      id={uid}
      rname={rname}
      passwd={passwd}
      position={position}
      dept={dept}
      sex={sex}
      profile={profile}
      works={work}
      pic={pic}
    />
  );
}


function ResearcherPanelContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerwidth='240' />
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
          </Toolbar>
          <Divider />
          <List component="nav">
            {resListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Routes>
                <Route path='/'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <InfoTable />
                      </Paper>
                    </Grid>
                  } />
                <Route path='/achievements'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <InfoTable />
                      </Paper>
                    </Grid>
                  } />
                <Route path='/apply'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <JournalInfo />
                        <PaperInfo />
                        <NewspaperInfo />
                        <ArticleInfo />
                        <ConferenceInfo />
                        <BookInfo />
                        <PatentInfo />
                        <Button sx={{ marginLeft: 105, marginTop: 4, marginBottom: 1, maxWidth: 100 }} variant='contained'>确定</Button>
                      </Paper>
                    </Grid>
                  } />
                <Route path='/settings'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SettingPanel />
                      </Paper>
                    </Grid>
                  } />
              </Routes>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function ResearcherPanel() {
  return <ResearcherPanelContent />;
}
