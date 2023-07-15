import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { readingZodSchema } from './reading.validation';
import { ReadingController } from './reading.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(readingZodSchema.readingCreateZodSchema),
  ReadingController.createReading
);
router.get('/', ReadingController.getAllReading);
router.get('/:id', ReadingController.getSingleUserReading);
router.delete('/:id', ReadingController.deleteSingleReading);
router.patch(
  '/:id',
  validateRequest(readingZodSchema.readingUpdateZodSchema),
  ReadingController.updateReading
);

export const readingRoutes = router;
