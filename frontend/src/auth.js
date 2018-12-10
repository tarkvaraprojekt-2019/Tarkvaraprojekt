import axios from 'axios';
import { navigate } from 'gatsby';

const getToken = () =>
  window.localStorage.authToken || ""


export const isBrowser = typeof window !== `undefined`;


export const setToken = token => {
  token = token.includes('"') ? '' : token;
  window.localStorage.authToken = token;
};

export const getBaseUrl = () => {
  if (!isBrowser) return false
  const host = window.location.hostname;
  const baseurl = host === 'localhost' ? 'http://localhost' : '';
  return baseurl
}

export function handleLogin({ username, password }) {
  if (!isBrowser) return false

  const user = btoa(username);
  const pass = btoa(password);

  const auth = user + ':' + pass;

  return axios({
      method: 'get', 
      url: getBaseUrl() + '/api/get_token.php', 
      headers: {
          'Auth': auth,
      }
  })
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const token = getToken()
  return token !== '' && !token.includes('"');
}

export const isAdmin = () => {
  if (!isBrowser) {
    return false;
  }
  const adminString = getToken().split(':')[2];
  return adminString === "1"
}

export const getName = () => {
  if (!isBrowser) return false;
  const nameString = getToken().split(':')[0];
  //console.log('name: ', nameString);
  //console.log('atob: ', atob(nameString));

  return atob(nameString);
};

export const getCurrentToken = () => isBrowser && getToken()

export const logout = () => {
  if (!isBrowser) return

  console.log(`Logging out`)
  setToken('');
  navigate('/');
}