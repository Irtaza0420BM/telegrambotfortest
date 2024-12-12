const express = require("express")
// const { saveData, fetchData } = require("../controllers/gameControllers");
const { posttelCommunicate, gettelCommunicate } = require("../controllers/TelegramControllers");
const router = express.Router()

// router.get("/setwebhook" , webHook );

router.post("/", posttelCommunicate );

router.get("/" , gettelCommunicate)

// router.post("/fetchdata", saveData);

// router.post("/savedata", fetchData );

module.exports = router