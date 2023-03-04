import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';


const AppBarBase = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...({
    width: `calc(100% - ${drawerWidth}px)`
  }),
}));


export default function AppBar(props) {
  return (
    <AppBarBase position="absolute" drawerWidth={props.drawerWidth}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ pr: '24px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
            >
              首页
            </Button>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
            >
              学院
            </Button>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
            >
              我的
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBarBase>);
}
