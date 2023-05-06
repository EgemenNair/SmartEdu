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
exports.sendEmail = exports.getLoginPage = exports.getRegisterPage = exports.getContactPage = exports.getAboutPage = exports.getIndexPage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Course_1 = require("../models/Course");
const User_1 = require("../models/User");
const getIndexPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalCourses = yield Course_1.Course.find().countDocuments();
    const totalStudents = yield User_1.User.find().countDocuments({ role: "student" });
    const totalLecturers = yield User_1.User.find().countDocuments({ role: "lecturer" });
    res.status(200).render("index", {
        page_name: "index",
        totalCourses,
        totalLecturers,
        totalStudents,
    });
});
exports.getIndexPage = getIndexPage;
const getAboutPage = (req, res) => {
    res.status(200).render("about", {
        page_name: "about",
    });
};
exports.getAboutPage = getAboutPage;
const getContactPage = (req, res) => {
    res.status(200).render("contact", {
        page_name: "contact",
    });
};
exports.getContactPage = getContactPage;
const getRegisterPage = (req, res) => {
    res.status(200).render("register", {
        page_name: "register",
    });
};
exports.getRegisterPage = getRegisterPage;
const getLoginPage = (req, res) => {
    res.status(200).render("login", {
        page_name: "login",
    });
};
exports.getLoginPage = getLoginPage;
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const outputMessage = `
  <h1>Message</h1>
  <p>${req.body.message}</p>
  </hr>
  <h1>Mail Details</h1>
    <ul>
      <li>First Name: ${req.body.first_name} </li>
      <li>Last Name: ${req.body.last_name} </li>
      <li>Email: ${req.body.email} </li>
      <li>Phone: ${req.body.phone} </li>
    </ul>
  `;
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = {
            user: "pythonmail35@gmail.com",
            pass: "jmcpszsyfbxanxak",
        };
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass, // gmaill password
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '"Egemen Nair" <egemen@gmaill.com>',
            to: "<egemen@gmaill.com>",
            subject: "Smart Edu Contact Form New Message",
            // text: "Hello world?", // plain text body
            html: outputMessage, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        req.flash("success", "We recceived your message successfully !");
        res.status(200).redirect("/contact");
    }
    catch (error) {
        // req.flash("error", `Something happened ! ${error}`);
        req.flash("error", `Something happened !`);
        res.status(400).redirect("/contact");
    }
});
exports.sendEmail = sendEmail;
