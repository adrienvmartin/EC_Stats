const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'client/public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalName);
  },
});

const upload = multer({ storage: storage }).single('file');

app.post('/takestats', async (req, res) => {
  const data = await req.data;
  res.send({ data: data });
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
