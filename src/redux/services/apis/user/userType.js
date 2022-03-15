const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const updateUserType = async (data, token) => {
    return await post(`${base_url}/c/type`, token, {...data});
}