var mongoose = require("mongoose");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var nodemailer = require("nodemailer");
const { shallowEqual } = require("react-redux");

var transporter = nodemailer.createTransport({
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: "ugandharkurra1996@gmail.com",
    pass: "Kurra@223",
  },
});

const mailOptions = {
  from: "ugandharkurra1996@gmail.com", // sender address
  to: "", // list of receivers
  subject: "Subject of Vinod", // Subject line
  html: "", // plain text body
};

var Schema = mongoose.Schema;

// let mangodB = "mongodb://localhost:27017/my_db";
let storedb = "mongodb://localhost:27017/register";

mongoose
  .connect(storedb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("connected to register db");
  })
  .catch((err) => {
    console.log("err", err);
  });

var registerSchema = new Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  registrationStatus: Boolean,
  confirmPassword: String,
});

var loginSchema = new Schema({
  emailId: String,
  password: String,
});

var hospital = mongoose.model("patients", registerSchema);
var loginPatient = mongoose.model("loginPatient", loginSchema);

exports.registerPatients = async function (req, res) {
  console.log("Data req", req);
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.emailId ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(206).send({
      message: "Please provide valid input ",
      status: "failure",
    });
  } else if (req.body.password !== req.body.confirmPassword) {
    res
      .status(206)
      .send({ message: "password miss matching", status: "failure" });
    //res.send({ message: 'password miss matching ', status: "failure" });
  } else {
    var myData = new hospital(req.body);
    myData.registrationStatus = false;
    myData
      .save()
      .then((item) => {
        sendEmail(req.body.emailId);
        res.send("Student registered successfully");
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
      });
  }
};

exports.loginPatients = async (req, res) => {
  hospital.find({});
};

const sendEmail = async function (emailId) {
  mailOptions.to = emailId;
  console.log("first", mailOptions);
  // const salt =  await bcrypt.genSalt(10);
  // const hashedEmailId = await  bcrypt.hash(emailId, salt);
  // console.log("second", hashedEmailId)
  mailOptions.html =
    "<p> Hi, Click on this link to verify your email Id <a href=http://localhost:3000/verifyEmail/" +
    emailId +
    ">click this to verify</a> </p>";
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

exports.getPatients = async function (req, res) {
  console.log("Data req", req);
  hospital
    .find()
    .then((data) => {
      res.status(200).send({
        message: "get Patients List Successfully",
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send("unable to get the details");
    });
};

exports.editPatients = async function (req, res) {
  console.log("Data req", req);
  if (!req.body.firstName || !req.body.lastName || !req.body.emailId) {
    res.status(206).send({
      message: "Please provide valid input ",
      status: "failure",
    });
  } else {
    hospital.find({});
    myData.registrationStatus = false;
    myData
      .save()
      .then((item) => {
        sendEmail(req.body.emailId);
        res.send("Student registered successfully");
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
      });
  }
};
