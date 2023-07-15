"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const wishlistCreateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .string({ required_error: 'Invalid cow id' })
            .refine(mongoose_1.default.isValidObjectId),
        book: zod_1.z
            .string({ required_error: 'Invalid buyer id' })
            .refine(mongoose_1.default.isValidObjectId),
    }),
});
exports.wishlistZodSchema = {
    wishlistCreateZodSchema,
};
