import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // TODO handle expected error
    return Promise.resolve(null);
  }
  return Promise.resolve(error.response);
});

const getApiUrl = () => {
  return process.env.BACKEND_URL ? process.env.BACKEND_URL : "/api";
};

const prepareHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

export const getDefaultRequestOption = () => {
  return {
    headers: prepareHeaders(),
    withCredentials: true,
  };
};

const get = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(getApiUrl() + url, getDefaultRequestOption())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
        window.location.href = "/internal-error";
      });
  });
};

const post = (url, body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(getApiUrl() + url, body, getDefaultRequestOption())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
        window.location.href = "/internal-error";
      });
  });
};

const deleteReq = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(getApiUrl() + url, getDefaultRequestOption())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
        window.location.href = "/internal-error";
      });
  });
};

export { get, post, deleteReq };
