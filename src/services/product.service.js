const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

const sendRequest = (url, method = 'GET', data = {}) => {
  const params = Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
  if (method === 'GET') {
    return fetch(url, {
      method,
      credentials: 'include',
    }).then((result) => result.json().then((json) => {
      if (result.ok) return json.data;
      throw json.Message;
    }));
  }
  return fetch(url, {
    method,
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    credentials: 'include',
  }).then((result) => {
    if (result.ok) {
      return result.text().then((text) => text && JSON.parse(text));
    }
    return result.json().then((json) => {
      throw json.Message;
    });
  });
};

export const getProducts = () => sendRequest(`${URL}/Orders`);
