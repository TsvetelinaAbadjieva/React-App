import axios from 'axios';

export default  function http(url,params) {
    const options = {
        url:url,
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            'Content-Type': 'application/vnd.Reward Gateway Interview Exercise+json; version=1.0',
            "Authorization": "Basic aGFyZDpoYXJk"
        },
        params:params
    };
    return axios(options)
}