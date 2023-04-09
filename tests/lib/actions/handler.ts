import fetch from "node-fetch";

const { BASE_URL } = process.env;

const post = (data = {}, url = "") => {
  return new Promise((resolve, reject) => {
    return fetch(`${BASE_URL}${url}`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.log("FETCH error: ", error);
        reject(error);
      });
  });
};

export default {
  createList: (data) => post(data, "book/create"),
  getList: (data) => post(data, "book"),
  updateList: (data) => post(data, "book/update"),
  deleteList: (data) => post(data, "book/delete"),
  createTask: (data) => post(data, "book/create"),
};
