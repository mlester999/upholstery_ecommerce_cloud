import { subDays, subHours } from 'date-fns';

const now = new Date();

export const reviewsData = [
  {
    id: '5e887ac47eed253091be10cb',
    review_id: 'REV-0001',
    customer: 'Jimmy Santos',
    product: 'Sofa Footings High Quality Plastic Upholstery',
    comments:
      'The product is very good but the shipping is too long, it takes 2 weeks.',
    ratings: 3,
    seller: 'Juan Dela Cruz',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    review_id: 'REV-0002',
    customer: 'Aldin Richarge',
    product: 'Leather Upholstery Custom Model NMAX Seat',
    comments: 'The product is very good and very wow.',
    ratings: 5,
    seller: 'Maria Santos',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    review_id: 'REV-0003',
    customer: 'Shanti Dope',
    product: 'Charol Synthetic Leather for Car Seat',
    comments:
      'I love the product but it is already expired so it is dangerous.',
    ratings: 2,
    seller: 'Luis Cruz',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    review_id: 'REV-0004',
    customer: 'Girald Andirson',
    product: 'Mitsushi Staple Gun Tacker Heavy Duty',
    comments:
      'The product is very interesting because the delivery is the shipping of the seller.',
    ratings: 4,
    seller: 'Maria Gonzales',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    review_id: 'REV-0005',
    customer: 'Andria Brillantis',
    product: 'Nylon Thread Ticket for Upholstery',
    comments:
      'Where is the freebies? Im expecting to received that also but you did not include it. How dare you seller!',
    ratings: 1,
    seller: 'Jose Reyes',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    review_id: 'REV-0006',
    customer: 'Ricci Riviro',
    product: 'Anti-Slip Checkered Plate Rubber Flooring Matting',
    comments:
      'The seller is unresponsive. He did not answering my chat and he is so very arrogant.',
    ratings: 1,
    seller: 'Rogie Aldueza',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
  },
  {
    id: '120',
    review_id: 'REV-0007',
    customer: 'Ed Caluag',
    product: 'Uratex Foam Customizable for Upholstery',
    comments:
      'Binili ko ito para sa aking paranurmal activity mamaya pero hindi dumating nung araw na gagamitin ko so rate ko is 2 stars onleh.',
    ratings: 2,
    seller: 'Jonas Candelario',
    createdAt: subDays(subHours(now, 19), 4).getTime(),
  },
];
