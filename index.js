const axios = require("axios");

class CorezoidRequest {
    constructor(url) {
        this.url = url;
    }

    async getScheme(obj_id, obj_type){
        return axios.post(this.url,{"ops":[{"type":"get", "obj":"obj_scheme", obj_id, obj_type}]});
    }

    async addTask(conv_id, ref, task_data) {
        return axios.post(this.url,{"ops":[{"type":"create", "obj":"task", "conv_id":conv_id, "ref":ref, "data": task_data}]});
    }
}

module.exports = CorezoidRequest;