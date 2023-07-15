"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reading_validation_1 = require("./reading.validation");
const reading_controller_1 = require("./reading.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(reading_validation_1.readingZodSchema.readingCreateZodSchema), reading_controller_1.ReadingController.createReading);
router.get('/', reading_controller_1.ReadingController.getAllReading);
router.get('/:id', reading_controller_1.ReadingController.getSingleUserReading);
router.delete('/:id', reading_controller_1.ReadingController.deleteSingleReading);
router.patch('/:id', (0, validateRequest_1.default)(reading_validation_1.readingZodSchema.readingUpdateZodSchema), reading_controller_1.ReadingController.updateReading);
exports.readingRoutes = router;
