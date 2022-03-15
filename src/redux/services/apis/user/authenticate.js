const {get, post, del, patch} = require("../../../utils/apiHelper");
const {base_url} = require("../../../constants/urls");

export const authenticateUser = async (phoneNumber) => {
    return await post(`${base_url}/c/authenticate`, null, {phoneNumber});
}