import { useState } from "react";
import useCarrinho from "../../../hooks/useCarrinho"
import Modal from "../../modal/Modal";
import DadosPessoa from "../../pagamento/DadosPessoa";
import { useCarrinhoContext } from "../../../context/CarrinhoContext";

export default function ItensCarrinho(){
    const {inserirQuantidadeCarrinho, limparCarrinho, removerDoCarrinho, removerProdutoCompleto, valorTotal, produtoNoCarrinho, itens} = useCarrinhoContext()

    return (
        <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-[68%] shadow rounded items-center">
                {itens.map((prod) => (
                <div className="w-[98%] flex gap-2 border-b-[1px] border-[#48271d63] p-2" key={prod.idProduto}>
                    <div className="w-[20%]">
                        <img src={`/images/${prod.imagem}`} alt={prod.nome} className="rounded" />
                    </div>
                    <div className="w-[50%]">
                        <h4 className="font-bold">{prod.nome}</h4>
                        <div className="flex gap-1 items-center">
                            <button onClick={() => removerDoCarrinho(prod.idProduto)} className="bg-red-500 w-4 h-4 text-white rounded hover:bg-red-600 flex justify-center items-center">-</button>
                            <p>{prod.quantidade}</p>
                            <button onClick={() => inserirQuantidadeCarrinho(prod.idProduto)} className="bg-blue-500 w-4 h-4 text-white rounded hover:bg-blue-600 flex justify-center items-center">+</button>
                        </div>
                        <button className=" text-[#48271d] hover:underline cursor-pointer text-[0.8rem]" 
                        onClick={() => removerProdutoCompleto(prod.idProduto)}>Excluir</button>
                    </div>
                    <div className="w-[28%] flex flex-col gap-1">
                        <p>Preço: R$ {prod.preco.toFixed(2)}</p>
                        <p>Total: R$ {(prod.preco * prod.quantidade).toFixed(2)}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="w-[28%] h-50 shadow p-2 flex flex-col justify-between rounded" >
                <h4 className="font-bold text-[1.4rem]">Resumo da Compra</h4>
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
                <div className="flex justify-between font-bold">
                    <p className="font-semibold text-[1.2rem]">Total</p>
                    <p>R$ {valorTotal.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <button onClick={() => limparCarrinho()} className="hover:underline p-1 rounded text-red-600 w-[90%] cursor-pointer">
                        Limpar Carrinho
                    </button>
                </div>
            </div>
        </div>

    )
}