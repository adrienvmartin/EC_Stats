const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const parse = require('csv-parse');

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

// Create async endpoint that both uploads the file and uses createReadStream on it
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

app.post('/takestats', (req, res) => {
  const data = [];
  const thename = [];
  fs.readdir(filepath, (err, files) => {
    if (err) {
      console.log(err);
    }
    console.log('files[0] = ' + files[0]);
    thename.push(files[0]);
    console.log('thename now equals ' + typeof thename);
  });

  fs.createReadStream(filepath + `/${thename[0]}`).pipe(
    parse({
      delimiter: ',',
    })
      .on('data', (dataRow) => {
        data.push(dataRow);
        console.log('dataRow: ' + dataRow);
      })
      .on('end', () => {
        console.log('data: ' + data);
      })
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
