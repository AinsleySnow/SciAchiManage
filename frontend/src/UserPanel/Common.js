import { API_URL, REACT_URL } from "../Constants";

export function GetUser(curusr, id) {
  var which = '';
  if (!id) which = 'all';
  else which = id;

  return fetch(API_URL + '/usrinfo?id=' + curusr + '&which=' + which)
    .then((res) => res.json())
}

export function GetResearcher(id) {
  return fetch(API_URL + '/resinfo?id=' + id)
    .then((res) => res.json())
}

export function SetUserInfo(id, dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setusrinfo/?id=' + id, {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function SetResInfo(id, dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setresinfo/?id=' + id, {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddUser(usr) {
  let uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/adduser/', {
    method: 'POST',
    body: JSON.stringify({ ...usr, 'uid': uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
}

export function DeleteUser(id) {
  let uid = window.sessionStorage.getItem('id');
  let response = '';

  fetch(API_URL + '/deleteuser/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/users');
  return response === 'success';
}

export function GetCollege() {
  return fetch(API_URL + '/collegelist/')
    .then((res) => res.json());
}

export function GetCollegeMembers(id) {
  return fetch(API_URL + '/collegemembers/?id=' + id)
    .then((res) => res.json());
}


export function AddCollege(name) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addcollege/', {
    method: 'POST',
    body: JSON.stringify({ toadd: name, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}


export function DeleteCollege(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletecollege/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/college');
  return response === 'success';
}


export function GetNewspaper(issn) {
  var link = issn ? 'issn=' + issn : 'issn=all';

  return fetch(API_URL + '/newspaperinfo/?' + link)
    .then((res) => res.json())
}


export function SetNewspaperInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setnewspaperinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}


export function AddNewspaper(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addnewspaper/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}


export function DeleteNewspaper(isbn) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletenewspaper/', {
    method: 'POST',
    body: JSON.stringify({ todelete: isbn, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/publish');
  return response === 'success';
}


export function GetJournal(issn) {
  var link = issn ? 'issn=' + issn : 'issn=all';

  return fetch(API_URL + '/journalinfo/?' + link)
    .then((res) => res.json())
}


export function SetJournalInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setjournalinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}


export function AddJournal(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addjournal/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}


export function DeleteJournal(isbn) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletejournal/', {
    method: 'POST',
    body: JSON.stringify({ todelete: isbn, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/publish');
  return response === 'success';
}


export function GetConf(id) {
  var link = id ? 'id=' + id : 'id=all';

  return fetch(API_URL + '/confinfo/?' + link)
    .then((res) => res.json())
}


export function SetConfInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setconfinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}


export function AddConf(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addconf/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}


export function DeleteConf(isbn) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deleteconf/', {
    method: 'POST',
    body: JSON.stringify({ todelete: isbn, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/publish');
  return response === 'success';
}
