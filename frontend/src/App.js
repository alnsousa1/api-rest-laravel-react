import Home from './components/Home'
import Devs from './components/Devs'
import Levels from './components/Levels'
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
 
function App() {
  return (
    <div className="App">
      <h1>Teste Gazin</h1>
      <BrowserRouter>
      <ul>
        <li> <Link to="/">Home </Link></li>
        <li> <Link to="/devs">Devs</Link></li>
        <li> <Link to="/levels">Levels</Link></li>
      </ul>

      <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/devs' element={<Devs/>}></Route>
        <Route path='/levels' element={<Levels/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
