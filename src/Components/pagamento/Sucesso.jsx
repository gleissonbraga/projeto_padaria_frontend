import { useEffect, useState } from "react";
import apiClient from "../../api/api";

export default function Sucesso(){
    const [pedido, setPedido] = useState({
        
    nomePessoa: "Gleisson",
    contato: "999303193",
    dataRetirada: "2025-10-22",
    horaRetirada: "01:32:00",
    produtos: [
        {
            idProduto: 3,
            nome: "Pastel",
            preco: 9.00,
            quantidade: 1,
            imagem: null,
            status: "ATIVO",
            categoria: null
        },
        {
            idProduto: 4,
            nome: "Quindim",
            preco: 12,
            quantidade: 1,
            imagem: null,
            status: "ATIVO",
            categoria: null
        }
    ],
    codigoPedido: 21,
    dataPedido: "2025-10-02T01:28:10.04339Z",
    valorTotal: 21.00,
    chave: null,
    status: "PENDENTE"
    });
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
                // const responsePedido = await apiClient.get(`pedidos/aprovado/${preferenceId}`);
                // setPedido(responsePedido.data)
            } catch (error) {
                console.error("Erro ao buscar pedido:", error);
            }
        }
    };

    fetchData();
}, []);

    return (
        <div className="pt-60 h-full">
            <h2>Pagamento {status == "approved" ? "Aprovado" : "Aprovado"}</h2>
            <p>Numero do Pedido {pedido.codigoPedido}</p>
            <p>Data {pedido.dataPedido}</p>
            <p>Valor {pedido.valorTotal}</p>
            <p>Chave {pedido.chave}</p>
        </div>
    )
}