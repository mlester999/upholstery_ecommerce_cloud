import { useEffect, useState } from 'react';
import { regionByCode } from 'select-philippines-address';

export const useSelectRegion = () => {
  const [regionsState, setRegionsState] = useState(null);

  useEffect(() => {
    regionByCode('04').then((region) => setRegionsState(region));
  }, []);

  return regionsState;
};
