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
const courseController = __importStar(require("../controllers/courseController"));
const roleMiddleware_1 = __importDefault(require("../middlewares/roleMiddleware"));
exports.router = express_1.default.Router();
exports.router
    .route("/")
    .post((0, roleMiddleware_1.default)(["lecturer", "admin"]), courseController.createCourse);
exports.router.route("/").get(courseController.getAllCourses);
exports.router.route("/:slug").get(courseController.getCourse);
exports.router.route("/enroll").post(courseController.enrollCourse);
exports.router.route("/drop").post(courseController.dropCourse);
exports.router.route("/:slug").delete(courseController.deleteCourse);
exports.router.route("/:slug").put(courseController.editCourse);
