import axios from 'axios';

const http = {
    async postApi(url, cfg, headers) {
        let fd = new FormData();
        for (let key in cfg) {
            fd.append(key, cfg[key]);
        }
        let data = await axios.post(url, cfg,
            {
                headers: headers
            })
        return data;
    },
    async putApi(url, cfg, headers) {
        let data = await axios.post(url, cfg,{
            headers: headers
        })
        return data;
    },
}
export default http;