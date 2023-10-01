import { subDays, subHours } from 'date-fns';

const now = new Date();

export const productsData = [
  {
    id: '5e887ac47eed253091be10cb',
    title: 'Sofa Footings High Quality Plastic Upholstery',
    description: 'This is the Sofa Footings High Quality Plastic Upholstery',
    price: '651',
    seller: 'Juan Dela Cruz',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    title: 'Leather Upholstery Custom Model NMAX Seat',
    description: 'This is the Leather Upholstery Custom Model NMAX Seat',
    price: '707',
    seller: 'Maria Santos',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    title: 'Charol Synthetic Leather for Car Seat',
    description: 'This is the Charol Synthetic Leather for Car Seat',
    price: '95',
    seller: 'Luis Cruz',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    title: 'Mitsushi Staple Gun Tacker Heavy Duty',
    description: 'This is the Mitsushi Staple Gun Tacker Heavy Duty',
    price: '165',
    seller: 'Maria Gonzales',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    title: 'Nylon Thread Ticket for Upholstery',
    description: 'This is the Nylon Thread Ticket for Upholstery',
    price: '129',
    seller: 'Jose Reyes',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    title: 'Anti-Slip Checkered Plate Rubber Flooring Matting',
    description:
      'This is the Anti-Slip Checkered Plate Rubber Flooring Matting',
    price: '158',
    seller: 'Rogie Aldueza',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
  },
  {
    id: '120',
    title: 'Uratex Foam Customizable for Upholstery',
    description: 'This is the Uratex Foam Customizable for Upholstery',
    price: '261',
    seller: 'Jonas Candelario',
    createdAt: subDays(subHours(now, 19), 4).getTime(),
  },
];
