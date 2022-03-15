const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const updateWorkDetailsAPI = async (data, token) => {
    return await post(`${base_url}/c/work_specialization_details`, token, {...data});
}