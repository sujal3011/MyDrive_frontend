import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import FolderState from "./context/folders/FolderState";
import FileState from "./context/files/FileState";
import Redirect from "./components/Redirect"
import ProfilePage from "./components/ProfilePage";
import Dashboard from './components/Dashboard'


function App() {
  return (
    <FileState>
      <FolderState>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard page="home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/folders/:id" element={<Dashboard page="home" />} />
            <Route path="/starredPage" element={<Dashboard page="starred" />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </Router>
      </FolderState>
    </FileState>


  );
}

export default App;
