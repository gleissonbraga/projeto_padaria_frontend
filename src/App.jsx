import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/home/Home.jsx";
import Descricao from "./Components/images/Descricao.jsx";
import "./index.css";
import Footer from "./Components/footer/footer.jsx";
import Sobre from "./Components/sobre/Sobre.jsx";
import Produtos from "./Components/produtos/Produtos.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import NavBar from "./Components/navbar/NavBar.jsx";
import DadosPessoa from "./Components/pagamento/DadosPessoa.jsx";
import PrivateRoute from "./Components/privateRoute/PrivateRoute.jsx";
import Erro from "./Components/pagamento/Erro.jsx";
import Pendente from "./Components/pagamento/Pendente.jsx";
import Sucesso from "./Components/pagamento/Sucesso.jsx";
import Login from "./Components/login/Login.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import AdminPrivateRoute from "./Components/privateRoute/AdminPrivateRoute.jsx";
import LinkPageAdmin from "./Components/Admin/LinkPageAdmin.jsx";
import NavBarMobile from "./Components/navbar/NavBarMobile.jsx";

function App() {
  const location = useLocation();

  // Oculta NavBar e Footer apenas na página de login
  const hideLayout =
    location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <CarrinhoProvider>
      {!hideLayout && <NavBar />}
      {!hideLayout && <NavBarMobile />}
      {!hideLayout && <LinkPageAdmin />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Descricao />
            </>
          }
        />
        <Route path="/produtos" element={<Produtos />} />
        <Route
          path="/dados"
          element={
            <PrivateRoute>
              <DadosPessoa />
            </PrivateRoute>
          }
        />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/pagamento/erro" element={<Erro />} />
        <Route path="/pagamento/sucesso" element={<Sucesso />} />
        <Route path="/pagamento/pendente" element={<Pendente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <Admin />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </CarrinhoProvider>
  );
}

export default App;
