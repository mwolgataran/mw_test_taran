const axios = require("axios");
const sha1Hex = require("sha1-hex");
const moment = require("moment");

class CorezoidRequest {
    constructor(api_login, secret_key) {
        this.api_login = api_login;
        this.secret_key = secret_key;
    }

    async addTask(conv_id, ref, task_data) {

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
        let string = unix + this.secret_key + json_string + this.secret_key;

        let sign = sha1Hex(string);

        let api_url = "https://api.corezoid.com/api/2/json/" + this.api_login + "/" + unix + "/" + sign;

        let response = await axios.post(api_url, body).then(res => res.data);

        return response;
    }
}

module.exports = CorezoidRequest;