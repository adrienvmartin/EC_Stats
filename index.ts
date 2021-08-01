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
    // cb(null, Date.now() + '-' + file.originalName);
    cb(null, 'csvfile');
  },
});

const upload = multer({ storage: storage }).single('file');

app.delete('/csv', (req, res) => {
  fs.readdir(filepath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(filepath, file), (err) => {
        if (err) throw err;
      });
    }
  });
});

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

  fs.createReadStream(filepath + `/csvfile`).pipe(
    parse({
      delimiter: ',',
      bom: true,
    })
      .on('data', (dataRow) => {
        data.push(dataRow);
      })
      .on('end', () => {
        // console.log('data: ' + data);
        res.send({ data });
      })
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
