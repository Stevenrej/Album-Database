
const express = require('express');
const userRoutes = require('./routes/user-routes');
const albumRoutes = require('./routes/album-routes');

const app = express();


app.use(express.json());

app.use(userRoutes);
app.use(albumRoutes);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
