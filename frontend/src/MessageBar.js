import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function MessageBar({ children, ...props }) { 
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.dura}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={props.onClose} severity="error" sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
}
