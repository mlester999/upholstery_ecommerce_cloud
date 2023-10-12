import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

interface ShopsSearchProps {
  onChange: () => void;
  searchQuery: string;
}

const ShopsSearch: React.FC<ShopsSearchProps> = ({ onChange, searchQuery }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onChange={onChange}
      defaultValue=''
      fullWidth
      placeholder='Search a shop...'
      startAdornment={
        <InputAdornment position='start'>
          <SvgIcon color='action' fontSize='small'>
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
      value={searchQuery}
    />
  </Card>
);

export default ShopsSearch;
