Okay so for starters, here are a few things we're sending back to this server to carry out...

    full video link
    file / video name, maybe. 

    so right now, we'll build a function that gets the title of the video, sends it to our api and the console.logs it.
    


https://stackoverflow.com/questions/54952355/how-to-post-data-from-react-to-express
https://stackoverflow.com/questions/10579713/passing-a-local-variable-from-one-function-to-another

so, we have most of the functionalities all set up. the nxt thing we need to add is the ability to download the mp3 of the video file on one click. we also need to enable play on click. but download for now. 

how do we achieve that?
    so for one:
    the video link is stored as the video id alone. so we need to concatenate it with this 
    
    "https://www.youtube.com/watch?v=+{videoID}" done!!


s

okay so some bottle neck. i'm thinking about simply adding the link to a 'data--' html attribute and get the data from there and do with it what i want. 

okay so we'll take away the component and write everything inside of the dash component. and not abstract that bit a way for now. 