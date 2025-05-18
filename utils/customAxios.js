import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const api = axios.create(axiosConfig);

export const post = async (url, jsonObj, headers = {}) => {
  return api.post(url, jsonObj, { headers }).then(
    (response) => response,
    (error) => {
      throw error.response ? error.response : error;
    }
  );
};

export const get = async (url, headers) => {
  return api.get(url, { headers }).then(
    (response) => response,
    (error) => {
      throw error.response ? error.response : error;
    }
  );
};

export const put = async (url, jsonObj, headers) => {
  return api.put(url, jsonObj, { headers }).then(
    (response) => response,
    (error) => {
      throw error.response ? error.response : error;
    }
  );
};

export const del = async (url, jsonObj, headers) => {
  return api.delete(url, jsonObj, { headers }).then(
    (response) => response,
    (error) => {
      throw error.response ? error.response : error;
    }
  );
};
