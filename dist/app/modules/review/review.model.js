"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: true,
    },
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
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
