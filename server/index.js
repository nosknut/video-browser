const express = require("express");
const app = express();
const fs = require("fs");
var cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors());

// Lists the videos in the dir
app.get("/videos", function (req, res) {
    fs.readdir(process.env.VIDEO_DIR, (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send({videos: files.filter(file => file.endsWith(".mp4"))});
        }
    });
});

app.get("/videos/:name", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const decodedName = decodeURIComponent(req.params.name);
    const videoPath =  path.join(process.env.VIDEO_DIR, decodedName)
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, {start, end});
    videoStream.pipe(res);
});

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});