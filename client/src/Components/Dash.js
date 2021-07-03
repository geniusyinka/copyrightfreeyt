import React, { Component } from 'react';
import axios from 'axios';
import Content from './Content';
import $ from 'jquery';


class Dash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            videos: [],
            links: ''
        }
    }

    async componentDidMount() {
        const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=PLRBp0Fe2Gpgn23yQax0pxzVjpNqC8ZMiX&key=AIzaSyCTL0TqW1LroanPRb4NHk3alixcALqMKqg'
        const getData = await axios.get(url)
        const data = getData.data.items;
        this.setState({videos: data, loading:false})
        //console.log(data)
    }



    render(props)  {

        var link = null;
        var url;
        //var log;
        var log2; //function declearation

        $(document).ready(function() {
            getLink();
        })


        function getLink() {
            $("a.getlink").click(function(){
                link = $(this).attr('data-label');
                //url = "logged"
                console.log(link); 
                return link
            });
            return link;
            
        }

        function sendLink() {
            var theLink = getLink();
            console.log(theLink)

            axios({
                method: 'post',
                url: '/data',
                headers: {}, 
                data: {
                link: theLink, // This is the body part
                },
            })
            .then(res => {console.log(res.data)
                    if (res.data.message === "filled!") {
                        window.open('http://localhost:5000/downloads', '_parent')
                    }
                })
        }

        const loadData = this.state.videos.map((datas, index) => (
        url = datas.snippet.resourceId.videoId,

        <Content
            key={index}
            img={datas.snippet.thumbnails.high.url} 
            title={datas.snippet.title}
            //vid={datas.snippet.resourceId.videoId}
            download={`https://www.youtube.com/watch?v=${url}`} 
            clickME={getLink.bind(this), sendLink.bind(this)}
        />
    ))

        return (
            <div>

                {/* <h1 data-label="hey!" onClick={log}>yoo!</h1> */}
                {this.state.loading || !this.state.videos  ? 
                <div>Loading videos...</div> : 
                <div className="renderVideo mb-10 flex flex-wrap justify-center">
                    {loadData}
                </div>}
            </div>
        );
    } 
}

export default Dash;