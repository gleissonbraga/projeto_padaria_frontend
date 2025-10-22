import { faBarsProgress, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../api/api";
import Modal from "../../../modal/Modal";

export default function ProdutosAdmin() {
    const [produtos, setProdutos] = useState([{ idProduto: 0, nome: "", preco: 0, quantidade: 0, imagem: "", nomeCategoria: ""}])
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [error, setError] = useState({ message: "" })
    const [form, setForm] = useState({ nomeCategoria: "" })
    const [formUpdate, setFormUpdate] = useState({ Id: 0, NomeCategoria: "" })
    const [id, setId] = useState(0)
    const [toastVisible, setToastVisible] = useState(false)
    const [toastVisibleDeleted, setToastVisibleDeleted] = useState(false)
    const [toastVisibleUpdate, setToastVisibleUpdate] = useState(false)

    const modalAbrirCadastro = () => setAbrirModalCadastro(true)
    const modalFecharCadastro = () => setAbrirModalCadastro(false)

    const modalAbrirEditar = () => setAbrirModalEditar(true);
    const modalFecharEditar = () => setAbrirModalEditar(false);

    const modalAbrirExcluir = () => setAbrirModalExcluir(true);
    const modalFecharExcluir = () => setAbrirModalExcluir(false);

    const handleMessage = () => {

        if (error.message.length > 0) {
            setToastVisible(true)
        }

        setTimeout(() => {
            setToastVisible(false)
        }, 6000)
    }

    const handleMessageDelete = () => {

        if (id > 0) {
            setToastVisibleDeleted(true)
        }

        setTimeout(() => {
            setToastVisibleDeleted(false)
        }, 6000)
    }

    const handleMessageUpdate = () => {

        if (id == 0) {
            setToastVisibleUpdate(true)
        }

        setTimeout(() => {
            setToastVisibleUpdate(false)
        }, 6000)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeUpdate = (e) => {
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
};

    const handleSubmit = async () => {
        if (!form.nomeCategoria) {
            setError({ message: "Insira um nome para a categoria" })
            return
        }
        try {
            await apiClient.post("/produtos/ativos", { NomeCategoria: form.nomeCategoria });
            handleMessage()
            modalFecharCadastro()
            setForm({ nomeCategoria: "" })
            setError({ message: "" })
            await fetchCategorias();
        } catch (error) {
            setError({ message: "Está categoria já existe!" })
        }
    };

    const handleDelete = async () => {
        console.log(id, "existe ID")
        try {
            if (id > 0) {
                await apiClient.delete(`/categorias/${id}`);
                setId(0)
                handleMessageDelete()
                modalFecharExcluir()
                await fetchCategorias();
            }
        } catch (error) {
            setError({ message: "Está categoria já existe!" })
        }
    };

        const handleUpdate = async () => {
        if (!formUpdate.NomeCategoria) {
            setError({ message: "Insira um nome para a categoria" })
            return
        }
        try {
            await apiClient.put(`/categorias/${formUpdate.Id}`, { NomeCategoria: formUpdate.NomeCategoria });
            handleMessageUpdate()
            modalFecharEditar()
            setFormUpdate({ Id: 0, NomeCategoria: "" })
            setError({ message: "" })
            await fetchCategorias();
        } catch (error) {
            setError({ message: "Está categoria já existe!" })
        }
    };

    const fetchProdutos = useCallback(async () => {
        try {
            const response = await apiClient.get("/produtos/ativos");
            const sortedData = response.data.sort((a, b) => a.idProduto - b.idProduto);
            setProdutos(sortedData)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchProdutos()
    }, [fetchProdutos])

    return (
        <section className="w-full flex justify-center pt-12">
            <div className="w-[90%] rounded-2xl mb-6 shadow-2xl flex flex-col border-[1px] border-[#4A43CF]">
                <div className="w-full bg-[#4A43CF] h-12 rounded-t-2xl p-2">
                    <h3 className="text-2xl font-semibold text-white pl-4 flex gap-4">
                        <span><FontAwesomeIcon icon={faBarsProgress} /></span>
                        <span>Cadastro Produtos</span>
                    </h3>
                </div>
                <div className="w-full p-6">
                    <button onClick={modalAbrirCadastro} className="
                    px-3 border-2 border-[#000000] bg-[#000000bd] text-white rounded cursor-pointer
                     hover:bg-[#000000] hover:scale-[104%] transform transition delay-100">
                        <FontAwesomeIcon icon={faPlus} /> Adcionar
                    </button>
                </div>
                <div className="w-full flex justify-center mb-10">
                    <div className="min-w-[60%] rounded border-[1px] border-black">
                        <table className="w-full table-auto border-collapse">
                            <thead className="text-left text-white bg-[#123f729c]">
                                <tr className="">
                                    <th className="p-2">
                                        Imagem
                                    </th>
                                    <th className="p-2">
                                        Código
                                    </th>
                                    <th className="p-2">
                                        Data
                                    </th>
                                    <th className="p-2">
                                        Nome
                                    </th>
                                    <th className="p-2">
                                        Preço
                                    </th>
                                    <th className="p-2">
                                        Quantidade
                                    </th>
                                    <th className="p-2">
                                        Categoria
                                    </th>
                                    <th className="p-2">
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="w-full rounded-2xl">
                                {produtos.map((prod) => (
                                    <tr className="hover:bg-gray-200 h-8 border-b-[1px] border-gray-200" key={prod.idProduto}>
                                        <td className="pl-4">
                                            <img src={`/images/produtos/${prod.imagem}`} alt="" className="w-20 h-20"/>
                                        </td>
                                        <td className="pl-4">{prod.idProduto}</td>
                                        <td className="pl-4">{prod.data}</td>
                                        <td className="pl-2">{prod.nome}</td>
                                        <td className="pl-2">{prod.preco}</td>
                                        <td className="pl-2">{prod.quantidade}</td>
                                        <td className="pl-2">{prod.nomeCategoria}</td>
                                        <td className="pl-2 flex gap-2 justify-center items-center">
                                            <button onClick={() => { modalAbrirEditar(); setFormUpdate({ Id: prod.idProduto, NomeCategoria: prod.nomeCategoria }) }} className="text-blue-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faEdit} /></button>

                                            <button onClick={() => { modalAbrirExcluir(); setId(prod.idProduto) }} className="text-red-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal onConfirm={() => handleSubmit()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Cadastro" aberto={abrirModalCadastro} FecharModal={modalFecharCadastro}>
                <form action="" className="flex justify-center gap-2 p-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-semibold">Código</label>
                        <input type="text" disabled placeholder="Novo" className="bg-gray-300 p-1 rounded outline-none focus:outline-none focus:ring-0" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-semibold">Nome Categoria</label>
                        <input id="nomeCategoria" type="text" value={form.nomeCategoria} name="nomeCategoria" onChange={handleChange}
                        className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                        {error.message.length > 0 && (
                            <div>{error.message}</div>
                        )}
                    </div>
                </form>
            </Modal>

            <Modal onConfirm={() => handleUpdate()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Editar"
                aberto={abrirModalEditar} FecharModal={modalFecharEditar}>
                <form action="" className="flex justify-center gap-2 p-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-semibold">Código</label>
                        <input type="text" disabled value={formUpdate.Id} className="bg-gray-300 p-1 rounded outline-none focus:outline-none focus:ring-0" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-semibold">Nome Categoria</label>
                        <input id="NomeCategoria" type="text" value={formUpdate.NomeCategoria} name="NomeCategoria" 
                        onChange={handleChangeUpdate}
                            className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                        {error.message.length > 0 && (
                            <div>{error.message}</div>
                        )}
                    </div>
                   
                </form>
            </Modal>

            <Modal onConfirm={() => handleDelete()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Atenção" aberto={abrirModalExcluir} FecharModal={modalFecharExcluir}>
                <p className="w-[50%] text-center font-semibold">Deseja excluir esta categoria?</p>
            </Modal>

            {toastVisible && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Categoria cadastrada com sucesso!</p>
                </div>
            )}
            {toastVisibleDeleted && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleDeleted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Categoria excluida com sucesso!</p>
                </div>
            )}
            {toastVisibleUpdate && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleUpdate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Categoria atualizada com sucesso!</p>
                </div>
            )}
        </section>
    )
}