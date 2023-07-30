import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { WishlistRoutes } from '../modules/wislist/wishlist.route';
import { BookRoutes } from '../modules/book/book.route';
import { readingRoutes } from '../modules/reading/reading.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/reading',
    route: readingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
