import { useState } from 'react';

export default function useProps({
  id: idProp,
  children,
  ...restProps
}) {
  const [id] = useState(idProp || children);

  return {
    id,
    children,
    ...restProps,
  };
}
