import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import ResearcherPanel from './UserPanel/ResearcherPanel';
import AssistantPanel from './UserPanel/AssistantPanel';
import AdminPanel from './UserPanel/AdminPanel';
import Album from './SchoolPage/Album';
import Researcher from './SchoolPage/Researcher';
import { REACT_URL } from './Constants';


function My() {
  var userid = window.sessionStorage.getItem('id');
  if (!userid)
    window.location.assign(REACT_URL + '/login');

  var userty = userid.slice(2, 4);
  if (userty === '01')
    return <ResearcherPanel />;
   else if (userty === '02')
     return <AssistantPanel />;
  else if (userty === '03')
    return <AdminPanel />;
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/my/*' element={<My />}/>
          <Route path='/college/*' element={<Album title='学院列表'/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Researcher />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
