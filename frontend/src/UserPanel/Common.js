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
  console.log(issn);
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


export function DeleteConf(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deleteconf/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/publish');
  return response === 'success';
}


export function GetPaper(id, from) {
  return fetch(API_URL + '/paperinfo/?id=' + id + '&from=' + from)
    .then((res) => res.json())
}

export function SetPaperInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setpaperinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddPaper(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addpaper/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}

export function DeletePaper(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletepaper/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/achi');
  return response === 'success';
}


export function GetConfpaper(id, from) {
  return fetch(API_URL + '/confpaperinfo/?id=' + id + '&from=' + from)
    .then((res) => res.json())
}

export function SetConfpaperInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setconfpaperinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddConfpaper(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addconfpaper/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}

export function DeleteConfpaper(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deleteconfpaper/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/achi');
  return response === 'success';
}


export function GetArticle(id, from) {
  return fetch(API_URL + '/articleinfo/?id=' + id + '&from=' + from)
    .then((res) => res.json())
}

export function SetArticleInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setarticleinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddArticle(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addarticle/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}

export function DeleteArticle(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletearticle/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/achi');
  return response === 'success';
}


export function GetBook(id, from) {
  return fetch(API_URL + '/bookinfo/?isbn=' + id + '&from=' + from)
    .then((res) => res.json())
}

export function SetBookInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setbookinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddBook(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addbook/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}

export function DeleteBook(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletebook/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/achi');
  return response === 'success';
}


export function GetPatent(id, from) {
  return fetch(API_URL + '/patentinfo/?patent_num=' + id + '&from=' + from)
    .then((res) => res.json())
}

export function SetPatentInfo(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/setpatentinfo/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => { return res.text() === 'success'; });
}

export function AddPatent(dict) {
  var uid = window.sessionStorage.getItem('id');

  return fetch(API_URL + '/addpatent/', {
    method: 'POST',
    body: JSON.stringify({ ...dict, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json());
}

export function DeletePatent(id) {
  let response = '';
  let uid = window.sessionStorage.getItem('id');

  fetch(API_URL + '/deletepatent/', {
    method: 'POST',
    body: JSON.stringify({ todelete: id, curusr: uid }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => response = res.text());

  window.location.assign(REACT_URL + '/my/achi');
  return response === 'success';
}
