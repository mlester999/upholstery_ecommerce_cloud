import { subDays, subHours } from 'date-fns';

const now = new Date();

export const returnsAndRefundsData = [
  {
    id: '5e887ac47eed253091be10cb',
    customer: 'Julia Barrito',
    product: 'Sofa Footings High Quality Plastic Upholstery',
    comments: 'There is a damage to the products when it was delivered.',
    seller: 'Juan Dela Cruz',
    status: 'pending',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    customer: 'Joshua Disgracia',
    product: 'Leather Upholstery Custom Model NMAX Seat',
    comments:
      'The item is already expired so I need to return it and give me back my money.',
    seller: 'Maria Santos',
    status: 'refunded',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    customer: 'Kim Chi',
    product: 'Charol Synthetic Leather for Car Seat',
    comments:
      'The product has a slight damage and it should be replaced right now.',
    seller: 'Luis Cruz',
    status: 'rejected',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    customer: 'Ivana Alawe',
    product: 'Mitsushi Staple Gun Tacker Heavy Duty',
    comments:
      'Yung binili kong liptint ay parang expired na kaya dapat ibalik nyo ang pera na ginastos ko huhuhu.',
    seller: 'Maria Gonzales',
    status: 'replaced',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    customer: 'Ariana Grandi',
    product: 'Nylon Thread Ticket for Upholstery',
    comments: 'The product is not that good and it does not satisfy me okay.',
    seller: 'Carlos Garcia',
    status: 'replaced',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    customer: 'Taylor Sheesh',
    product: 'Anti-Slip Checkered Plate Rubber Flooring Matting',
    comments:
      'Give me back my money because the product is different from what is in the picture.',
    seller: 'Rogie Aldueza',
    status: 'refunded',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
  },
  {
    id: '120',
    customer: 'Bustin Jieber',
    product: 'Uratex Foam Customizable for Upholstery',
    comments:
      'I will use this in one of my music video but it is fake and it is dangerous.',
    seller: 'Jonas Candelario',
    status: 'pending',
    createdAt: subDays(subHours(now, 19), 4).getTime(),
  },
];
