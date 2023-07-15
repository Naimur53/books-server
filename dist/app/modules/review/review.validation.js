"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const reviewCreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({ required_error: 'Review description is Required' }),
        user: zod_1.z
            .string({ required_error: 'Invalid cow id' })
            .refine(mongoose_1.default.isValidObjectId),
        book: zod_1.z
            .string({ required_error: 'Invalid buyer id' })
            .refine(mongoose_1.default.isValidObjectId),
    }),
});
exports.ReviewZodSchema = {
    reviewCreateZodSchema,
};
