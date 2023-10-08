const REGISTER_URL = 'http://localhost:3001/api/users';

let username = '';
let password = '';

export const ADD_USER = fetch(REGISTER_URL,
  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      // withCredentials: true
  }
);