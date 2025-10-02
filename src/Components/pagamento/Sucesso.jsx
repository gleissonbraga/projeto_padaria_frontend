import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function Sucesso(){
    const [pedido, setPedido] = useState();
    const router = useLocation()
    const query = new URLSearchParams(location.search)

    const paymentId = query.get("payment_id");
    const status = query.get("status");
    const preferenceId = query.get("preference_id");

    useEffect(async () => {
        if(status == "approved"){
            const response = await apiClient.post(`pagamento/sucesso/${preferenceId}/${paymentId}`)
            const responsePedido = await apiClient.get(`pedidos/aprovado/${preferenceId}`)

            setPedido(responsePedido.data)
        }
    }, [])

    return (
        <div>
            <h2>Pagamento {status == "approved" ? "Aprovado" : "Aprovado"}</h2>
            <p>Numero do Pedido {pedido.codigoPedido}</p>
            <p>Data {pedido.dataPedido}</p>
            <p>Valor {pedido.valorTotal}</p>
            <p>Chave {pedido.chave}</p>
        </div>
    )
}