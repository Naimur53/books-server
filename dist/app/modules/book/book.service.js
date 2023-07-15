"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_model_1 = require("./book.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_constant_1 = require("./book.constant");
const getAllBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // all Book
    const { searchTerm, publishedDate } = filters, filtersData = __rest(filters, ["searchTerm", "publishedDate"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //   search text
    if (searchTerm) {
        const wihtoutPublished = book_constant_1.bookSearchableFields.slice(0, book_constant_1.bookSearchableFields.length - 1);
        andConditions.push({
            $or: wihtoutPublished.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // make and query
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // Date query
    if (publishedDate) {
        whereConditions['publishedDate'] = publishedDate;
    }
    const result = yield book_model_1.Book.find(whereConditions)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate('creator');
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(payload);
    return newBook;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.creator) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'sorry you cannot change creator');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate('creator');
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found!');
    }
    return result;
});
exports.BookService = {
    getAllBook,
    createBook,
    updateBook,
    getSingleBook,
    deleteBook,
};
