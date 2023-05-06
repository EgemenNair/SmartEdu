"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const redirectMiddleware_1 = __importDefault(require("../middlewares/redirectMiddleware"));
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
exports.router = express_1.default.Router();
exports.router.route("/signup").post([
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Please enter your name  "),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter valid Email  ")
        .custom((userEmail) => {
        return User_1.User.findOne({ email: userEmail }).then((user) => {
            if (user) {
                return Promise.reject("Email is already taken !");
            }
        });
    }),
    (0, express_validator_1.body)("password").not().isEmpty().withMessage("Please enter a password  "),
], redirectMiddleware_1.default, authController.createUser);
exports.router.route("/login").post(redirectMiddleware_1.default, authController.logUser);
exports.router.route("/logout").get(authMiddleware_1.default, authController.logoutUser);
exports.router.route("/dashboard").get(authMiddleware_1.default, authController.getDashboardPage);
exports.router.route("/:id").delete(authController.deleteUser);
