import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import BootNav from './Navbar.js';
import Home from './Home.js';
import Store from './Store.js';
import Location from './Location.js';
import Forum from './Forum.js';
import Cart from './Cart.js';


function App() {
  return (
    <Router>
      <div className="App">
        <BootNav />
        <div className="content">
          <Routes>
            <Route exact path="/P2" element={<Home />}/>
            <Route path="/store" element={<Store />}/>
            <Route path="/location" element={<Location />}/>
            <Route path="/forums" element={<Forum />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
