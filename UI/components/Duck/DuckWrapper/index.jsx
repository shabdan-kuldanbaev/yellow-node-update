import dynamic from 'next/dynamic';
import { useDuckWrapper } from './utils/useDuckWrapper';

const Duck = dynamic(() => import('UI/components/Duck/Duck'), { ssr: false });

const DuckWrapper = (props) => {
  const { duck, sloganRef } = useDuckWrapper(props);

  return (duck && (
    <Duck
      sloganRef={sloganRef}
      duck={duck}
    />
  ));
};

export default DuckWrapper;
