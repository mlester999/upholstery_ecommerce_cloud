import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ReceiptPercentIcon from '@heroicons/react/24/solid/ReceiptPercentIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/portal/dashboard',
    icon: (
      <SvgIcon fontSize='small'>
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Sellers',
    path: '/portal/sellers',
    icon: (
      <SvgIcon fontSize='small'>
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Customers',
    path: '/portal/customers',
    icon: (
      <SvgIcon fontSize='small'>
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Products',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Deliveries',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <TruckIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Discount Vouchers',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <ReceiptPercentIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Transactions',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Reviews',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <StarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Logs',
    path: '/login',
    icon: (
      <SvgIcon fontSize='small'>
        <DocumentTextIcon />
      </SvgIcon>
    ),
  },
];
