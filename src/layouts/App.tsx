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
      {children}
      <SnackBar />
    </>
  );
};

export default App;
