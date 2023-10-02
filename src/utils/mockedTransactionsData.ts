import { subDays, subHours } from 'date-fns';

const now = new Date();

export const transactionsData = [
  {
    id: '5e887ac47eed253091be10cb',
    transaction_id: 'TRA-COD-0001',
    customer: 'James Reid',
    product: 'Sofa Footings High Quality Plastic Upholstery',
    seller: 'Juan Dela Cruz',
    price: '617',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    transaction_id: 'TRA-COD-0002',
    customer: 'Cong TV',
    product: 'Leather Upholstery Custom Model NMAX Seat',
    seller: 'Maria Santos',
    price: '681',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    transaction_id: 'TRA-COD-0003',
    customer: 'Junnie Boy',
    product: 'Charol Synthetic Leather for Car Seat',
    seller: 'Luis Cruz',
    price: '85',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    transaction_id: 'TRA-COD-0004',
    customer: 'Jak Robirto',
    product: 'Mitsushi Staple Gun Tacker Heavy Duty',
    seller: 'Maria Gonzales',
    price: '139',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    transaction_id: 'TRA-COD-0005',
    customer: 'Barbie Fortiza',
    product: 'Nylon Thread Ticket for Upholstery',
    seller: 'Jose Reyes',
    price: '113',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    transaction_id: 'TRA-COD-0006',
    customer: 'David Likawkow',
    product: 'Anti-Slip Checkered Plate Rubber Flooring Matting',
    seller: 'Rogie Aldueza',
    price: '182',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
  },
  {
    id: '120',
    transaction_id: 'TRA-COD-0007',
    customer: 'James Weird',
    product: 'Uratex Foam Customizable for Upholstery',
    seller: 'Jonas Candelario',
    price: '298',
    createdAt: subDays(subHours(now, 19), 4).getTime(),
  },
];
