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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCourse = exports.deleteCourse = exports.dropCourse = exports.enrollCourse = exports.getCourse = exports.getAllCourses = exports.createCourse = void 0;
const Course_1 = require("../models/Course");
const Category_1 = require("../models/Category");
const User_1 = require("../models/User");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID,
        });
        req.flash("success", `${course.name} course created successfully !`);
        res.status(201).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Something went wrong... Course was not created !`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.createCourse = createCourse;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.User.findById(req.session.userID);
        const categorySlug = req.query.categories;
        const query = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toLocaleString();
        const category = yield Category_1.Category.findOne({ slug: categorySlug });
        let filter = {};
        if (categorySlug) {
            filter = { category: category === null || category === void 0 ? void 0 : category._id };
        }
        if (query) {
            filter = { name: query };
        }
        if (!query && !categorySlug) {
            filter.name = "";
            filter.category = null;
        }
        const courses = yield Course_1.Course.find({
            $or: [
                { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
                { category: filter.category },
            ],
        })
            .populate("user")
            .sort("name");
        const categories = yield Category_1.Category.find();
        res.status(200).render("courses", {
            courses,
            user,
            categories,
            page_name: "courses",
        });
    }
    catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
});
exports.getAllCourses = getAllCourses;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.session.userID);
        const course = yield Course_1.Course.findOne({ slug: req.params.slug }).populate("user");
        const categories = yield Category_1.Category.find();
        res.status(200).render("course", {
            course,
            categories,
            user,
            page_name: "courses",
        });
    }
    catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
});
exports.getCourse = getCourse;
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(req.session.userID);
    const alreadyEnrolled = user === null || user === void 0 ? void 0 : user.courses.includes(req.body.course_id);
    if (!alreadyEnrolled && (user === null || user === void 0 ? void 0 : user.role) === "student") {
        try {
            yield (user === null || user === void 0 ? void 0 : user.courses.push(req.body.course_id));
            yield (user === null || user === void 0 ? void 0 : user.save());
            res.status(200).redirect("/users/dashboard");
        }
        catch (error) {
            res.status(400).json({
                status: "bad request",
                error,
            });
        }
    }
    else {
        res.redirect("/users/dashboard");
    }
});
exports.enrollCourse = enrollCourse;
const dropCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(req.session.userID);
    const alreadyEnrolled = user === null || user === void 0 ? void 0 : user.courses.includes(req.body.course_id);
    if (alreadyEnrolled && (user === null || user === void 0 ? void 0 : user.role) === "student") {
        try {
            yield User_1.User.updateOne({ _id: user._id }, { $pull: { courses: req.body.course_id } });
            yield user.save();
            res.status(200).redirect("/users/dashboard");
        }
        catch (error) {
            res.status(400).json({
                status: "bad request",
                error,
            });
        }
    }
    else {
        res.redirect("/users/dashboard");
    }
});
exports.dropCourse = dropCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.Course.findOneAndRemove({ slug: req.params.slug });
        req.flash("error", `${course === null || course === void 0 ? void 0 : course.name} has been removed successfully`);
        res.status(200).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Course was not removed successfully: ${error}`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.deleteCourse = deleteCourse;
const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.Course.findOne({ slug: req.params.slug });
        if (course) {
            course.name = req.body.name;
            course.description = req.body.description;
            course.category = req.body.category;
            course.save();
        }
        req.flash("success", `${course === null || course === void 0 ? void 0 : course.name} was edited successfully !`);
        res.status(200).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Course was not edited successfully: ${error}`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.editCourse = editCourse;
