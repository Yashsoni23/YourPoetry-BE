const express = require("express");
const router = express.Router();
const { Poetry, User } = require("./api/index")
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://yashsoni23:yashsoni@cluster0.7sphvca.mongodb.net/?retryWrites=true&w=majority")
.then((res)=>console.log(`Connected with MongoDB`))
.catch((error)=>console.error(error));


router.use("/user", User);
router.use("/poetry", Poetry);

module.exports = router