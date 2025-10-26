import { Route, Routes } from "react-router-dom";
import NavBarAdmin from "./components/navbar/navbar";
import CategoriaAdmin from "./components/categoria/CategoriaAdmin";
import ProdutosAdmin from "./components/produtos/ProdutosAdmin";
import PromocoesAdmin from "./components/promocoes/PromocoesAdmin";
import UsuariosAdmin from "./components/usuarios/UsuariosAdmin";
import PedidosAdmin from "./components/pedidos/PedidosAdmin";

export default function Admin() {
  return (
    <div className="w-full h-screen">
      <NavBarAdmin />
      <div className="pt-20 p-4">
        <Routes>
          <Route path="cadastro/categoria" element={<CategoriaAdmin />} />
          <Route path="cadastro/produtos" element={<ProdutosAdmin />} />
          <Route path="cadastro/promocoes" element={<PromocoesAdmin />} />
          <Route path="cadastro/usuarios" element={<UsuariosAdmin />} />
          <Route path="pedidos" element={<PedidosAdmin />} />
        </Routes>
      </div>
    </div>
  );
}
