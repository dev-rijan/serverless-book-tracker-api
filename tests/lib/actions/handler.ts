import axios, { AxiosResponse, AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/dev/";

const _delete = (url: string, params = {}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    return axios
      .delete(`${BASE_URL}${url}`, { params: params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

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
  updateBook: (data) => post(data, "book"),
  deleteBook: (params = {}): Promise<AxiosResponse> => _delete("book", params),
  //   createTask: (data) => post(data, "book/create"),
};
