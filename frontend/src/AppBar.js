import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { API_URL, REACT_URL } from './Constants';


const AppBarBase = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...({
    width: `calc(100% - ${drawerwidth}px)`
  }),
}));


export default function AppBar(props) {
  const handleMyClick = (e) => {
    e.preventDefault();
    var islogged = false;

    fetch(API_URL + '/logged')
      .then((res) => islogged = res.text() === 'logged');

    if (islogged) window.location.assign(REACT_URL + '/my');
    else window.location.assign(REACT_URL + '/login');
  };

  return (
    <AppBarBase position="absolute" drawerwidth={props.drawerwidth}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ pr: '24px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
              onClick={(e) => window.location.assign(REACT_URL)}
            >
              首页
            </Button>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
              onClick={(e) => window.location.assign(REACT_URL + '/college')}
            >
              学院
            </Button>
            <Button
              sx={{ color: 'white', display: 'block', fontSize: '18px' }}
              onClick={handleMyClick}
            >
              我的
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBarBase>);
}
