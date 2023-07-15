"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.genreEnumElement = void 0;
const mongoose_1 = require("mongoose");
exports.genreEnumElement = [
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
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genre: {
        type: String,
        enum: exports.genreEnumElement,
        required: true,
    },
    creator: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
