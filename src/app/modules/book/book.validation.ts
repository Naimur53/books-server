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
    author: z.number({ required_error: 'Age must be a number' }),
    price: z.number().positive('Price must be a positive number'),
    genre: z.enum([...genre], { required_error: 'Invalid location' }),
    publishedData: z.date({ required_error: 'published date is required ' }),
    creator: z
      .string({ required_error: 'Invalid user id' })
      .refine(mongoose.isValidObjectId),
  }),
});

// cow update zod schema
const bookUpdateZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Name is required').optional(),
    author: z.number({ required_error: 'Age must be a number' }).optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    genre: z
      .enum([...genre], { required_error: 'Invalid location' })
      .optional(),
    publishedData: z
      .date({ required_error: 'published date is required ' })
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
