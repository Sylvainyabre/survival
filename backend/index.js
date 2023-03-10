const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const initDBConnection = require("./configs/database.js");
const methodOverride = require('method-override');
const initializePassport = require("./configs/passport");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

//app.use('/api', createProxyMiddleware({ target: "http://localhost:8000/", changeOrigin: true,secure:false }));
app.use(methodOverride('_method'))
app.use(passport.initialize());
//Passport Initialization
initializePassport(passport)
app.use(cors({origin:"*"}));
app.options(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

//Loading the config file
dotenv.config({ path: "./configs/config.env" });





//Database connection
initDBConnection();

//Logging requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


//Routes
app.use("/api", require("./routes/index"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/communication", require("./routes/communication"));

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);