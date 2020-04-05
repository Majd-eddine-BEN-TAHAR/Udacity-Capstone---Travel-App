const axios = require("axios");

export function sendRequest(postUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(postUrl, {
        destination: data.destination,
        date: data.departing,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        alert(error.response.statusText);
      });
  });
}

// module.exports = sendRequest;
