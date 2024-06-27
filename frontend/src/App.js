import Home from './components/Home'
import Devs from './components/Devs'
import Levels from './components/Levels'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div>
        <h1 className='m-2'>Gerenciador de Devs</h1>
      </div>
      <BrowserRouter>
        <Nav variant='tabs' style={{background: '#fafafa'}}>
          <Nav.Link as={Link} to={"/"}>Página inicial</Nav.Link>
          <Nav.Link as={Link} to={"/devs"}>Desenvolvedores</Nav.Link>
          <Nav.Link as={Link} to={"/levels"}>Níveis</Nav.Link>
        </Nav>

        <Routes>
          <Route path='/' index element={<Home />}></Route>
          <Route path='/devs' element={<Devs />}></Route>
          <Route path='/levels' element={<Levels />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
