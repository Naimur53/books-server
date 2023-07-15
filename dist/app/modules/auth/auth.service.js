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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // checking is user buyer
    try {
        const newUser = yield user_model_1.User.create(user);
        // eslint-disable-next-line no-unused-vars
        const { password, createAt, updatedAt, _id, email, name } = newUser.toObject();
        //create access token & refresh token
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            user: { email, _id, name },
            accessToken,
            refreshToken,
        };
    }
    catch (err) {
        console.log(err);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Already exits ');
    }
    // eslint-disable-next-line no-unused-vars
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: givenEmail, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(givenEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { email, _id, name } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        user: { email, _id, name },
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { _id } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.findById(_id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new Access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        _id: isUserExist._id,
        email: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createUser,
    loginUser,
    refreshToken,
};
