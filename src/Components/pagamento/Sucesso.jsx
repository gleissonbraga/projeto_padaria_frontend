import { useEffect, useState } from "react";
import apiClient from "../../api/api";

export default function Sucesso(){
    const [pedido, setPedido] = useState({});
    const query = new URLSearchParams(location.search)

    const paymentId = query.get("payment_id");
    const status = query.get("status");
    const preferenceId = query.get("preference_id");
console.log(paymentId)

  useEffect(() => {
    const fetchData = async () => {
        if (status === "approved" && preferenceId) {
            try {
                // await apiClient.post(`pagamento/sucesso/${preferenceId}/${paymentId}`);
                const responsePedido = await apiClient.get(`pedidos/aprovado/${preferenceId}`);
                setPedido(responsePedido.data)
            } catch (error) {
                console.error("Erro ao buscar pedido:", error);
            }
        }
    };

    fetchData();
}, []);

    return (
        <section className="pt-60 h-full bg-[#865439] pb-6 justify-center flex">
            <div className="bg-white w-[60%] flex flex-col items-center rounded-2xl">
                <div className="w-full bg-[#48271D] flex flex-col items-center p-12 rounded-t-2xl gap-2">
                    <img src="/images/confirm.svg" alt="" className="w-12 h-12"/>
                    <h1 className="font-extrabold text-white text-4xl">Pedido **Confirmado!**</h1>
                    <p className="text-[1.1rem] text-[#C8A78E]">Sua compra foi realizada com sucesso.</p>
                </div>
                <div className="w-full p-8 flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Detalhes Principais</h2>
                    <div className="flex gap-2 w-full">
                        <div className="flex flex-col gap-1 w-[33%] bg-[#F9FAFB] rounded-2xl p-1.5">
                            <p className="uppercase text-[#6B85B3]">Número do Pedido</p>
                            <span className="text-[#C78B59] font-bold text-[1.3rem]">#{pedido.codigoPedido}</span>
                        </div>
                        <div className="flex flex-col gap-1 w-[33%] bg-[#F9FAFB] rounded-2xl p-1.5">
                            <p className="uppercase text-[#6B85B3]">Data da Compra</p>
                            <span className="text-[#374151]">{new Date(pedido.dataPedido).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                        </div>
                        <div className="flex flex-col gap-1 w-[33%] bg-[#F9FAFB] rounded-2xl p-1.5">
                            <p className="uppercase text-[#6B85B3]">Chave para retirada</p>
                            <span className="text-[#865439] font-bold">{pedido.chave}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">Itens de Compra</h2>
                        {pedido.produtos?.map((produto) => (
                            <div key={produto.idProduto} className=" border-[0.8px] border-[#E5E7EB] rounded-lg hover:bg-[#ffddbd3f]">
                            <div className="flex justify-between p-3">
                                <div className="w-[70%]">
                                    <p className="text-[1rem]">{produto.nome}</p>
                                    <p className="text-[0.8rem] font-extralight">Qtd: {produto.quantidade}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[1.1rem]">R$ {(produto.quantidade * produto.preco).toFixed(2).replace(".", ",")}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">Resumo Financeiro</h2>
                        <div className="flex justify-between">
                            <div>
                                <p>Subtotal ({pedido.produtos?.length || 0} itens)</p>
                            </div>
                            <div>
                                <p>R$ {(pedido.valorTotal ?? 0).toFixed(2).replace(".", ",")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 justify-between">
                        <p className="font-bold text-[1.3rem]">Total Pago</p>
                        <span className="text-2xl font-bold text-[#865439]">R$ {(pedido.valorTotal ?? 0).toFixed(2).replace(".", ",")}</span>
                    </div>
                </div>
                <aside className="flex flex-col p-4 gap-3 items-center">
                    <p className="font-extralight">Enviamos a confirmação e dados do pedido para o whatsapp: <span className=" text-[#D18B59] hover:underline">{pedido.contato}</span></p>
                    <button className="bg-[#C78B59] text-white hover:bg-[#865439] w-[50%] h-10 rounded-full cursor-pointer flex items-center justify-center gap-1"> <img src="/images/download.svg" alt="" />Baixar Comprovante</button>
                </aside>
            </div>
        </section>
    )
}