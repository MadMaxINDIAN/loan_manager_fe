const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const updateUserImageAPI = async (token, data) => {
    return await post(`${base_url}/c/image`, token, null, data);
}