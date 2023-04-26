require("dotenv-safe").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_TOKEN;
const app = express();
const fakeData = [
  {
    user_Id: 1,
    user_name: "Jerson",
    user_e_mail: "teste@teste.com",
    user_password: "123456",
  },
  {
    user_Id: 2,
    user_name: "Davi",
    user_e_mail: "teste2@teste2.com",
    user_password: "123456",
  },
];

app.post("/register", (req, res) => {
  const { user_name, user_e_mail, user_password } = req.body;

  if (!user_name || !user_e_mail || !user_password) {
    return res.status(400).json({
      msg: "Bad Request: username, email, password are required!",
    });
  }

  try {
    if (fakeData.find((item) => item.user_e_mail === user_e_mail)) {
      return res.status(400).json({
        msg: "Bad Request: email already exists!",
      });
    } else if (fakeData.find((item) => item.user_name === user_name)) {
      return res.status(400).json({
        msg: "Bad Request: username already exists!",
      });
    } else {
      fakeData.push({
        user_name: user_name,
        user_e_mail: user_e_mail,
        user_password: user_password,
      });

      res.status(200).json({
        msg: "User created successfully!",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", (req, res) => {
  const { user_e_mail, user_password } = req.body;

  if (!user_e_mail || !user_password) {
    return res.status(400).json({
      msg: "Bad Request: user_e_mail, user_password are required!",
    });
  }

  const user = fakeData.find((item) => item.user_e_mail === user_e_mail);

  if (!user || user.user_password !== user_password) {
    return res.status(401).json({
      msg: "Unauthorized: email or password is incorrect!",
    });
  } else {
    const token = jwt.sign({ id: user.user_Id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Authentication successful!",
      userId: user.user_Id,
      token: token,
    });
  }
});

module.exports = app;
