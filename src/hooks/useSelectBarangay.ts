import { useEffect, useState } from 'react';
import { barangays } from 'select-philippines-address';

export const useSelectBarangay = () => {
  const [cityCode, setCityCode] = useState(null);
  const [barangaysState, setBarangaysState] = useState(null);

  useEffect(() => {
    barangays('043404').then((barangay) => setBarangaysState(barangay));
  }, [cityCode]);

  return [barangaysState, setCityCode];
};
