require("./config/config");
require("./config/database");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const todosRouter = require("./routes/todos");

app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));