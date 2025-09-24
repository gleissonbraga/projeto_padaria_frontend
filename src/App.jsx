import Home from "./Components/home/Home";
import Descricao from "./Components/images/Descricao.jsx";
import NavBar from "./Components/navbar/NavBar.jsx";
import "./index.css";
import Footer from "./Components/footer/footer.jsx";
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
