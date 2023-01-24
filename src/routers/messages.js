const express = require("express");
const router = new express.Router();
const cors = require("cors");

const Message = require("../models/messages");

router.post("/send", async (req, res) => {
  try {
    console.log(req.body);
    let data = { ...req.body };
    var users = await Message.find({
      to: req.body.to,
      from: req.body.from,
    });
    //users = JSON.parse(users);
    if (!users.length) {
      var user = new Message({
        ...data,
        email: req.body.to + req.body.from,
        message: JSON.stringify([req.body.message]),
      });
      var createUser = await user.save();
      console.log(createUser);
    } else {
      console.log(users[0].message, "Message");
      const messages = [...JSON.parse(users[0].message), data.message];
      await Message.updateOne(
        { to: data.to, from: data.from },
        {
          $set: {
            message: JSON.stringify(messages),
          },
        }
      );
    }
    if(req.body.from !==req.body.to) {
      var users = await Message.find({
        to: req.body.from,
        from: req.body.to,
      });
      if (!users.length) {
        var user = new Message({
          ...data,
          email: req.body.from + req.body.to,
          to: req.body.from,
          from: req.body.to,
          message: JSON.stringify([req.body.message]),
        });
        var createUser = await user.save();
        console.log(createUser);
      } else {
        console.log(users);
        const messages = [...JSON.parse(users[0].message), data.message];
        await Message.updateOne(
          { to: data.from, from: data.to },
          {
            $set: {
              message: JSON.stringify(messages),
            },
          }
        );
      }
    }
    res.status(201).send({
      message: "Message send Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/messages", async (req, res) => {
  try {
    var users = await Message.find({
      to: req.body.to,
      from: req.body.from,
    });
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
