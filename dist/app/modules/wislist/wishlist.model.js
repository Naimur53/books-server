"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
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
exports.Wishlist = (0, mongoose_1.model)('wishlist', wishlistSchema);
