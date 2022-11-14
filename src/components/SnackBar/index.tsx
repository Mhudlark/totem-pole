import type { AlertColor } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeAlert } from '@/store/alerts/actions';
import type { ApplicationStore } from '@/store/sharedHelpers';

const SnackBar = () => {
  const alert = useSelector((state: ApplicationStore) => state.alert);
  const dispatch = useDispatch();

  const closeSnackBar = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={alert.open}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      ClickAwayListenerProps={{ onClickAway: () => {} }}
    >
      {alert.open ? (
        <Alert
          onClose={closeSnackBar}
          severity={alert.type as AlertColor}
          variant="filled"
          sx={{ width: '100%', minWidth: '160px' }}
        >
          {alert?.message ?? alert?.type}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default SnackBar;
