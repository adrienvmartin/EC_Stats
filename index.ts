const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({ extended: false }));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR BACKEND IS CONNECTED' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
