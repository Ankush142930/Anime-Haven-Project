import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Popular from './Components/Popular.jsx';
import AnimeItem from './Components/AnimeItem.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
