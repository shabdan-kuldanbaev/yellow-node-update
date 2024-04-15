import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('UI/components/LoadingScreen'));

const LoadingPage = () => (
  <LoadingScreen />
);

export default LoadingPage;
