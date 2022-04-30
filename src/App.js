import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
