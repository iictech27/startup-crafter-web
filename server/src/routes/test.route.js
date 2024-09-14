const express = require("express");
const router = express.Router();

//local imports
const { getAllUser } = require("../controllers/test.controller");

router.route("/get-all-user").get(getAllUser);

module.exports = router;
