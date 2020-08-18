import React from 'react';
import BASE_URL from '../constants/constant';
import axios from 'axios';
const username = "hard";
const password = "hard";

export default  function http(url) {
    const options = {
        url:url,
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            'Content-Type': 'application/vnd.Reward Gateway Interview Exercise+json; version=1.0',
            // "Authorization": "Basic " + username + ':' + password,
            "Authorization": "Basic aGFyZDpoYXJk"
            // "Access-Contol-Allow-Origin":"*",
            // 'Transfer-Encoding':'chunked',
            // 'Server':'nginx',
            // 'Connection':'keep-alive'
        }
    };
    // const opt={
    //     Method: 'GET',
    //     headers: {
    //       Authorization: 'Basic hard:hard',
    //       referer: 'http://hiring.rewardgateway.net/list'
    //     }
    
    // }
    return axios(options)
    // return fetch(url,options);
}