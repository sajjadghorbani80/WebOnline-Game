/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function parseJwt(token:string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function getTokenFromCookies(headerKey:string) {
  const cookie = document.cookie;
  const cookieArray = cookie.split('; ');
  for (const items of cookieArray) {
    if (items.startsWith(headerKey)) {
      return items.slice(headerKey.length+1);
    }
  }
  return undefined;
}
export {parseJwt, getTokenFromCookies};
