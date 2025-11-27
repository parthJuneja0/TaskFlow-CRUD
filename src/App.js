import './App.css';
import AddTask from './components/AddTask';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import SignUp from './components/SignUp';
import TaskState from './context/tasks/TaskState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <TaskState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tasks" element={<Tasks />} />
            <Route exact path="/create" element={<AddTask />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </TaskState>
    </AuthState>
  );
}

export default App;