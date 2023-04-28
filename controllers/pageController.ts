import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const getIndexPage = (req: Request, res: Response) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

export const getAboutPage = (req: Request, res: Response) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

export const getContactPage = (req: Request, res: Response) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

export const getRegisterPage = (req: Request, res: Response) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

export const getLoginPage = (req: Request, res: Response) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

export const sendEmail = async (req: Request, res: Response) => {
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
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // gmaill user
        pass: testAccount.pass, // gmaill password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Egemen Nair" <egemen@gmaill.com>', // sender address
      to: "<egemen@gmaill.com>", // list of receivers
      subject: "Smart Edu Contact Form New Message", // Subject line
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
  } catch (error) {
    // req.flash("error", `Something happened ! ${error}`);
    req.flash("error", `Something happened !`);
    res.status(400).redirect("/contact");
  }
};
