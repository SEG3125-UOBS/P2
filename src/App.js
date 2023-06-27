import './App.css';
import Home from './Home.js';
import Store from './Store.js';
import BootNav from './Navbar.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <BootNav />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/store" element={<Store />}/>
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
