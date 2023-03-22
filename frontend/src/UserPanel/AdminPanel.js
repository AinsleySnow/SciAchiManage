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
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="用户管理" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DescriptionRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="数据管理" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ApprovalRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="申请处理" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SchoolRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="学院管理" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AutoStoriesRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="添加出版物" />
      </ListItemButton>
    </React.Fragment>
);

const mdTheme = createTheme();

function AdminPanelContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerwidth='240'/>
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <InfoTable />
                </Paper>
              </Grid>
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
