require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userrouter = require("./routes/userrouter")
const Productrouter = require("./routes/Productrouter");
const cartrouter = require("./routes/cartrouter");

// Setting up MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

const app = express();
app.set("port", process.env.PORT || 2080);
app.use(express.json());
app.use(cors());

app.use("/users", userrouter); //Telling the app to use the user.. url is localhost:3090/users
app.use("/products", Productrouter);
app.use("/cart", cartrouter)


app.listen(app.get("port"), (server) => {
    console.info(`Server listen on port ${app.get("port")}`);
    console.info("Press CTRL + C to close the server");
  });