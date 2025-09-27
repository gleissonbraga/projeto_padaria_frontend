import { useState } from "react";
import { Link} from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useCarrinhoContext } from "../../context/CarrinhoContext";
import Modal from "../modal/Modal";
import ItensCarrinho from "../produtos/components/ItensCarrinho";

export default function navbar() {
  const [select, setSelect] = useState("")
  const {qtdProdutosDiferentes, } = useCarrinhoContext();
  const [abrirModal, setAbrirModal] = useState(false);

  const modalAbrir = () => setAbrirModal(true);
  const modalFechar = () => setAbrirModal(false);


  return (
    <nav className="flex bg-[#ffddbd] h-50  flex-row justify-evenly items-center fixed w-full z-50 mt-6">
      <div className="flex items-start">
        <img src="/images/image.png" alt="Logo" className="h-40 w-60" />
      </div>
      <div className="flex flex-col-reverse gap-6">
          <div className="border-t-2 p-2 border-[#48271d] ">
        <ul className="flex gap-6 h-10 text-2xl text-[#48271d] font-bold">
          <li 
            onClick={() => setSelect("Inicio")}
            className={
              `hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded
              ${select === "Inicio" ? "border-b-4 text-[#5d5d5d] border-amber-500 rounded" : ""}`}>
            <Link to="/">Inicio</Link>
          </li>
          <li
          onClick={() => setSelect("Produtos")}
           className={
              `hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded
              ${select === "Produtos" ? "border-b-4 text-[#5d5d5d] border-amber-500 rounded" : ""}`}>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li
          onClick={() => setSelect("Sobre Nós")} 
          className={
              `hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded
              ${select === "Sobre Nós" ? "border-b-4 text-[#5d5d5d] border-amber-500 rounded" : ""}`}>
            <a href="#" rel="noopener noreferrer">
              Sobre Nós
            </a>
          </li>
          <li
          onClick={() => setSelect("Contato")}  
          className={
              `hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded cursor-pointer
              ${select === "Contato" ? "border-b-4 text-[#5d5d5d] border-amber-500 rounded" : ""}`}>
            <ScrollLink  to="contato" smooth={true} duration={600} offset={-80}>Contato</ScrollLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-end gap-4 items-center p-4 w-50%">
        <div className="">
          <div className="flex flex-col text-[#48271d] text-sm font-bold">
            <span className="font-semibold font-poppins text-[1rem]">
              {" "}
              51 99930-3193
            </span>
            <span className="font-semibold font-poppins text-[1rem]">
              {" "}
              51 3333-3333
            </span>
          </div>
        </div>
          <div className="flex">
             <button onClick={modalAbrir} className="cursor-pointer">
              <div
                className={`w-6 h-6 bg-red-600 rounded-4xl relative top-3 left-5 text-center text-white font-semibold ${
                  qtdProdutosDiferentes == 0 ? "hidden" : ""
                }`}
              >
                {qtdProdutosDiferentes}
              </div>
             
              <img
                src="/images/cart-bakery.svg"
                alt="cart"
                className="h-8 w-8 text-[#48271d]"
              />
              </button>
          </div>
      </div>
      </div>
      <Modal Titulo="Meu Carrinho" aberto={abrirModal} FecharModal={modalFechar} Carrinho={true}>
        <ItensCarrinho/>
      </Modal>
    </nav>
  );
}
