export function exist_token(cookie_token) {
  // console.log(cookie_token);
  if (cookie_token == undefined || cookie_token == "undefined") {
    return false;
  } else {
    return true;
  }
}

export function domain() {
  return "https://api-laboratorio-juanito.herokuapp.com";
  //return "http://127.0.0.1:7000";
}
