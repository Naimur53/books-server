import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/my-profile', auth(), UserController.getUserByTokenId);
router.patch(
  '/my-profile',
  auth(),
  validateRequest(UserValidation.userUpdateZodSchema),
  UserController.updateUserByTokenId
);

router.get('/:id', auth(), UserController.getUserById);
router.patch(
  '/:id',
  auth(),
  validateRequest(UserValidation.userUpdateZodSchema),
  UserController.updateUser
);
router.delete('/:id', auth(), UserController.deleteUser);
router.get('/', auth(), UserController.getAllUser);

export const UserRoutes = router;
