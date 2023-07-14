import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { wishlistZodSchema } from './wishlist.validation';
import { WishlistController } from './wishlist.contorller';
const router = express.Router();

router.post(
  '/',
  validateRequest(wishlistZodSchema.wishlistCreateZodSchema),
  WishlistController.createWishlist
);
router.get('/', WishlistController.getAllWishlist);
router.get('/:id', WishlistController.getSingleUserWishlist);

export const WishlistRoutes = router;
