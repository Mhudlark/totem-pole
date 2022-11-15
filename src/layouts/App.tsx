import { Container } from '@mui/material';

import SnackBar from '@/components/SnackBar';

import { Meta } from './Meta';

type AppLayoutProps = {
  children: any;
};

const App = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
      <Container
        sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 4, sm: 6, md: 8 }, m: 0 }}
      >
        {children}
      </Container>
      <SnackBar />
    </>
  );
};

export default App;
