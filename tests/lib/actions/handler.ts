// import fetch from "node-fetch";
import axios, { AxiosResponse, AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/dev/";

const post = (data = {}, url = ""): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${BASE_URL}${url}`, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const get = (bookId: string, url: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    console.log(`${BASE_URL}${url}?bookId=${bookId}`);

    return axios
      .get(`${BASE_URL}${url}?bookId=${bookId}`)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export default {
  createBook: (data): Promise<AxiosResponse> => post(data, "book"),
  getBook: (bookId: string): Promise<AxiosResponse> => get(bookId, "book"),
  updateBook: (data) => post(data, "book/update"),
  deleteBook: (data) => post(data, "book/delete"),
  //   createTask: (data) => post(data, "book/create"),
};
