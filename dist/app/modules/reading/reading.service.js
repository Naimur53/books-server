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
exports.ReadingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const reading_model_1 = require("./reading.model");
const createReading = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reading_model_1.Reading.create(payload);
    return result;
});
const getAllReading = () => __awaiter(void 0, void 0, void 0, function* () {
    const allReading = yield reading_model_1.Reading.find({}).populate([
        { path: 'user' },
        { path: 'book', populate: { path: 'creator' } },
    ]);
    return allReading;
});
const getSingleUserReading = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllReading = yield reading_model_1.Reading.find({ user: userId }).populate([
        { path: 'book', populate: { path: 'creator' } },
        { path: 'user' },
    ]);
    return getAllReading;
});
const deleteSingleReading = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reading_model_1.Reading.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Wish not found!');
    }
    return result;
});
const updateReading = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reading_model_1.Reading.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.ReadingService = {
    createReading,
    getAllReading,
    getSingleUserReading,
    deleteSingleReading,
    updateReading,
};
