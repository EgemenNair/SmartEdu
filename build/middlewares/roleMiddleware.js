"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
exports.default = (roles) => {
    return (upload.none(),
        (req, res, next) => {
            var _a;
            const userRole = (_a = req.body) === null || _a === void 0 ? void 0 : _a.role;
            if (!userRole) {
                return res
                    .status(400)
                    .json({ message: "Role is missing from request body" });
            }
            if (roles.includes(userRole)) {
                next();
            }
            else {
                res.status(401).send("You don't have the neccesary privilages!");
            }
        });
};
