import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

const ReviewsSearch = () => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=''
      fullWidth
      placeholder='Search a review...'
      startAdornment={
        <InputAdornment position='start'>
          <SvgIcon color='action' fontSize='small'>
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);

export default ReviewsSearch;
