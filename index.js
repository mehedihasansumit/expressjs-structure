const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./src/services/db.service.js");
const userRoute = require("./src/routes/usersRoute.js");
const authRoute = require("./src/routes/authRoute.js");
const dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

sequelize.sync(
  // { force: true }
  { alter: true }
)
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get('/', (req, res) => {
  res.json({ 'message': 'ok' });
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const { customMessage, stack } = err;
  const statusCode = err.statusCode || 500;

  console.error(err.message, stack);
  res.status(statusCode).json({ 'message': err.message });
  // res.status(statusCode).json({ message: customMessage, error: err.message });

  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
