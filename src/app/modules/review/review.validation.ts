import mongoose from 'mongoose';
import { z } from 'zod';

const reviewCreateZodSchema = z.object({
  body: z.object({
    review: z.string({ required_error: 'Review description is Required' }),
    user: z
      .string({ required_error: 'Invalid cow id' })
      .refine(mongoose.isValidObjectId),
    book: z
      .string({ required_error: 'Invalid buyer id' })
      .refine(mongoose.isValidObjectId),
  }),
});
export const ReviewZodSchema = {
  reviewCreateZodSchema,
};
