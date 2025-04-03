const express = require("express");
const router = express.Router();
const {getUsers, creatUser} = require("../controllers/userController")

router.get("/", getUsers);
router.post("/create", creatUser)
module.exports =  router;