const mongoose = require('mongoose');
const dotenv = require('dotenv');
// console.log(process.env);
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASEPASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    // console.log(connection);
    console.log('connection is successful!');
  });

const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
