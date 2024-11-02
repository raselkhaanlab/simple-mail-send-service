require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const contactRoutes = require("./src/routes/contact");

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("application running"));
app.use(contactRoutes);

app.listen(3000, () => console.log("application running on port: " + 3000));
