import mongoose from 'mongoose';
import { z } from 'zod';

const statuses: [string, ...string[]] = [
  'currently reading',
  'finished',
  'plan to read soon',
];
const readingCreateZodSchema = z.object({
  body: z.object({
    user: z
      .string({ required_error: 'Invalid user id' })
      .refine(mongoose.isValidObjectId),
    book: z
      .string({ required_error: 'Invalid user id' })
      .refine(mongoose.isValidObjectId),
    status: z.enum([...statuses], { required_error: 'Invalid location' }),
  }),
});
const readingUpdateZodSchema = z.object({
  body: z.object({
    status: z.enum([...statuses], { required_error: 'Invalid location' }),
  }),
});
export const readingZodSchema = {
  readingCreateZodSchema,
  readingUpdateZodSchema,
};
