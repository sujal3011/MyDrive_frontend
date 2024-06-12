import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import FolderState from "./context/folders/FolderState";
import FileState from "./context/files/FileState";
import Redirect from "./components/Redirect"
import ProfilePage from "./components/ProfilePage";
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <FileState>
      <FolderState>
        <Router>

          <ToastContainer />
          <Routes>
            <Route path="/" element={<Dashboard page="home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/folders/:id" element={<Dashboard page="home" />} />
            <Route path="/starredPage" element={<Dashboard page="starred" />} />
            <Route path="/trash" element={<Dashboard page="trash" />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/share/:itemType/:id" element={<Dashboard page="share" />} />

          </Routes>
        </Router>
      </FolderState>
    </FileState>


  );
}

export default App;
