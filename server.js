const express = require('express');
const app = express();
const port = process.env.PORT || 5000;;
const fs = require('fs');
var cors = require("cors");
const path = require('path');
const ytdl = require('ytdl-core');


//use cors to allow cross origin resource sharing
// app.use(
//     cors({
//       origin: 'http://localhost:3000',
//       credentials: true,
//     })
//   );

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var urls;

function datas(){ 
    app.post('/data', (req, res) => {
        urls = req.body.link;
        return res.json({
            "message": "success"
        })
    });
    return urls;
};

datas();


app.get('/downloads', async (req, res) => {    

    //get file url from 'datas()' method and store in a variable 
    var url3 = datas();

    //get video info form url
    let name = await ytdl.getInfo(url3);

    //get title data from 'ytdl.getInfo()'
    let title = name.videoDetails.title;

    // add .mp3 to filename
    let fileName = title + ".mp3"

    
    res.header('Content-Disposition', 'attachment; filename=" '+ fileName +'"');

    ytdl(url3, {
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(res)
})


app.listen(port, () => console.log(`Server started on port ${port}`));