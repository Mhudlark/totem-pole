import SnackBar from '@/components/SnackBar';

type DebugProps = {
  children: any;
};

const Debug = ({ children }: DebugProps) => {
  return (
    <>
      {children}
      <SnackBar />
    </>
  );
};

export default Debug;
