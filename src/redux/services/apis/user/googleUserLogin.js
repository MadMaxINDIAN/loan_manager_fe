// importing libraries
const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const googleLoginApi = async (idToken) => {
    return await post(`${base_url}/c/google_login`, null, {idToken});
};