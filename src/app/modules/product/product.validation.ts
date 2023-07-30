import { z } from 'zod';

// Define the enum for the ProductCategory
const ProductCategoryEnum: [string, ...string[]] = [
  'CPU',
  'Motherboard',
  'RAM',
  'Power Supply Unit',
  'Storage Device',
  'Monitor',
  'Others',
];

// Define the Zod schema for the IProduct interface
const productZodSchema = z.object({
  body: z.object({
    img: z.string().nonempty('Image is required'),
    productName: z.string().nonempty('Product Name is required'),
    category: z.enum(ProductCategoryEnum, {
      required_error: 'Invalid category',
    }),
    price: z.number().min(0, 'Price must be a positive number'),
    status: z.enum(['In Stock', 'Out of stock'], {
      required_error: 'Invalid status',
    }),
    description: z.string().nonempty('Description is required'),
    keyFeatures: z.string().nonempty('Key Features is required'),
    individualRating: z
      .number()
      .min(0)
      .max(5, 'Individual Rating must be between 0 and 5'),
    averageRating: z
      .number()
      .min(0)
      .max(5, 'Average Rating must be between 0 and 5'),
  }),
});

export const ProductZodValidation = {
  productZodSchema,
};
