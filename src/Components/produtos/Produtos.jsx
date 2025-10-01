import { useEffect, useState } from "react";
import apiClient from "../../api/api";
import { useCarrinhoContext } from "../../context/CarrinhoContext";

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [produtosDoces, setProdutosDoces] = useState([]);
  const [produtosSalgados, setProdutosSalgados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [quantidades, setQuantidades] = useState({});
  const {adicionarAoCarrinho} = useCarrinhoContext();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await apiClient.get("/produtos/ativos");

        if (response.data) {
          const doces = response.data.filter(
            (p) => p.nomeCategoria === "Doces"
          );
          const salgados = response.data.filter(
            (p) => p.nomeCategoria === "Salgados"
          );
          setProdutosDoces(doces);
          setProdutosSalgados(salgados);
          setProdutos(response.data)
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

   const incrementar = (idProduto) => {
    setQuantidades(prev => ({
      ...prev,
      [idProduto]: (prev[idProduto] || 0) + 1
    }));
  };

  const decrementar = (idProduto) => {
    setQuantidades(prev => ({
      ...prev,
      [idProduto]: Math.max((prev[idProduto] || 0) - 1, 0)
    }));
  };
  return (
    
    <section className="w-full bg-[#fff] flex justify-center pt-56 pb-6">
      <div className=" w-[98%] flex flex-col text-center items-center p-2">
        <div className="w-[38%] text-center font-sansita text-6xl p-3">
          <h3>Catálogo</h3>
        </div>
        <div className="w-[80%] h-24 mt-8 flex flex-col items-center">
          <div className="w-[48%] h-10 border-b-[1px] border-[#D9D9D9] flex justify-center">
            <ul className="flex gap-6 text-[1.2rem] text-[#5D5D5D] font-poppins font-semibold ">
              <li
                onClick={() => setCategoriaSelecionada("Todos")}
                className={`hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded
      ${
        categoriaSelecionada === "Todos"
          ? "border-b-4 border-amber-500 text-[#c78b59]"
          : ""
      }`}
              >
                Todos
              </li>
              <li
                onClick={() => setCategoriaSelecionada("Salgados")}
                className={`hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded
      ${
        categoriaSelecionada === "Salgados"
          ? "border-b-4 border-amber-500 text-[#c78b59]"
          : ""
      }`}
              >
                Salgado
              </li>
              <li
                onClick={() => setCategoriaSelecionada("Doces")}
                className={`hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded
      ${
        categoriaSelecionada === "Doces"
          ? "border-b-4 border-amber-500 text-[#c78b59]"
          : ""
      }`}
              >
                Doces
              </li>
              <li
                onClick={() => setCategoriaSelecionada("Pães")}
                className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded"
              >
                Pães
              </li>
              <li
                onClick={() => setCategoriaSelecionada("Tortas")}
                className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded"
              >
                Tortas
              </li>
              <li
                onClick={() => setCategoriaSelecionada("Sucos")}
                className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded"
              >
                Sucos
              </li>
            </ul>
          </div>
        </div>
        <article className="w-full flex p-3 gap-3 flex-wrap justify-center">
          {(categoriaSelecionada === "Doces"
            ? produtosDoces
            : categoriaSelecionada === "Salgados"
            ? produtosSalgados
            : categoriaSelecionada === "Todos"
            ? produtos
            : []
          ) // aqui você pode adicionar outros arrays de produtos para Pães, Tortas, Sucos
            .map((prod) => (
              <div
                key={prod.idProduto}
                className="w-[14%] flex flex-col gap-4 border-[0.4px] items-center border-[#3a3737aa] p-2 rounded-3xl hover:scale-[102%] hover:transition-transform duration-700"
              >
                <img src={`/images/${prod.imagem}`} alt={prod.nome} className="bg-gray-200 w-full h-36 rounded-2xl"/>
                <div>
                  <p>{prod.nome}</p>
                  <p>R$ {prod.preco.toFixed(2)}</p>
                </div>
                <div className="flex w-full gap-1 justify-center">
                  <div className="flex gap-1 items-center">
                   <button onClick={() => decrementar(prod.idProduto)} className="bg-red-500 w-6 h-6 text-white rounded hover:bg-red-600">-</button>
                    <span className="border-[1px] rounded w-8"> {quantidades[prod.idProduto] || 0}</span>
                    <button onClick={() => incrementar(prod.idProduto)} className="bg-blue-500 w-6 h-6 text-white rounded hover:bg-blue-600">+</button>
                  </div>
                </div>
                <button onClick={() => adicionarAoCarrinho(prod, quantidades[prod.idProduto])} className="w-[60%] cursor-pointer rounded font-semibold text-[1rem] border-2 border-amber-700 hover:bg-amber-700 hover:text-[#FFFF]">
                  Comprar
                </button>
              </div>
            ))}
        </article>
      </div>
    </section>
  );
}
