import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


class Download extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: '',
            downloads: null
        }

    }

    onChangeHandle = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/data', $(e.target).serialize())
            .then(res => {console.log(res.data)
                if (res.data.message === "filled!") {
                    window.open('/downloads', '_parent')
                }
            })
            .catch(err => {
                console.error(err)
            })


           
    }

    render() {
        return (
            <div className=" center m-auto" >
                <form onSubmit={this.onSubmit.bind(this)} className="flex flex-col items-center">
                <input type="text" 
                            className="download-box shadow appearance-none mt-5 mb-5 border rounded w-96 py-3 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={this.state.link}
                            name="link"
                            placeholder = "Paste Link Here"
                            onChange={this.onChangeHandle.bind(this)}
                            required
                        />
                    <button 
                        className="bg-blue-500 m-auto hover:bg-blue-700 text-white font-bold w-60  py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Download
                    </button>
                </form>
            </div>
        );
    }
}



export default Download;