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
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
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
  let names = [];
  files.forEach(file => {
    names.push(file.metadata.mediaLink);
  });

  return names;
}


const app = express();
app.use(cors())

app.get('/images', function (req, res){
  listFiles(bucketName).then(files => {
    res.send(files)
  })
})


// Process the file upload and upload to Google Cloud Storage.
app.post("/images", m.single("photo"), (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);

  // Make sure to set the contentType metadata for the browser to be able
  // to render the image instead of downloading the file (default behavior)
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
    // res.writeHead(301,
    //   {Location: 'http://localhost:3000/'}
    // );
    // res.end();
  });

  blobStream.end(req.file.buffer);
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]