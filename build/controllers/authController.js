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
exports.getDashboardPage = exports.logoutUser = exports.logUser = exports.deleteUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const Category_1 = require("../models/Category");
const Course_1 = require("../models/Course");
const express_validator_1 = require("express-validator");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.create(req.body);
        res.status(201).redirect("/login");
    }
    catch (error) {
        const errors = (0, express_validator_1.validationResult)(req);
        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`);
        }
        res.status(400).redirect("/register");
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.findByIdAndRemove(req.params.id);
        yield Course_1.Course.deleteMany({ user: req.params.id });
        req.flash("success", "User deleted successfully");
        res.status(200).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Couldn't delete user: ${error}`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.deleteUser = deleteUser;
const logUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            req.flash("error", "Invalid credentials!");
            return res.status(401).redirect("/login");
        }
        else {
            const same = yield bcrypt_1.default.compare(password, user.password);
            if (!same) {
                req.flash("error", "Invalid credentials!");
                return res.status(401).redirect("/login");
            }
        }
        // USER SESSION
        req.session.userID = user === null || user === void 0 ? void 0 : user.id;
        res.status(200).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", "Invalid credentials!");
        res.status(400).redirect("/login");
    }
});
exports.logUser = logUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.redirect("/");
    });
});
exports.logoutUser = logoutUser;
const getDashboardPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ _id: req.session.userID }).populate("courses");
    const categories = yield Category_1.Category.find();
    const courses = yield Course_1.Course.find({ user: req.session.userID });
    const users = yield User_1.User.find();
    res.status(200).render("dashboard", {
        page_name: "dashboard",
        user,
        categories,
        courses,
        users,
    });
});
exports.getDashboardPage = getDashboardPage;
