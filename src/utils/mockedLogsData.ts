import { subDays, subHours } from 'date-fns';

const now = new Date();

export const logsData = [
  {
    id: '5e887ac47eed253091be10cb',
    title: 'change_details',
    description: 'Customer: Geo Ong changed his first name from Geo to Leo',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    title: 'change_product',
    description:
      'Seller: Daniel Patilya changed his product price from ₱129 to ₱169',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    title: 'change_details',
    description:
      'Customer: Enrique Hill changed his province address from Cavite to Laguna',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    title: 'change_product',
    description:
      'Seller: Liza Sobiranu changed her product stocks from 15 to 185',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    title: 'change_details',
    description:
      'Customer: Nadine Lostre changed her contact number from 09192219512 to 09151925102',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    title: 'change_details',
    description:
      'Seller: Vic Sottoh changed his last name from Sottoh to Sottow',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
  },
  {
    id: '120',
    title: 'change_product',
    description:
      'Seller: Jessica Suho changed her product title from Uratex Foam Customizable for Upholstery to Uratex Foam Non-Customizable for Upholstery',
    ip_address: '127.0.0.1',
    createdAt: subDays(subHours(now, 19), 4).getTime(),
  },
];
