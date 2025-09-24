import Home from './Components/home/Home';
import Descricao from './Components/images/Descricao';
import NavBar from './Components/navbar/navbar';
import './index.css'
function App() {
  return (
    <div className="App">
           <NavBar/>
           <Home />
           <Descricao />
    </div>
  );
}

export default App;
