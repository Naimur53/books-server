"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const statuses = [
    'currently reading',
    'finished',
    'plan to read soon',
];
const readingCreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .string({ required_error: 'Invalid user id' })
            .refine(mongoose_1.default.isValidObjectId),
        book: zod_1.z
            .string({ required_error: 'Invalid user id' })
            .refine(mongoose_1.default.isValidObjectId),
        status: zod_1.z.enum([...statuses], { required_error: 'Invalid location' }),
    }),
});
const readingUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...statuses], { required_error: 'Invalid location' }),
    }),
});
exports.readingZodSchema = {
    readingCreateZodSchema,
    readingUpdateZodSchema,
};
