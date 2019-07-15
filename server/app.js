const { createWriteStream } = require("fs");
const path = require("path");
const express = require("express");
const cors = require('cors')
const { Storage } = require("@google-cloud/storage");
const multer = require('multer');

// Multer is required to process file uploads and make them available via
// req.files.
const m = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // not larger than 5mb
  }
});


const bucketName = "image-directory-gsd";
const storage = new Storage({
  keyFilename: path.join(__dirname, "./image-directory-cb28f578e8dc.json"),
  projectId: "image-directory"
});
const bucket = storage.bucket(bucketName);

async function listFiles(bucketName) {
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const [files] = await storage.bucket(bucketName).getFiles();
  let images = [];
  files.forEach(file => {
    let image = {
      src: file.metadata.mediaLink,
      thumbnail: file.metadata.mediaLink
    }
    images.push(image);
  });

  return images;
}


const app = express();
app.use(cors())

app.get('/images', function (req, res){
  listFiles(bucketName).then(files => {
    res.send(files)
  })
})


app.post("/images", m.single("photo"), (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on("error", err => {
    next(err);
    return;
  });

  blobStream.on("finish", () => {
    res.status(200).send(`successful`);
  });

  blobStream.end(req.file.buffer);
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});