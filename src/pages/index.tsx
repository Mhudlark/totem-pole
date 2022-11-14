import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { closeAlert, openAlert } from '@/store/alerts/actions';
import { AlertType } from '@/store/alerts/helpers';

const Index = () => {
  const dispatch = useDispatch();

  const alertTypes = Object.values(AlertType);

  const triggerAlert = (type: AlertType) => {
    dispatch(openAlert(type, `msg --- ${type} --- msg`));
  };

  const dismissAlert = () => {
    dispatch(closeAlert());
  };

  return (
    <>
      {alertTypes.map((type) => (
        <Button
          key={type}
          onClick={() => triggerAlert(type)}
          variant="outlined"
          color={type}
        >{`Trigger ${type}`}</Button>
      ))}
      <Button
        variant="outlined"
        onClick={dismissAlert}
      >{`Dismiss alert`}</Button>
    </>
  );
};

export default Index;
