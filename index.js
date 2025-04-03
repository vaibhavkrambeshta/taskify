const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/taskify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes go here...
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});