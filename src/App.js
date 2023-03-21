import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Login2 from './components/Login2';
import Signup from './components/Signup';
import Home from './components/Home';
import FolderState from "./context/folders/FolderState";
import FileState from "./context/files/FileState";
import Files from "./components/Files";
import StarredPage from "./components/StarredPage";


function App() {
  return (
    <FileState>
      <FolderState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/folders/:id" element={<Home />} />
            <Route path="/starredPage" element={<StarredPage />} />

          </Routes>
        </Router>
      </FolderState>
    </FileState>


  );
}

export default App;
