const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
// c
require("./db/conn");
const userRouter = require("./routers/user");

// const Users = require("./models/users");

const app = express();

app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Connection is setup at ${port}`);
});
