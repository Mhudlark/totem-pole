import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Meta } from '@/layouts/Meta';
import { closeAlert, openAlert } from '@/store/alerts/actions';
import { AlertType } from '@/store/alerts/helpers';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const alertTypes = Object.values(AlertType);

  const triggerAlert = (type: AlertType) => {
    dispatch(openAlert(type, `msg --- ${type} --- msg`));
  };

  const dismissAlert = () => {
    dispatch(closeAlert());
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <img
        src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
        alt="Nextjs starter banner"
      />
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
    </Main>
  );
};

export default Index;
