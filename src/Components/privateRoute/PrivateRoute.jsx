import { Navigate } from "react-router-dom";
import { useCarrinhoContext } from "../../context/CarrinhoContext";

export default function PrivateRoute({ children }) {
  const { qtdProdutosDiferentes } = useCarrinhoContext();

  if (qtdProdutosDiferentes === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
}
