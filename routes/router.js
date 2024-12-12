const { saveData, fetchData } = require("../controllers/gameControllers");
const { webHook, posttelCommunicate, gettelCommunicate } = require("../controllers/TelegramControllers");


app.get("/setwebhook" , webHook );

app.post('/', posttelCommunicate );

app.get("/" , gettelCommunicate)

app.post("/fetchdata", saveData);

app.post("/savedata", fetchData );
