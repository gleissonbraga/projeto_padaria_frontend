import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Components/home/Home.jsx";
import Descricao from "./Components/images/Descricao.jsx";
import "./index.css";
import Footer from "./Components/footer/footer.jsx";
import Produtos from "./Components/produtos/Produtos.jsx"
import NavBar from "./Components/navbar/NavBar.jsx"
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import Modal from "./Components/modal/Modal.jsx";

function App() {
  return (
    <div className="App">
      <CarrinhoProvider>
      <NavBar/>
      <Routes>
      <Route path="/" element={
          <>
            <Home />
            <Descricao />
          </>
      }/>
      <Route path="/produtos" element={<Produtos />} />  
      </Routes>
     <Footer/>
     </CarrinhoProvider>
    </div>
  );
}

export default App;
