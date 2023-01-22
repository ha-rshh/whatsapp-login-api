const express = require("express");
const router = new express.Router();
const cors = require("cors");

const Users = require("../models/users");

let imageArr = [
  "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg?fit=fill&w=480&h=270",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75",
  "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
  "https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif",
];
router.post("/", async (req, res) => {
  try {
    let randomImage = imageArr[Math.floor(Math.random() * imageArr.length)];
    console.log(req.body);
    const user = new Users({ ...req.body, avatar: randomImage });
    const createUser = await user.save();
    console.log(createUser);
    const users = await Users.find({});
    console.log(users);
    res.status(201).send({
      user: createUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const userData = await Users.find();
    res.status(200).send({
      message: "Data sent",
      usersList: userData,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = {};
    const userData = await Users.find();
    for (let i = 0; i < userData.length; i++) {
      const ele = userData[i];
      if (ele.mobile == req.body.mobile) {
        if (ele.pass == req.body.pass) {
          user = ele;
          res.status(200).send({
            message: "User login success",
            user: ele,
          });
        }
      }
    }
    if (!user) {
      res.status(400).send("Mobile or password incorrect.");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
