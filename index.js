const axios = require("axios");
const sha1Hex = require("sha1-hex");
const moment = require("moment");

class CorezoidRequest {
    constructor(url) {
        this.url = url;
    }

    async getScheme(obj_id, obj_type){
        return axios.post(this.url,{"ops":[{"type":"get", "obj":"obj_scheme", obj_id, obj_type}]});
    }

    async addTask(conv_id, ref, task_data, api_login, secret_key) {

        let body = {
            "ops": [{
                "type": "create",
                "obj": "task",
                "conv_id": conv_id,
                "ref": ref,
                "data": task_data
            }]
        };

        let unix = moment().unix();

        let json_string = JSON.stringify(body);
        let string = unix + secret_key + json_string + secret_key;

        let sign = sha1Hex(string);

        let api_url = "https://api.corezoid.com/api/2/json/" + api_login + "/" + unix + "/" + sign;

        let response = await axios.post(api_url, body).then(res => res.data);

        return response;
    }

    getSign(unix, secret_key, body){
        const unix = moment().unix();

        let json_string = JSON.stringify(body);
        const string = unix + secret_key + json_string + secret_key;

        return sha1Hex(string);
    }
}

module.exports = CorezoidRequest;