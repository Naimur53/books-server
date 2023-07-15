"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_contorller_1 = require("./wishlist.contorller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(wishlist_validation_1.wishlistZodSchema.wishlistCreateZodSchema), wishlist_contorller_1.WishlistController.createWishlist);
router.get('/', wishlist_contorller_1.WishlistController.getAllWishlist);
router.get('/:id', wishlist_contorller_1.WishlistController.getSingleUserWishlist);
router.delete('/:id', wishlist_contorller_1.WishlistController.deleteSingleWishlist);
exports.WishlistRoutes = router;
