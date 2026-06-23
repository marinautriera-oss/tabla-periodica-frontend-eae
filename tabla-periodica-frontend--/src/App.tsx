import  { Routes, Route } from 'react-router-dom';
import  Login  from './pages/Login';
import Register  from './pages/Register';
import  Home  from './pages/Home';
import Admin from './pages/Admin';
import Verificar from './pages/Verificar';
import Navbar from './components/navbar';

function App() {
  return (
    <>
        <Navbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/verificar/:token" element={<Verificar />} />
    </Routes>
    </>
  );
}

export default App;