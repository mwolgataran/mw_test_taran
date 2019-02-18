const axios = require("axios");

class CorezoidRequest {
    constructor(url) {
        this.url = url;
    }

    async getScheme(obj_id, obj_type){
        return axios.post(this.url,{"ops":[{"type":"get", "obj":"scheme", obj_id, obj_type}]});
    }

    calcArea() {
        return this.height * this.width;
    }
}

module.exports = CorezoidRequest;