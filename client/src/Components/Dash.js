import React, { Component } from 'react';
import axios from 'axios';
import Content from './Content';
import $ from 'jquery';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";


const override = css`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class Dash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            videos: [],
            links: '',
            
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

        $(document).ready(function() {
            getLink();
        })


        function getLink() {
            $("a.getlink").click(function(){
                link = $(this).attr('data-label');
               // console.log(link); 
                return link
            });
            return link;
            
        }

        function sendLink() {
            var theLink = getLink();
            axios({
                method: 'post',
                url: '/data',
                headers: {}, 
                data: {
                link: theLink, // This is the body part
                },
            })
            .then(res => {console.log(res.data)
                    if (res.data.message === "success") {
                        window.open('/downloads', '_parent')
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
            //iframe = {`https://www.youtube.com/embed/${url}`}
            
        />
        ))

        return (
            <div>

                {/* <h1 data-label="hey!" onClick={log}>yoo!</h1> */}
                {this.state.loading || !this.state.videos  ? 
                <BeatLoader color={"#123abc"} loading={this.state.loading} css={override} size={50} speedMultiplier={1} margin={2} /> : 
                <div className="renderVideo mb-10 flex flex-wrap justify-center">
                    {loadData}
                </div>}
            </div>
        );
    } 
}

export default Dash;