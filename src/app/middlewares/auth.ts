import { NextFunction, Request, Response } from 'express';
import authJwtValidation from '../../helpers/authJwtValidation';

const auth =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      const verifiedUser = authJwtValidation(token);
      req.user = verifiedUser; //
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
