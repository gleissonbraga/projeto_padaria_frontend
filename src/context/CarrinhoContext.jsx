import { createContext, useContext } from "react";
import useCarrinho from "../hooks/useCarrinho";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const carrinho = useCarrinho();
  return (
    <CarrinhoContext.Provider value={carrinho}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => useContext(CarrinhoContext);