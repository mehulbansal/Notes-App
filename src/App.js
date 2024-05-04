
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import Navbar from "./components/Navbar.js";
import { Home } from "./components/Home.js";
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.js';
import Login from './components/Login.js';
import Singup from './components/Singup.js';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="Store all your notes here."/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Singup />} />

        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
