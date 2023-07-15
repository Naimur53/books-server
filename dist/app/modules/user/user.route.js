"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/my-profile', (0, auth_1.default)(), user_controller_1.UserController.getUserByTokenId);
router.patch('/my-profile', (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.UserValidation.userUpdateZodSchema), user_controller_1.UserController.updateUserByTokenId);
router.get('/:id', (0, auth_1.default)(), user_controller_1.UserController.getUserById);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.UserValidation.userUpdateZodSchema), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(), user_controller_1.UserController.deleteUser);
router.get('/', (0, auth_1.default)(), user_controller_1.UserController.getAllUser);
exports.UserRoutes = router;
