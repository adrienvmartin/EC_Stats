const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ extended: false }));
app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.send({ express: 'YOUR BACKEND IS CONNECTED' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
