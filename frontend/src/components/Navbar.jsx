import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">AI Job Board</h1>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/jobs" className="mr-4">Jobs</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/register" className="mr-4">Register</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;

