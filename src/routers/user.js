const express = require("express");
const router = new express.Router();
const cors = require("cors");

const Users = require("../models/users");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const user = new Users(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = {};
    const userData = await Users.find();
    for(let i=0; i<userData.length;i++) {
      const ele = userData[i]
      if(ele.mobile == req.body.mobile) {
        if(ele.pass == req.body.pass) {
          user = ele;
          res.status(200).send({
            message: "User login success",
            user: ele,
          })
        }
      }
    }
    res.status(400).send("Mobile or password incorrect.");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;