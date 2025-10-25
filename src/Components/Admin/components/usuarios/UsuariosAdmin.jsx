
import { faBarsProgress, faEdit, faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../api/api";
import Modal from "../../../modal/Modal";

export default function UsuariosAdmin(){
    const [produtos, setProdutos] = useState([{ idProduto: 0, nome: "", preco: 0, quantidade: 0, imagem: "", nomeCategoria: "", codigoCategoria: 0, Status: "" }])
    const [categorias, setCategorias] = useState([{ codigoCategoria: 0, nomeCategoria: "" }])
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [error, setError] = useState({ message: "" })
    const [errorCat, setErrorCat] = useState({ message: "" })
    const [form, setForm] = useState({ nome: "", preco: 0, quantidade: 0, imagem: "", categoria: 0 })
    const [formUpdate, setFormUpdate] = useState({ idProduto: 0, nome: "", preco: 0, quantidade: 0, imagem: "", codigoCategoria: 0 })
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

    const handleChangeImage = (e) => {
        const { value, files } = e.target

        const fileName = value.split("\\").pop();
        const fileType = files[0].type;
        const fileExtension = fileName.split(".").pop().toLowerCase();
        const validMimeTypes = ["image/jpeg", "image/png"];
        const validExtensions = ["jpeg", "jpg", "png"];

        if (!validMimeTypes.includes(fileType) || !validExtensions.includes(fileExtension)) {
            alert("Envie apenas imagens JPEG ou PNG.");
            e.target.value = "";
            return;
        }

        setForm({ ...form, imagem: fileName });
    }

    const handleChangeUpdate = (e) => {
        setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.nome || !form.categoria) {
            setError({ message: "Insira um nome para o produto." })
            setErrorCat({ message: "Selecione uma categoria." })
            return
        }

        try {
            await apiClient.post("/produtos", { Nome: form.nome, Preco: form.preco, Quantidade: form.quantidade, Imagem: 'imagem.png', Categoria: form.categoria });
            handleMessage()
            modalFecharCadastro()
            setForm({ nome: "", preco: 0, quantidade: 0, imagem: "", categoria: 0 })
            setError({ message: "" })
            await fetchProdutos()
        } catch (error) {
            setError({ message: "Este Produto já existe!" })
        }
    };

    const handleDelete = async () => {
        try {
            if (id > 0) {
                await apiClient.delete(`/produtos/${id}`);
                setId(0)
                handleMessageDelete()
                modalFecharExcluir()
                await fetchProdutos()
            }
        } catch (error) {
            setError({ message: "Este produto não existe!" })
        }
    };

    const handleUpdate = async () => {
        console.log(formUpdate);
        if (!formUpdate.nome || !formUpdate.codigoCategoria) {
            setError({ message: "Insira um nome para o produto." })
            setErrorCat({ message: "Selecione uma categoria." })
            return
        }

        try {
            await apiClient.put(`/produtos/${formUpdate.idProduto}`, { Nome: form.nome, Preco: form.preco, Quantidade: form.quantidade, Imagem: 'imagem.png', Categoria: form.categoria });
            handleMessageUpdate()
            modalFecharEditar()
            setFormUpdate({ nome: "", preco: 0, quantidade: 0, imagem: "", categoria: 0 })
            setError({ message: "" })
            await fetchProdutos()
        } catch (error) {
            setError({ message: "Este produto não existe!" })
        }
    };

    const fetchProdutos = useCallback(async () => {
        try {
            const response = await apiClient.get("/produtos/ativos");
            const sortedData = response.data.sort((a, b) => a.idProduto - b.idProduto);
            console.log(response.data, "CONSOLE DO DATA ")
            setProdutos(sortedData)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const fetchCategorias = useCallback(async () => {
        try {
            const response = await apiClient.get("/categorias");
            const sortedData = response.data.sort((a, b) => a.codigoCategoria - b.codigoCategoria);
            setCategorias(sortedData);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchProdutos()
        fetchCategorias()
    }, [fetchProdutos, fetchCategorias])


    console.log(produtos)
    return (
        <section className="w-full flex justify-center pt-12">
            <div className="w-[90%] rounded-2xl mb-6 shadow-2xl flex flex-col border-[1px] border-[#4A43CF]">
                <div className="w-full bg-[#4A43CF] h-12 rounded-t-2xl p-2">
                    <h3 className="text-2xl font-semibold text-white pl-4 flex gap-4">
                        <span><FontAwesomeIcon icon={faBarsProgress} /></span>
                        <span>Cadastro Usuários</span>
                    </h3>
                </div>
                <div className="w-full p-6">
                    <button onCliitck={modalAbrirCadastro} className="
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
                                            <img src={`/images/produtos/${prod.imagem}`} alt="" className="w-20 h-15" />
                                        </td>
                                        <td className="pl-4">{prod.idProduto}</td>
                                        <td className="pl-2">{prod.nome}</td>
                                        <td className="pl-2">{prod.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td className="pl-2 text-center">{prod.quantidade}</td>
                                        <td className="pl-2">{prod.nomeCategoria}</td>
                                        <td className="pl-2">{prod.Status}</td>
                                        <td className="p-2">
                                            <button onClick={() => 
                                                { modalAbrirEditar(); setFormUpdate({ idProduto: prod.idProduto, nome: prod.nome, preco: prod.preco, quantidade: prod.quantidade, imagem: prod.imagem, codigoCategoria: prod.codigoCategoria}) }} className="text-blue-500 cursor-pointer hover:scale-[106%] mr-2"><FontAwesomeIcon icon={faEdit} /></button>

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
                <form action="" className="flex flex-col items-center gap-2 p-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Código</label>
                            <input type="text" disabled placeholder="Novo" className="bg-gray-300 p-1 rounded outline-none focus:outline-none focus:ring-0" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Nome Produto</label>
                            <input id="nome" type="text" value={form.nome} name="nome" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {error.message.length > 0 && (
                                <div className="text-red-500 text-sm">{error.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Preço</label>
                            <input id="preco" type="number" value={form.preco} name="preco" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200`} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Quantidade</label>
                            <input id="quantidade" type="number" value={form.quantidade} name="quantidade" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 `} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Categoria</label>
                            <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange} className="w-40 p-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm pr-10" placeholder="Selecionar...">
                                <option value="">Selecionar...</option>
                                {categorias.map((cat) => (
                                    <option key={cat.codigoCategoria} value={cat.codigoCategoria} className="">{cat.nomeCategoria}</option>
                                ))}
                            </select>
                            {errorCat.message.length > 0 && (
                                <div className="text-red-500 text-sm">{errorCat.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Foto Produto</label>

                            <div className="flex items-center p-1 rounded-lg border-2 transition-all w-56 duration-200 bg-white 
                                    focus-within:shadow-md border-gray-200 focus-within:border-indigo-500 
                                    focus-within:ring-2 focus-within:ring-indigo-100 gap-2">

                                {/* input real — escondido */}
                                <input
                                    id="file-upload"
                                    type="file"
                                    name="imagem"
                                    onChange={handleChangeImage}
                                    className="hidden"
                                />

                                {/* botão estilizado */}
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex items-center gap-2 
                                    bg-indigo-600 text-white text-sm font-medium 
                                    px-2 py-1 rounded-lg 
                                    shadow-md hover:bg-indigo-700 transition duration-150"
                                >
                                    <FontAwesomeIcon icon={faFile} />
                                    Escolher Arquivo
                                </label>

                                {/* texto mostrando o arquivo */}
                                <span className="text-sm text-gray-500 truncate">
                                    {form.imagem || 'Nenhum arquivo selecionado'}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal onConfirm={() => handleUpdate()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Editar"
                aberto={abrirModalEditar} FecharModal={modalFecharEditar}>
                <form action="" className="flex flex-col items-center gap-2 p-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Código</label>
                            <input type="text" disabled value={formUpdate.idProduto} className="bg-gray-300 p-1 rounded outline-none focus:outline-none focus:ring-0" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Nome Produto</label>
                            <input id="nome" type="text" value={formUpdate.nome} name="nome" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {error.message.length > 0 && (
                                <div className="text-red-500 text-sm">{error.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Preço</label>
                            <input id="preco" type="number" value={formUpdate.preco} name="preco" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200`} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Quantidade</label>
                            <input id="quantidade" type="number" value={formUpdate.quantidade} name="quantidade" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 `} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Categoria</label>
                            <select id="codigoCategoria" name="codigoCategoria" value={formUpdate.codigoCategoria} onChange={handleChangeUpdate} className="w-40 p-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm pr-10" placeholder="Selecionar...">
                                {categorias.map((cat) => (
                                    <option key={cat.codigoCategoria} value={cat.codigoCategoria} className="">{cat.nomeCategoria}</option>
                                ))}
                            </select>
                            {errorCat.message.length > 0 && (
                                <div className="text-red-500 text-sm">{errorCat.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Foto Produto</label>

                            <div className="flex items-center p-1 rounded-lg border-2 transition-all w-56 duration-200 bg-white 
                                    focus-within:shadow-md border-gray-200 focus-within:border-indigo-500 
                                    focus-within:ring-2 focus-within:ring-indigo-100 gap-2">

                                {/* input real — escondido */}
                                <input
                                    id="file-upload"
                                    type="file"
                                    name="imagem"
                                    onChange={handleChangeImage}
                                    className="hidden"
                                />

                                {/* botão estilizado */}
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex items-center gap-2 
                                    bg-indigo-600 text-white text-sm font-medium 
                                    px-2 py-1 rounded-lg 
                                    shadow-md hover:bg-indigo-700 transition duration-150"
                                >
                                    <FontAwesomeIcon icon={faFile} />
                                    Escolher Arquivo
                                </label>

                                {/* texto mostrando o arquivo */}
                                <span className="text-sm text-gray-500 truncate">
                                    {form.imagem || 'Nenhum arquivo selecionado'}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal onConfirm={() => handleDelete()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Atenção" aberto={abrirModalExcluir} FecharModal={modalFecharExcluir}>
                <p className="w-[50%] text-center font-semibold">Deseja excluir esta categoria?</p>
            </Modal>

            {toastVisible && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Produto cadastrado com sucesso!</p>
                </div>
            )}
            {toastVisibleDeleted && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleDeleted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Produto excluido com sucesso!</p>
                </div>
            )}
            {toastVisibleUpdate && (
                <div className={`w-[18%] p-2 bg-green-400 border-l-4 border-green-600 fixed top-4 right-6 transform transition-all duration-1500 ease-in-out ${toastVisibleUpdate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <p className="text-white font-extralight text-center">Produto atualizado com sucesso!</p>
                </div>
            )}
        </section>
    )
}