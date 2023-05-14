import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


const AppBarBase = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...({
    width: `calc(100% - ${drawerwidth}px)`
  }),
}));


export default function AppBar(props) {
  return (
    <AppBarBase position="absolute" drawerwidth={props.drawerwidth}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ pr: '24px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                高校教科研成果统计系统
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBarBase>);
}
