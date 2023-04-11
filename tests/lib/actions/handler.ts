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

const _post = (data = {}, url: string): Promise<AxiosResponse> => {
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

const _get = (bookId: string, url: string): Promise<AxiosResponse> => {
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

const __get = (url: string, params = {}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`${BASE_URL}${url}`, { params: params })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export default {
  createBook: (data): Promise<AxiosResponse> => _post(data, "book"),
  getBook: (bookId: string): Promise<AxiosResponse> => _get(bookId, "book"),
  getAllBooks: (): Promise<AxiosResponse> => __get("books"),
  deleteBook: (params = {}): Promise<AxiosResponse> => _delete("book", params),
  createComment: (data): Promise<AxiosResponse> => _post(data, "comment"),
};
