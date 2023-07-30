import express from 'express';
import { bookZodValidation } from './book.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
const router = express.Router();

router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getSingleBook);

router.post(
  '/',
  validateRequest(bookZodValidation.bookZodSchema),
  BookController.createBook
);

router.patch(
  '/:id',
  validateRequest(bookZodValidation.bookUpdateZodSchema),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
