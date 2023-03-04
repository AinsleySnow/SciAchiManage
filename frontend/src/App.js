import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResearcherPanel from './UserPanel/ResearcherPanel';
import Album from './SchoolPage/Album';
import Researcher from './SchoolPage/Researcher';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/my/*' element={<ResearcherPanel />} />
          <Route path='/colleges/*' element={<Album title='学院列表'/>} />
          <Route path='/' element={<Researcher />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
