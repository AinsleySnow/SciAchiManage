import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const drawerwidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    () => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerwidth,
        boxSizing: 'border-box'
      },
    }),
  );

export default Drawer;
