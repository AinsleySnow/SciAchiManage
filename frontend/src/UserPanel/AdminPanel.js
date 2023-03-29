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
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import InfoTable from './InfoTable';
import ResearcherInfo from './ResearcherInfo';
import UserInfo from './UserInfo';
import { Routes, Route, useParams } from 'react-router-dom';
import { API_URL, REACT_URL } from '../Constants';
import { DeleteUser, GetUser, GetResearcher, SetResInfo, SetUserInfo, AddUser, GetCollege, GetCollegeMembers } from './Common'
import { Button, Fab, TextField } from '@mui/material';
import { MessageBar } from '../MessageBar';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const assistantListItems = (
  <React.Fragment>
    <ListItemButton href='/my/users'>
      <ListItemIcon>
        <PeopleAltRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="用户管理" />
    </ListItemButton>
    <ListItemButton href='/my/achi'>
      <ListItemIcon>
        <DescriptionRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="成果管理" />
    </ListItemButton>
    <ListItemButton href='/my/apply'>
      <ListItemIcon>
        <ApprovalRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="申请处理" />
    </ListItemButton>
    <ListItemButton href='/my/college'>
      <ListItemIcon>
        <SchoolRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="学院管理" />
    </ListItemButton>
    <ListItemButton href='/my/published'>
      <ListItemIcon>
        <AutoStoriesRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="报刊/会议管理" />
    </ListItemButton>
  </React.Fragment>
);


function UsrManage() {
  var uid = window.sessionStorage.getItem('id');

  const [users, setUsers] = React.useState(null);
  React.useEffect(() => {
    GetUser(uid, null)
      .then((data) => {
        setUsers(data.map(usr => (
          {
            ...usr,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/users/' + usr.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  return (
    <InfoTable
      title='用户列表'
      heads={['工号', '用户类型', '姓名', '密码', '性别', '部门', '操作']}
      rows={users}
    />
  );
}


function ResearcherInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [rname, setRname] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [dept, setDept] = React.useState('');

  const [position, setPosition] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [work, setWork] = React.useState('');
  const [pic, setPic] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  React.useEffect(() => {
    GetUser(uid, props.id)
      .then((data) => {
        setId(data['id']);
        setRname(data['name']);
        setPasswd(data['passwd']);
        setSex(data['sex']);
        setDept(data['dept']);
      });

    GetResearcher(props.id)
      .then((data) => {
        setPic(API_URL + '/' + data['photo']);
        setPosition(data['position']);
        setProfile(data['profile']);
        setWork(data['work']);
      });
  }, []);

  var usrdict = {
    id: id,
    rname: rname,
    passwd: passwd,
    sex: sex,
    dept: dept
  };

  var resdict = {
    pic: pic,
    position: position,
    profile: profile,
    works: work
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleUsrChange = (dict) => {
    usrdict = { ...dict };
  };

  const handleResChange = (dict) => {
    resdict = { ...dict };
  };

  const doUpdate = (e) => {
    let succeed = SetUserInfo(props.id, usrdict);

    if (!succeed)
      setOpen(true);
    if (id != props.id)
      props.id = id;

    succeed = SetResInfo(id, resdict);
    console.log(succeed)
    if (!succeed)
      setOpen(true);
  };

  const doDelete = (e) => {
    var succeed = DeleteUser(props.id);
    if (!succeed)
      setOpen(true);
  };

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <ResearcherInfo
        onUsrChange={handleUsrChange}
        onResChange={handleResChange}
        allowbasic={true}
        title={'编辑用户信息'}
        id={id}
        rname={rname}
        passwd={passwd}
        position={position}
        dept={dept}
        sex={sex}
        profile={profile}
        works={work}
        pic={pic}
      />
      <Button
        sx={{
          marginTop: 4,
          marginRight: 4
        }}
        variant='contained'
        color='error'
        onClick={doUpdate}
      >
        确认更改
      </Button>
      <Button
        sx={{ marginTop: 4 }}
        variant='contained'
        color='error'
        onClick={doDelete}
      >
        删除用户
      </Button>
    </Grid>
  );
}

function UserInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [uname, setUname] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [dept, setDept] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  var loadfinish = false;
  React.useEffect(() => {
    GetUser(uid, props.id)
      .then((data) => {
        setId(data['id']);
        setUname(data['name']);
        setPasswd(data['passwd']);
        setSex(data['sex']);
        setDept(data['dept']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleUsrChange = (dict) => {
    usrdict = { ...dict };
    usrUpdated = true;
  };

  const doUpdate = (e) => {
    if (!loadfinish)
      return;
    if (usrUpdated) {
      var succeed = SetUserInfo(props.id, usrdict);
      if (!succeed)
        setOpen(true);
      if (id != props.id)
        props.id = id;
    }
  };

  const doDelete = (e) => {
    DeleteUser(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/users'),
        f => setOpen(true));
  };

  var usrUpdated = false;
  var usrdict = {
    id: id,
    uname: uname,
    passwd: passwd,
    sex: sex,
    dept: dept
  };

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <UserInfo
        onUsrChange={handleUsrChange}
        allowbasic={true}
        title={'编辑用户信息'}
        id={id}
        uname={uname}
        passwd={passwd}
        dept={dept}
        sex={sex}
      />
      <Button
        sx={{
          marginTop: 4,
          marginRight: 4
        }}
        variant='contained'
        color='success'
        onClick={doUpdate}
      >
        确认更改
      </Button>
      <Button
        sx={{
          marginTop: 4,
        }}
        variant='contained'
        color='error'
        onClick={doDelete}
      >
        删除用户
      </Button>
    </Grid>
  );
}

function InfoEdit() {
  var id = useParams().id;
  var ty = id.slice(2, 4);
  if (ty === '01')
    return <ResearcherInfoEdit id={id} />;
  else
    return <UserInfoEdit id={id} />;
}


function AddUserPanel() {
  var id = '';
  var uname = '';
  var passwd = '';
  var sex = '';
  var dept = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleUsrChange = (dict) => {
    usrdict = { ...dict };
  };

  var usrdict = {
    id: id,
    uname: uname,
    passwd: passwd,
    sex: sex,
    dept: dept
  };

  const doAddition = () => {
    console.log(usrdict);
    AddUser(usrdict)
      .then((success) => window.location.assign(REACT_URL + '/my/users'),
        (failure) => setOpen(true));
  }

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <UserInfo
        onUsrChange={handleUsrChange}
        allowbasic={true}
        title={'新建用户'}
        id={id}
        uname={uname}
        passwd={passwd}
        dept={dept}
        sex={sex}
      />
      <Button
        sx={{ marginTop: 4 }}
        variant='contained'
        onClick={doAddition}
      >
        确定
      </Button>
    </Grid>
  );
}

function AddFab(props) {
  return (
    <Fab
      onClick={props.handleClick}
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        float: 'right',
        float: 'right',
        bottom: 50,
        right: 100
      }}
    >
      <AddIcon />
    </Fab>
  );
}


function DataPanel() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <InfoTable
          title='期刊论文'
          heads={['标题', '作者', '刊物', '链接', '操作']} />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='会议论文'
          heads={['标题', '作者', '会议名', '链接', '操作']}
        />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='报刊文章'
          heads={['标题', '作者', '报纸名', '链接', '操作']}
        />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='著作'
          heads={['题目', '书号', '作者', '出版社', '出版年', '出版地', '链接', '操作']}
        />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='专利'
          heads={['专利号', '公布号', '专利名', '申请人', '发明人',
            '专辑', '专题', '分类号', '主分类号', '链接', '操作']}
        />
      </Grid>
    </Grid>
  );
}


function ApplyPanel() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <InfoTable
          title='申请列表'
          heads={['申请人', '部门', '状态', '操作']} />
      </Grid>
    </Grid>
  );
}


function PublishPanel() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <InfoTable
          title='期刊列表'
          heads={['ISSN', '标题', '主办机构', '出版周期',
            '影响因子', '分区', '链接', '操作']} />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='报纸列表'
          heads={['ISSN', '题目', '主管机构', '主办机构', '出版地',
            '地址', '邮编', '电话', '链接']} />
      </Grid>
      <Grid item xs={12}>
        <InfoTable
          title='会议列表'
          heads={['ISSN', '题目', '主管机构', '主办机构', '出版地',
            '地址', '邮编', '电话', '链接']} />
      </Grid>
    </Grid>
  );
}


