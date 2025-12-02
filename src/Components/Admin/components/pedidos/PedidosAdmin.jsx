
import { faBarsProgress, faCheck, faEdit, faEye, faEyeSlash, faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../api/api";
import Modal from "../../../modal/Modal";

export default function PedidosAdmin() {
    const [pedidos, setPedidos] = useState([{ codigoPedido: "", nomePessoa: "", dataRetirada: "", horaRetirada: "", contato: "", dataPedido: "", valorTotal: 0, chave: "", status: "", produtos: [{ idProduto: 0, nome: "", preco: 0, quantidade: 0, imagem: "" }] }])
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [produtosModal, setprodutosModal] = useState([])
    const [id, setId] = useState(0)
    const [error, setError] = useState("")
    const [chave, setChave] = useState("")
    const [paginaAtual, setPaginaAtual] = useState(1)
    const itensPorPagina = 16

    const modalAbrirCadastro = () => setAbrirModalCadastro(true)
    const modalFecharCadastro = () => setAbrirModalCadastro(false)

    const modalAbrirEditar = () => {
        setAbrirModalEditar(true)
        setError("")
        setChave("")
    };
    const modalFecharEditar = () => setAbrirModalEditar(false);

    const modalAbrirExcluir = () => setAbrirModalExcluir(true);
    const modalFecharExcluir = () => setAbrirModalExcluir(false);

    const handleChange = (e) => {
        setChave(e.target.value);
    };

    const handleConfirm = async () => {
        setError("")
        if (!chave) {
            setError("insira uma chave")
            return
        }

        try {
            await apiClient.patch(`/pedidos/confirmar/entrega/${id}`, { chave: chave })
            modalFecharEditar()
            setId(0)
            setChave("")
            setError("")
            fetchPedidos()
        } catch (error) {
            setError("Chave incorreta!")
        }
    }

    const fetchPedidos = useCallback(async () => {
        try {
            const response = await apiClient.get("/pedidos");
            const sortedData = response.data.sort((a, b) => b.codigoPedido - a.codigoPedido);
            setPedidos(sortedData)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchPedidos()
    }, [fetchPedidos])

    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;

    // Corta o array para exibir somente os itens da página atual
    const pedidosPaginados = pedidos.slice(indexOfFirstItem, indexOfLastItem);

    // Calcula o total de páginas
    const totalPaginas = Math.ceil(pedidos.length / itensPorPagina);

    return (
        <section className="w-full flex justify-center pt-12">
            <div className="w-[90%] rounded-2xl mb-6 shadow-2xl flex flex-col border-[1px] border-[#4A43CF] p-4">
                <div className="overflow-x-auto w-full">
                <table className="rounded-2xl w-full bg-blue-200-100">
                    <thead className="text-left text-white bg-[#123f729c]">
                        <tr className="">
                            <th className="p-2">
                                Emissão
                            </th>
                            <th className="p-2">
                                Pedido
                            </th>
                            <th className="p-2">
                                Pessoa
                            </th>
                            <th className="p-2">
                                Contato
                            </th>
                            <th className="p-2">
                                Data Retirada
                            </th>
                            <th className="p-2">
                                Hora Retirada
                            </th>
                            <th className="p-2">
                                Valor Total
                            </th>
                            <th className="p-2">
                                Status
                            </th>
                            <th className="p-2">
                                Produtos do Pedido
                            </th>
                            <th className="p-2">
                                Confirmar Pedido
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full rounded-2xl">
                        {pedidosPaginados.map((ped) => (
                            <tr key={ped.codigoPedido} className="hover:bg-gray-200 h-8 border-b-[1px] border-gray-200">
                                <th className="text-sm font-[400] p-1">{new Date(ped.dataPedido).toLocaleDateString("pt-BR")}</th>
                                <th className="font-[400] p-2">#{ped.codigoPedido}</th>
                                <th className="font-[400] p-2">{ped.nomePessoa}</th>
                                <th className="font-[400] p-2">{ped.contato}</th>
                                <th className="font-[400] p-2">{new Date(ped.dataRetirada).toLocaleDateString("pt-BR")}</th>
                                <th className="font-[400] p-2">{ped.horaRetirada}</th>
                                <th className="font-[400] p-2">R$ {ped.valorTotal.toFixed(2).replace('.', ',')}</th>
                                <th className="font-[400] p-2">{ped.status}</th>
                                <th>
                                    <button className="hover:underline text-blue-500 text-sm font-medium cursor-pointer" onClick={() => { modalAbrirCadastro(); setprodutosModal(ped.produtos) }}>
                                        Ver Produtos
                                    </button>
                                </th>
                                <th>
                                    {ped.status != "ENTREGUE" ? (
                                        <button className="hover:underline text-blue-500 text-sm font-medium cursor-pointer" onClick={() => { modalAbrirEditar(); setId(ped.codigoPedido) }}>
                                            Confirmar Pedido
                                        </button>
                                    ) : (
                                        <FontAwesomeIcon icon={faCheck} color="green" />
                                    )}
                                </th>
                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>
                <div className="flex justify-center items-center mt-4 gap-2">
                    <button
                        disabled={paginaAtual === 1}
                        onClick={() => setPaginaAtual(paginaAtual - 1)}
                        className={`px-3 py-1 rounded-md border ${paginaAtual === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#4A43CF] text-white hover:bg-[#362fa5]"
                            }`}
                    >
                        Anterior
                    </button>

                    {/* Números das páginas */}
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPaginaAtual(i + 1)}
                            className={`px-3 py-1 rounded-md border ${paginaAtual === i + 1
                                    ? "bg-[#4A43CF] text-white"
                                    : "bg-white text-[#4A43CF] hover:bg-[#dcd9ff]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => setPaginaAtual(paginaAtual + 1)}
                        className={`px-3 py-1 rounded-md border ${paginaAtual === totalPaginas
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#4A43CF] text-white hover:bg-[#362fa5]"
                            }`}
                    >
                        Próximo
                    </button>
                </div>
            </div>

            <Modal Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Produtos" aberto={abrirModalCadastro} FecharModal={modalFecharCadastro}>
                <div className="flex justify-center p-4">
                    <table className="w-[80%] bg-gray-300 rounded-2xl">
                        <thead className="text-left">
                            <tr className=" ">
                                <th className="p-2">
                                    Codigo
                                </th>
                                <th className="p-2">
                                    Nome
                                </th>
                                <th className="p-2">
                                    Quantidade
                                </th>
                                <th className="p-2">
                                    Preço
                                </th>
                            </tr>
                        </thead>
                        <tbody className="w-full rounded-2xl">
                            {produtosModal.map((prod) => (
                                <tr key={prod.idProduto} className="hover:bg-gray-200 h-8 shadow-2xl">

                                    <td className="pl-4">{prod.idProduto}</td>
                                    <td className="pl-2">{prod.nome}</td>
                                    <td className="pl-2">{prod.quantidade}</td>
                                    <td className="pl-2">{prod.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Modal>

            <Modal onConfirm={() => handleConfirm()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Confirmar Entrega"
                aberto={abrirModalEditar} FecharModal={modalFecharEditar}>

                <form action="" className="flex flex-col w-full items-center p-4">
                    <label htmlFor="">Insira a chave</label>
                    <input id="chave"
                        value={chave}
                        onChange={handleChange}
                        type="text"
                        name="chave"
                        className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                    {error.length > 0 && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </form>
            </Modal>

            <Modal onConfirm={() => handleDelete()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Atenção" aberto={abrirModalExcluir} FecharModal={modalFecharExcluir}>

            </Modal>

            {/* {toastVisible && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Usuário cadastrado com sucesso!</p>
                </div>
            )}
            {toastVisibleDeleted && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleDeleted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Usuário excluido com sucesso!</p>
                </div>
            )}
            {toastVisibleUpdate && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleUpdate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Usuário atualizado com sucesso!</p>
                </div>
            )} */}
        </section>
    )
}