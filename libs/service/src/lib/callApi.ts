type TCallApi = {
  path: string;
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: string;
  }
}

const BASE_URL = 'http://localhost:3000/api'

export function callApi({ path, options }: TCallApi): Promise<Response> {
  return fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options
  });
}
