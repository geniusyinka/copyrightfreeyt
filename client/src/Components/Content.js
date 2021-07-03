import React, { useEffect, useState } from 'react';
import $ from 'jquery';


function Content(props) {
    return (
        <div className='box mt-10 mr-5 ml-5 flex flex-col'>
            <div className="thumbnail ">
                <img className='rounded-lg' src={props.img} alt="" />
            </div>
            <div className="etc flex justify-between items-center">
                <div className="title text-xl text-gray-500">
                    <h1>{props.title}</h1>
                </div>
                <div className="download">
                <a id='link' className='getlink' data-label={props.download} target='_blank no-follow' onClick={props.clickME}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    strokeWidth="2" 
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                            </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Content;