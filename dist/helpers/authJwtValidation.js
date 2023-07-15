"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const jwtHelpers_1 = require("./jwtHelpers");
const config_1 = __importDefault(require("../config"));
function authJwtValidation(token) {
    // if no token found
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    // // role guard
    // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
    //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    // }
    return verifiedUser;
}
exports.default = authJwtValidation;
