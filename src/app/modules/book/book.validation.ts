import mongoose from 'mongoose';
import { z } from 'zod';
const genre: [string, ...string[]] = [
  'Action and Adventure',
  'Art',
  'Biography',
  'Children',
  'Comics and Graphic Novels',
  'Cookbooks',
  'Drama',
  'Fantasy',
  'History',
  'Horror',
  'Humor and Comedy',
  'Mystery',
  'Non-Fiction',
  'Poetry',
  'Religion and Spirituality',
  'Romance',
  'Science Fiction',
  'Self-Help',
  'Sports',
  'Thriller',
  'Travel',
];
const bookZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Name is required'),
    author: z.string({ required_error: 'Age must be a number' }),
    genre: z.enum([...genre], { required_error: 'Invalid genre' }),
    publishedDate: z.string({ required_error: 'published date is required ' }),
    creator: z
      .string({ required_error: 'Invalid user id' })
      .refine(mongoose.isValidObjectId),
  }),
});

// cow update zod schema
const bookUpdateZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Name is required').optional(),
    author: z.string({ required_error: 'Age must be a number' }).optional(),
    genre: z
      .enum([...genre], { required_error: 'Invalid location' })
      .optional(),
    publishedDate: z
      .string({ required_error: 'published date is required ' })
      .optional(),
    creator: z
      .string({ required_error: 'Invalid user id' })
      .refine(mongoose.isValidObjectId)
      .optional(),
  }),
});

export const bookZodValidation = {
  bookZodSchema,
  bookUpdateZodSchema,
};
