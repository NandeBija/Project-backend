require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userrouter = require("./routes/userrouter");
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
app.use("/cart", cartrouter);

// API routes
app.get("/", (req, res, next) => {
  res.send({
    message: "Welcome to the Generic Blog API",
    user_routes: {
      user_register: {
        method: "POST",
        route: "/users",
        request_body: {
          name: "String",
          email: "String",
          contact: "String",
          password: "String",
        },
        result: {
          jwt: "String token",
        },
      },
      user_login: {
        method: "PATCH",
        route: "/users",
        request_body: {
          email: "String",
          password: "String",
        },
        result: {
          jwt: "String token",
        },
      },
      all_users: {
        method: "GET",
        route: "/users",
        result: {
          users: "Array",
        },
      },
      single_user: {
        method: "GET",
        route: "/users/:id",
        result: {
          user: "Object",
        },
      },
      update_user: {
        method: "PUT",
        request_body: {
          name: "String",
          email: "String",
          contact: "String",
          password: "String",
          avatar: "String",
          img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
        },
        route: "/users/:id",
        result: {
          user: "Object",
        },
      },
      delete_user: {
        method: "DELETE",
        route: "/users/:id",
        result: {
          message: "Object",
        },
      },
    },
    post_routes: {
      all_posts: {
        method: "GET",
        route: "/posts",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          posts: "Array",
        },
      },
      single_post: {
        method: "GET",
        route: "/posts/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          post: "Object",
        },
      },
      create_post: {
        method: "POST",
        route: "/posts/",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String",
          body: "String",
          img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
        },
        result: {
          post: "Object",
        },
      },
      update_post: {
        method: "PUT",
        route: "/posts/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String *optional*",
          body: "String *optional*",
          img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
        },
        result: {
          post: "Object",
        },
      },
      delete_post: {
        method: "DELETE",
        route: "/posts/:id",
        result: {
          message: "Object",
        },
      },
    },
  });
});

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
  console.info("Press CTRL + C to close the server");
});
