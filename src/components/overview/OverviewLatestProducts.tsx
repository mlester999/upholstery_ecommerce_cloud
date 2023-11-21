import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const navigate = useNavigate();

  return (
    <Card sx={sx}>
      <CardHeader title='Latest Products' />
      <List>
        {products?.length === 0 && (
          <ListItem>
            <ListItemText
              primary='No Products Found...'
              primaryTypographyProps={{ variant: 'subtitle1' }}
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
        )}

        {products
          ?.sort((a, b) => b.id - a.id)
          .slice(0, 5)
          .map((product, index) => {
            const hasDivider = index < products.length - 1;
            const ago = formatDistanceToNow(new Date(product.created_at));

            return (
              <ListItem
                onClick={() => navigate(`/portal/products/view/${product.id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f7f7f7',
                  },
                }}
                divider={hasDivider}
                key={product.id}
              >
                <ListItemAvatar>
                  {product.image_file ? (
                    <Box
                      component='img'
                      src={product?.image_file}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'neutral.200',
                        height: 48,
                        width: 48,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={`Created ${ago} ago`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            );
          })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          to='/portal/products'
          color='inherit'
          endIcon={
            <SvgIcon fontSize='small'>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size='small'
          variant='text'
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
