import { useEffect, useState } from 'react';
import { provinceByName } from 'select-philippines-address';

export const useSelectProvince = () => {
  const [regionCode, setRegionCode] = useState(null);
  const [provincesState, setProvincesState] = useState(null);

  useEffect(() => {
    provinceByName('Laguna').then((province) => {
      setProvincesState(province);
    });
  }, [regionCode]);

  return [provincesState, setRegionCode];
};
