import { API_URL } from "../Constants";

export function GetUser(curusr, id) {
  var which = '';
  if (!id) which = 'all';
  else which = id;

  return fetch(API_URL + '/usrinfo?id=' + curusr + '&which=' + which)
    .then((res) => res.json())
}

export function GetResearcher(id) {
  return fetch(API_URL + 'resinfo?id=' + id)
    .then((res) => res.json())
}

export function SetUserInfo(id, dict) {
  var response = '';
  var uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/setusrinfo?id=' + id, {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  return response === 'success';
}

export function SetResInfo(id, dict) {
  var response = '';
  var uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/setresinfo?id=' + id, {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  return response === 'success';
}

export function AddUser(usr) {
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/add/', {
    method: 'POST',
    body: JSON.stringify({ ...usr, uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  return response === 'success';
}

export function DeleteUser(id) {
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/delete/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  return response === 'success';
}
