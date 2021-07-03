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


app.get('/api', (req, res) => {
    console.log('it works!');
});


var urls;

function datas(){ 
    app.post('/data', (req, res) => {
        urls = req.body.link;
        return res.json({
            "message": "filled!"
        })
    });
    return urls;
};

datas();


app.get('/downloads', (req, res) => {    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    var fileName = makeid(8) + ".mp3"
    res.header('Content-Disposition', 'attachment; filename=" '+ fileName +'"');
    var url3 = datas();
    ytdl(url3, {
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(res)
})



app.listen(port, () => console.log(`Server started on port ${port}`));