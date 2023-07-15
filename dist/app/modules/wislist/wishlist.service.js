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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const wishlist_model_1 = require("./wishlist.model");
const createWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.create(payload);
    return result;
});
const getAllWishlist = () => __awaiter(void 0, void 0, void 0, function* () {
    const allWishlist = yield wishlist_model_1.Wishlist.find({}).populate([
        { path: 'user' },
        { path: 'book' },
    ]);
    return allWishlist;
});
const getSingleUserWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllWishlist = yield wishlist_model_1.Wishlist.find({ user: userId }).populate([
        { path: 'book', populate: { path: 'creator' } },
        { path: 'user' },
    ]);
    return getAllWishlist;
});
const deleteSingleWishlist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Wish not found!');
    }
    return result;
});
exports.WishlistService = {
    createWishlist,
    getAllWishlist,
    getSingleUserWishlist,
    deleteSingleWishlist,
};
