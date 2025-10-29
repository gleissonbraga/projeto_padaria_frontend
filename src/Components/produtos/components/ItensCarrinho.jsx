import { useState } from "react";
import useCarrinho from "../../../hooks/useCarrinho"
import Modal from "../../modal/Modal";
import DadosPessoa from "../../pagamento/DadosPessoa";
import { useCarrinhoContext } from "../../../context/CarrinhoContext";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ItensCarrinho(){
    const {inserirQuantidadeCarrinho, limparCarrinho, removerDoCarrinho, removerProdutoCompleto, valorTotal, produtoNoCarrinho, itens} = useCarrinhoContext()

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className={`flex flex-col  gap-2 w-full sm:w-[68%] shadow rounded items-center ${itens.length > 4 ? "overflow-y-scroll overscroll-contain max-h-[400px]" : ""}`}>
                {itens.length > 0 ? (
                    <>
                {itens.map((prod) => (
                <div className="w-[98%] flex gap-2 border-b-[1px] border-[#48271d63] p-2" key={prod.idProduto}>
                    <div className="w-[20%]">
                        <img src={`${prod.imagem}`} alt={prod.nome} className="rounded" />
                    </div>
                    <div className="w-[50%] flex flex-col gap-2">
                        <h4 className="font-bold">{prod.nome}</h4>
                        <div className="flex gap-1 items-center">
                            <button onClick={() => removerDoCarrinho(prod.idProduto)} className=" w-6 h-6 hover:bg-[#67400c44] rounded-2xl text-white flex justify-center items-center"><FontAwesomeIcon color="red" icon={faTrash} /></button>
                           <span className="border-[1.5px] rounded w-10 text-center font-bold">{prod.quantidade}</span>
                            <button onClick={() => inserirQuantidadeCarrinho(prod.idProduto)} className="w-6 h-6 font-extrabold hover:bg-[#67400c44] rounded-2xl  flex justify-center items-center"><FontAwesomeIcon icon={faPlus}/></button>
                        </div>
                        <button className="text-start text-[#48271d] hover:underline cursor-pointer text-[0.8rem]" 
                        onClick={() => removerProdutoCompleto(prod.idProduto)}>Excluir</button>
                    </div>
                    <div className="w-[28%] flex flex-col gap-4">
                        <p className="flex items-start font-semibold text-gray-900 w-full">
                        <span className="text-sm mt-[4px] mr-1">R$</span>
                        <span className="text-2xl leading-none">{Math.floor(prod.preco)}</span>
                        <span className="text-2xl leading-none">,</span>
                        <span className="text-sm">{prod.preco.toFixed(2).split(".")[1]}</span>
                        </p>

                        <p className="flex items-start font-semibold text-gray-900 w-full">
                        <span className="text-sm mt-[4px] mr-1">R$</span>
                        <span className="text-2xl leading-none">{Math.floor(prod.preco * prod.quantidade)}</span>
                        <span className="text-2xl leading-none">,</span>
                        <span className="text-sm">{(prod.preco * prod.quantidade).toFixed(2).split(".")[1]}</span>
                        </p>
                    </div>
                </div>
                ))}
                </>
                ) : 
                (
                    <div className="flex justify-center items-center h-full">
                        <p>Seu carrinho está vazio.</p>
                    </div>
                )}
            </div>
            <div className="w-full sm:w-[28%] h-10 sm:h-50 shadow p-2 flex sm:flex-col justify-between rounded" >
                <h4 className="font-bold text-[1.2rem] hidden sm:flex">Resumo da Compra</h4>
                 {/* <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="CUPOM"
                        className="w-[48%] border border-gray-300 rounded-lg p-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="hover:bg-[#c78b59] border-2 border-[#c78b59] hover:text-white text-black p-0.5 rounded-lg transition cursor-pointer w-[40%]"
                    >
                        Aplicar
                    </button>
                </div> */}
                <div className="flex gap-2 sm:gap-0 justify-between font-bold">
                    <p className="font-semibold text-[1.2rem]">Total</p>
                    <p className="flex items-start font-semibold text-gray-900">
                        <span className="text-sm mt-[4px] mr-1">R$</span>
                        <span className="text-2xl leading-none">{Math.floor(valorTotal)}</span>
                        <span className="text-2xl leading-none">,</span>
                        <span className="text-sm">{valorTotal.toFixed(2).split(".")[1]}</span>
                    </p>
                </div>
                <div className="text-center">
                    <button onClick={() => limparCarrinho()} className="hover:underline p-1 rounded text-red-600 w-full sm:w-[90%] cursor-pointer">
                        Limpar Carrinho
                    </button>
                </div>
            </div>            
        </div>

    )
}