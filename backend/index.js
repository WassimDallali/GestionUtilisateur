const path = require('path');
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectbd = require("./config/bdconnect");
const cors = require("cors");


const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user");
const crudRoute = require("./routes/usercrud");
connectbd()
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/crud", crudRoute);


//FE
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }


app.listen(port, () => console.log(`Server started on port ${port}`));
