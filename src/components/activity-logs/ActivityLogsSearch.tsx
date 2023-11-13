import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

interface ActivityLogsSearchProps {
  onChange: () => void;
  searchQuery: string;
}

const ActivityLogsSearch: React.FC<ActivityLogsSearchProps> = ({ onChange, searchQuery }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onChange={onChange}
      defaultValue=''
      fullWidth
      placeholder='Search an activity log...'
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

export default ActivityLogsSearch;
