import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ResumeUpload from './pages/ResumeUpload';
import Chat from './pages/Chat';


function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">AI Job Board</h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register" className="mr-4">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
	<Route path="/jobs" element={<Jobs />} />
	<Route path="/jobs/:id" element={<JobDetails />} />
	<Route path="/resume" element={<ResumeUpload />} />
	<Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

