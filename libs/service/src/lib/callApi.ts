import axios from 'axios'

type TCallApi = {
  path: string;
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: {
      [key: string]: any
    }
  }
}

const BASE_URL = 'http://localhost:3000/api'

export function callApi({ path, options }: TCallApi) {
  return axios.request({
    url: BASE_URL + path,
    headers: {
      "Content-Type": "application/json",
    },
    ...options
  })
  // return fetch(BASE_URL + path, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   ...options
  // });
}
