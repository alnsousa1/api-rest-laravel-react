import Cursos from './components/Cursos'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div>
        <h1 className='m-2'>Gerenciador de Cursos</h1>
      </div>
      <BrowserRouter>
        <Nav variant='tabs' style={{background: '#fafafa'}}>
          <Nav.Link as={Link} to={"/cursos"}>Cursos</Nav.Link>
        </Nav>

        <Routes>
          <Route path='/cursos' element={<Cursos />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
