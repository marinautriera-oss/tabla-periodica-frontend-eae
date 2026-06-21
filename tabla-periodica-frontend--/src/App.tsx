import  { Routes, Route } from 'react-router-dom';
import  Login  from './pages/Login';
import Register  from './pages/Register';
import  Home  from './pages/Home';
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;