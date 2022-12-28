const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectbd = require("./config/bdconnect");

const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user");
const crudRoute = require("./routes/usercrud");
connectbd()
app.use(express.json());
app.use("/users", userRoutes);
app.use("/crud", crudRoute);


app.listen(port, () => console.log(`Server started on port ${port}`));
