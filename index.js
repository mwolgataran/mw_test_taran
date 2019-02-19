const axios = require("axios");
const sha1Hex = require("sha1-hex");
const moment = require("moment");

class Config {
    constructor(api_login, secret_key) {
        this.api_login = api_login;
        this.secret_key = secret_key;
        this.unix = moment().unix();
        this.url = "https://api.corezoid.com/api/2/json/";
    }

    getSign(body) {

        let json_string = JSON.stringify(body);
        let string = this.unix + this.secret_key + json_string + this.secret_key;

        let sign = sha1Hex(string);

        return sign;
    }

    getUrl(sign) {

        const api_url = "https://api.corezoid.com/api/2/json/" + this.api_login + "/" + this.unix + "/" + sign;

        return api_url;
    }
}

class CorezoidRequest {

    async addTask(api_login, secret_key, conv_id, ref, task_data) {

        let body = {
            "ops": [{
                "type": "create",
                "obj": "task",
                "conv_id": conv_id,
                "ref": ref,
                "data": task_data
            }]
        };

        const config = new Config(api_login,secret_key);
        const sign = config.getSign(body);
        const api_url = config.getUrl(sign);
        
        let response = await axios.post(api_url, body).then(res => res.data);

        return response;
    }
}

module.exports = CorezoidRequest;