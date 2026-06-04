const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv/config");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("./config/connectDB");
const authRouter = require("./routes/authRoutes");

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

//security
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//routes
app.use("/api/v1/auth", authRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});
