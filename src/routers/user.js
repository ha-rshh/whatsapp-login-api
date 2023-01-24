const express = require("express");
const router = new express.Router();
const cors = require("cors");

const Users = require("../models/users");

let imageArr = [
  "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg?fit=fill&w=480&h=270",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75",
  "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
  "https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg",
  "https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds",
  "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-ifki89eupmb5tdt8cosgpt9ui2-20200721164448.Medi.jpeg",
  "https://feeds.abplive.com/onecms/images/uploaded-images/2022/04/30/8c915eaf7ac9f8ed9b96830e92abd1a8_original.jpg?impolicy=abp_cdn&imwidth=650",
  "https://static.theceomagazine.net/wp-content/uploads/2020/09/25144129/mukesh-ambani.jpg",
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
