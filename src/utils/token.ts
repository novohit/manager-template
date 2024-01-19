const ACCESS_TOKEN = 'access_token';

export function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
