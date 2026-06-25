import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Verificar from './pages/Verificar';
import ElementoDetalle from './pages/ElementoDetalle';
import Quiz from './pages/Quiz';
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
        <Route path="/elemento/:id" element={<ElementoDetalle />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}
export default App;