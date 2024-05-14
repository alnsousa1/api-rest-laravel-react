import Home from './components/Home'
import Devs from './components/Devs'
import Levels from './components/Levels'
import {BrowserRouter, Routes, Link, Route} from 'react-router-rom'
 
function App() {
  return (
    <div className="App">
      <h1>Teste Gazin</h1>
      <ul>
        <li>Home</li>
        <li>Devs</li>
        <li>Levels</li>
      </ul>
    </div>
  );
}

export default App;
