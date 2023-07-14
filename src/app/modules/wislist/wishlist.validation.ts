import mongoose from 'mongoose';
import { z } from 'zod';

const wishlistCreateZodSchema = z.object({
  body: z.object({
    user: z
      .string({ required_error: 'Invalid cow id' })
      .refine(mongoose.isValidObjectId),
    book: z
      .string({ required_error: 'Invalid buyer id' })
      .refine(mongoose.isValidObjectId),
  }),
});
export const wishlistZodSchema = {
  wishlistCreateZodSchema,
};
