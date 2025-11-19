import { useEffect, useState } from "react";
import apiClient from "../../api/api";
import { useCarrinhoContext } from "../../context/CarrinhoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [produtosDoces, setProdutosDoces] = useState([])
  const [produtosSalgados, setProdutosSalgados] = useState([])
  const [produtosPaes, setProdutosPaes] = useState([])
  const [produtosTortas, setProdutosTortas] = useState([])
  const [produtosSucos, setProdutosSucos] = useState([])
  const [toastVisible, setToastVisible] = useState(false)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [quantidades, setQuantidades] = useState({})
  const {adicionarAoCarrinho} = useCarrinhoContext()

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
          const paes = response.data.filter(
            (p) => p.nomeCategoria === "Pães"
          );
          const sucos = response.data.filter(
            (p) => p.nomeCategoria === "Sucos"
          );
          const tortas = response.data.filter(
            (p) => p.nomeCategoria === "Tortas"
          );
          setProdutosDoces(doces);
          setProdutosSalgados(salgados);
          setProdutosPaes(paes)
          setProdutosSucos(sucos)
          setProdutosTortas(tortas)
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

  const handleMessage = (quantidade) => {

    if(quantidade > 0){
      setToastVisible(true)
    }

    setTimeout(() => {
      setToastVisible(false)
    }, 6000)
  }

  return (
    
    <section className="w-full bg-[#67400C] flex justify-center pt-56 pb-6 ">
      <div className=" w-[98%] flex flex-col text-centerp-2 bg-[#FFDDBD] mt-6 rounded-2xl p-6">
        <div className="w-[38%] font-sansita text-6xl p-3 ">
          <h3>Catálogo</h3>
        </div>
        <div className="w-[80%] h-24 mt-8 flex flex-col border-t-[2px] border-[#5F3600] justify-center">
          <div className="w-[48%] h-10 flex">
            <ul className="flex gap-6 text-[0.6rem] sm:text-[1.2rem] text-[#5D5D5D] font-poppins font-semibold ">
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
                onClick={() => setCategoriaSelecionada("Paes")}
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
            : categoriaSelecionada === "Pães"
            ? produtosPaes
            : categoriaSelecionada === "Sucos"
            ? produtosSucos
            : categoriaSelecionada === "Tortas"
            ? produtosTortas
            : categoriaSelecionada === "Todos"
            ? [...produtos].sort((a, b) => a.nome.localeCompare(b.nome))
            : []
          ) // aqui você pode adicionar outros arrays de produtos para Pães, Tortas, Sucos
            .map((prod) => (
              <div
                key={prod.idProduto}
                className="w-full sm:w-[30%] lg:w-[30%] flex gap-4 border-2 items-center border-[#3a3737fb] p-2 rounded-3xl hover:scale-[102%] hover:transition-transform duration-700 bg-[#e48f0525]"
              >
                <img src={`${prod.imagem}`} alt={prod.nome} className="bg-gray-200 w-[58%] h-40 rounded-2xl"/>
                <div className="flex flex-col w-full gap-4">
                    <div>
                    <p className="font-semibold text-[#E38E00] text-[1.2rem]">{prod.nome}</p>
                    <p className="flex items-start font-semibold text-gray-900 w-full">
                      <span className="text-sm mt-[4px] mr-1">R$</span>
                      <span className="text-4xl leading-none">{Math.floor(prod.preco)}</span>
                      <span className="text-4xl leading-none">,</span>
                      <span className="text-lg mt-[2px]">{prod.preco.toFixed(2).split(".")[1]}</span>
                    </p>

                  </div>
                  <div className="flex w-full gap-1 justify-center">
                    <div className="flex gap-1 items-center">
                    <button onClick={() => decrementar(prod.idProduto)} className=" w-6 h-6 hover:bg-[#67400c44] rounded-2xl text-white flex justify-center items-center"><FontAwesomeIcon color="red" icon={faTrash} /></button>
                      <span className="border-[1.5px] rounded w-10 text-center font-bold"> {quantidades[prod.idProduto] || 0}</span>
                      <button onClick={() => incrementar(prod.idProduto)} className="w-6 h-6 font-extrabold hover:bg-[#67400c44] rounded-2xl  flex justify-center items-center"><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                  </div>
                  <button onClick={() => {adicionarAoCarrinho(prod, quantidades[prod.idProduto]); handleMessage(quantidades[prod.idProduto])}} className="w-[90%] cursor-pointer rounded font-semibold text-[1rem] border-2 border-amber-700 hover:bg-amber-700 hover:text-[#FFFF] text-center p-1">
                    <span>Adicionar</span> <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
              </div>
            ))}
        </article>
      </div>
        {toastVisible && (
            <div className={`w-[18%] p-2 bg-[#fe9800b3] border-l-4 border-[#FE9A00] fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <p className="text-white font-extralight text-center">Item Adicionado ao Carrinho</p>
            </div>
            )}
    </section>
  );
}
