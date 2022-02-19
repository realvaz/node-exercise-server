const moongose = require("mongoose");
const URL = process.env.MONGO_URL;

moongose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false, //  // No hace falta en versiones recientes de NodeJS
    // useCreateIndex: true
});

const db = moongose.connection;

db.on("error", err => console.log("Connection to database failed", err));
db.once("open", () => console.log("Connected to database successfuly"));