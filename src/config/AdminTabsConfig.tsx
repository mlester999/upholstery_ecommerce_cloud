import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ReceiptPercentIcon from '@heroicons/react/24/solid/ReceiptPercentIcon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import ReceiptRefundIcon from '@heroicons/react/24/solid/ReceiptRefundIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon';
import RectangleStackIcon from '@heroicons/react/24/solid/RectangleStackIcon';
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
    disabled: false,
    external: false,
  },
  {
    title: 'Admins',
    path: '/portal/admins',
    icon: (
      <SvgIcon fontSize='small'>
        <UsersIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Sellers',
    path: '/portal/sellers',
    icon: (
      <SvgIcon fontSize='small'>
        <UsersIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Shops',
    path: '/portal/shops',
    icon: (
      <SvgIcon fontSize='small'>
        <BuildingStorefrontIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Customers',
    path: '/portal/customers',
    icon: (
      <SvgIcon fontSize='small'>
        <UserGroupIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Categories',
    path: '/portal/categories',
    icon: (
      <SvgIcon fontSize='small'>
        <RectangleStackIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Products',
    path: '/portal/products',
    icon: (
      <SvgIcon fontSize='small'>
        <ShoppingBagIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Orders',
    path: '/portal/orders',
    icon: (
      <SvgIcon fontSize='small'>
        <TruckIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Discount Vouchers',
    path: '/portal/discount-vouchers',
    icon: (
      <SvgIcon fontSize='small'>
        <ReceiptPercentIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  // {
  //   title: 'Transactions',
  //   path: '/portal/transactions',
  //   icon: (
  //     <SvgIcon fontSize='small'>
  //       <CurrencyDollarIcon />
  //     </SvgIcon>
  //   ),
  //   disabled: false,
  //   external: false,
  // },
  {
    title: 'Reviews',
    path: '/portal/reviews',
    icon: (
      <SvgIcon fontSize='small'>
        <StarIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Returns / Refunds',
    path: '/portal/returns-and-refunds',
    icon: (
      <SvgIcon fontSize='small'>
        <ReceiptRefundIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
  {
    title: 'Activity Logs',
    path: '/portal/activity-logs',
    icon: (
      <SvgIcon fontSize='small'>
        <DocumentTextIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false,
  },
];
