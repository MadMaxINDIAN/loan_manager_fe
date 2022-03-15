const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const getUserInfoAPI = async (token) => {
    return await get(`${base_url}/c/info`, token);
}