function CollegePanel() {
  const [college, setCollege] = React.useState();

  React.useEffect(() => {
    GetCollege()
      .then((data) => {
        setCollege(data.map(c => (
          {
            ...c,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/college/' + c.id}>
                  查看
                </Link>
              </Typography>
          }
        )));
      })
  }, []);

  return <InfoTable
    title='学院列表'
    heads={['编号', '名称', '操作']}
    rows={college}
  />
}


function CollegeMembers() {
  var id = useParams();

  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    GetCollegeMembers(id)
      .then((data) => {
        setUsers(data.map(usr => (
          {
            ...usr,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/users/' + usr.id}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      })
  }, []);

  return <InfoTable
    title='成员列表'
    heads={['工号', '用户类型', '姓名', '密码', '性别', '部门', '操作']}
    rows={users}
  />
}


function AddCollegePanel() {
  var name = '';
  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleChange = (e) => {
    name = e.target.value;
  }

  const doAddition = () => {
    AddUser(name)
      .then((success) => window.location.assign(REACT_URL + '/my/users'),
        (failure) => setOpen(true));
  }

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <TextField
        label='学院名称'
        onChange={handleChange}
      />
      <Button
        sx={{ marginTop: 4 }}
        variant='contained'
        onClick={doAddition}
      >
        确定
      </Button>
    </Grid>
  );
}


const mdTheme = createTheme();

function AdminPanelContent() {
  const doUserAddition = () => {
    window.location.assign(REACT_URL + '/my/users/add');
  }

  const doCollegeDeletion = () => {
    window.location.assign(REACT_URL + '/my/college/add');
  }

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
            {assistantListItems}
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
                        <UsrManage />
                      </Paper>
                      <AddFab handleClick={doUserAddition} />
                    </Grid>
                  } />
                <Route path='/users'>
                  <Route path='/users' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <UsrManage />
                      </Paper>
                      <AddFab handleClick={doUserAddition} />
                    </Grid>} />
                  <Route path='/users/add' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <AddUserPanel />
                      </Paper>
                    </Grid>} />
                  <Route path='/users/:id' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <InfoEdit />
                      </Paper>
                    </Grid>} />
                </Route>
                <Route path='/college'>
                  <Route path='/college' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CollegePanel />
                      </Paper>
                      <AddFab handleClick={doUserAddition} />
                    </Grid>
                  } />
                  <Route path='/college/add' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <AddCollegePanel />
                      </Paper>
                    </Grid>
                  } />
                  <Route path='/college/:id' element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CollegeMembers />
                        <Button
                          marginTop={4}
                          color='error'
                          onClick={doCollegeDeletion}
                        >
                          删除学院
                        </Button>
                      </Paper>
                    </Grid>} />
                </Route>
                <Route path='/achi' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <DataPanel />
                    </Paper>
                  </Grid>
                } />
                <Route path='/apply' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <ApplyPanel />
                    </Paper>
                  </Grid>
                } />
                <Route path='/published' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <PublishPanel />
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

export default function AdminPanel() {
  return <AdminPanelContent />;
}
