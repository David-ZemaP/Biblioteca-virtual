import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home  from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import About from './pages/About';
import BookDetail from './pages/BookDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/libro/:workId" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}