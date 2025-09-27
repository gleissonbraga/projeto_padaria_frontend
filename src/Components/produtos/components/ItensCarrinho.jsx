import useCarrinho from "../../../hooks/useCarrinho"

export default function ItensCarrinho(){

    const {atualizarQuantidade, limparCarrinho, removerDoCarrinho, valorTotal, produtoNoCarrinho, itens, obterQuantidade} = useCarrinho()

    return (
        <table>
            <tbody>
                {itens.map((prod) => (
                    <tr key={prod.idProduto}>
                        <td>{prod.nome}</td>
                        <td>{prod.quantidade}</td>
                        <td>{prod.preco}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}