import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewZodSchema } from './review.validation';
const router = express.Router();

router.post(
  '/',

  validateRequest(ReviewZodSchema.reviewCreateZodSchema),
  ReviewController.createReview
);
router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getSingleBookReviews);

export const ReviewRoutes = router;
