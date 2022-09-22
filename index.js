//dependencies
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const usersRoutes = require("./routes/usersRoutes/users.routes");

//app config
const router = express();
const port = process.env.PORT || 8000;

//middleware
router.use(cors());
router.use(express.json());

//handle application errors
router.use(errorHandler);

// dynamic api routes
router.use("/api/v1", usersRoutes);

//create server
router.listen(port, () => console.log(`Listening on Port: ${port}`));

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  // close server & exit process
  router.close(() => process.exit(1));
});
router.get("/", (req, res) => {
  res.send("Welcome to my random user by Burhan Uddin. We are listening to ", port);
});
