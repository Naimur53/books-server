"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const mongoose_1 = require("mongoose");
const readingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
    },
    status: {
        type: String,
        enum: ['currently reading', 'finished', 'plan to read soon'],
    },
});
exports.Reading = (0, mongoose_1.model)('reading', readingSchema);
