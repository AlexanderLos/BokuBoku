import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../src/components/Homepage';
import About from '../src/components/About';
import Nav from '../src/components/Nav';
import Plan from '../src/components/Plan';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/plan' element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
