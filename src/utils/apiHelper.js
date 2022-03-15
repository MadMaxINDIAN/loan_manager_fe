import axios from "axios";

export const post = (url, token, data = null, formdata = null) => {
  const headers = {
    Authorization: token,
  };
  if (formdata) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  return axios.post(url, data || formdata, { headers: headers });
};

export const get = (url, token) => {
  const headers = {
    Authorization: token,
  };
  return axios.get(url, { headers: headers });
};

export const del = (url, token, data = null, formdata = null) => {
  const headers = {
    Authorization: token,
  };
  if (formdata) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  return axios.delete(url, data, { headers: headers });
};

export const patch = (url, token, data = null, formdata = null) => {
  const headers = {
    Authorization: token,
  };
  if (formdata) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (data) {
    headers["Content-Type"] = "application/json";
  }

  return axios.patch(url, data, { headers: headers });
};