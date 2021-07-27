const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

const filepath = 'client/public/uploads';

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, filepath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalName);
  },
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload', (req, res) => {
  fs.readdir(filepath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(filepath, file), (err) => {
        if (err) throw err;
      });
    }
  });

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.post('/takestats', async (req, res) => {
  const data = [];

  const fname = req.fname;
  fs.createReadStream(__dirname, +fname);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
