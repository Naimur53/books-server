"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const genre = [
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
const bookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Name is required'),
        author: zod_1.z.string({ required_error: 'Age must be a number' }),
        genre: zod_1.z.enum([...genre], { required_error: 'Invalid genre' }),
        publishedDate: zod_1.z.string({ required_error: 'published date is required ' }),
        creator: zod_1.z
            .string({ required_error: 'Invalid user id' })
            .refine(mongoose_1.default.isValidObjectId),
    }),
});
// cow update zod schema
const bookUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Name is required').optional(),
        author: zod_1.z.string({ required_error: 'Age must be a number' }).optional(),
        genre: zod_1.z
            .enum([...genre], { required_error: 'Invalid location' })
            .optional(),
        publishedDate: zod_1.z
            .string({ required_error: 'published date is required ' })
            .optional(),
        creator: zod_1.z
            .string({ required_error: 'Invalid user id' })
            .refine(mongoose_1.default.isValidObjectId)
            .optional(),
    }),
});
exports.bookZodValidation = {
    bookZodSchema,
    bookUpdateZodSchema,
};
