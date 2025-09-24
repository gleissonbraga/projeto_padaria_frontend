import Home from "./Components/home/Home";
import Descricao from "./Components/images/Descricao";
import NavBar from "./Components/navbar/navbar";
import "./index.css";
import Footer from "./Components/footer/footer";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Descricao />
      <Footer />
    </div>
  );
}

export default App;
