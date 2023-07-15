"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z
            .enum(['seller', 'buyer'], { required_error: 'Role is required' })
            .optional(),
        phoneNumber: zod_1.z
            .string({ required_error: 'Phone number is required' })
            .optional(),
        password: zod_1.z.string({ required_error: 'Password is required' }).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({ required_error: 'First name is required' })
                .optional(),
            lastName: zod_1.z
                .string({ required_error: 'Last name is required' })
                .optional(),
        })
            .optional(),
        address: zod_1.z.string({ required_error: 'Address is required' }).optional(),
        budget: zod_1.z.number().positive().default(0).optional(),
        income: zod_1.z.number().positive().default(0).optional(),
    }),
});
exports.UserValidation = {
    userUpdateZodSchema,
};
