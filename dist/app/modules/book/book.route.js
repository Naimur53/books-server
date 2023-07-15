"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_validation_1 = require("./book.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/', book_controller_1.BookController.getAllBook);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.post('/', (0, validateRequest_1.default)(book_validation_1.bookZodValidation.bookZodSchema), book_controller_1.BookController.createBook);
router.patch('/:id', (0, validateRequest_1.default)(book_validation_1.bookZodValidation.bookUpdateZodSchema), book_controller_1.BookController.updateBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
