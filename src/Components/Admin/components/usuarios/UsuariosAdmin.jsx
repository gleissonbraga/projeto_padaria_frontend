
import { faBarsProgress, faEdit, faEye, faEyeSlash, faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../api/api";
import Modal from "../../../modal/Modal";

export default function UsuariosAdmin() {
    const [usuarios, setUsuarios] = useState([{ idUsuario: 0, nome: "", email: "", admin: 0, password: 0, status: "" }])
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [error, setError] = useState({ message: "" })
    const [errorEmail, setErrorEmail] = useState({ message: "" })
    const [errorSenha, setErrorSenha] = useState({ message: "" })
    const [form, setForm] = useState({ nome: "", email: "", admin: 1, password: "", confirmarSenha: "", status: "" })
    const [formUpdate, setFormUpdate] = useState({ idUsuario: 0, nome: "", email: "", admin: 0, password: "", confirmarSenha: "", status: "" })
    const [id, setId] = useState(0)
    const [toastVisible, setToastVisible] = useState(false)
    const [toastVisibleDeleted, setToastVisibleDeleted] = useState(false)
    const [toastVisibleUpdate, setToastVisibleUpdate] = useState(false)
    const [input, setInput] = useState("password")

    const modalAbrirCadastro = () => setAbrirModalCadastro(true)
    const modalFecharCadastro = () => {
        setAbrirModalCadastro(false)
        setError({ message: "" })
        setErrorEmail({ message: "" })
        setErrorSenha({ message: "" })
    }

    const modalAbrirEditar = () => setAbrirModalEditar(true);
    const modalFecharEditar = () => 
    {
        setAbrirModalEditar(false);
        setError({ message: "" })
        setErrorEmail({ message: "" })
        setErrorSenha({ message: "" })
    }

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
        setError({ message: "" })
        setErrorEmail({ message: "" })
        setErrorSenha({ message: "" })
        if (!form.nome || !form.email || !form.password || !form.confirmarSenha) {
            setError({ message: form.nome ? "" : "Insira o nome" })
            setErrorEmail({ message: form.email ? "" : "Insira o email" })
            setErrorSenha({ message: form.password || form.confirmarSenha ? "" : "Insira a Senha!" })
            return
        }
        else if (form.password != form.confirmarSenha) {
            setErrorSenha({ message: "As senha estão incorretas" })
            return
        }

        try {
            await apiClient.post("/usuarios", { Nome: form.nome, Email: form.email, Senha: form.password, Admin: form.admin });
            handleMessage()
            modalFecharCadastro()
            setForm({ nome: "", email: "", password: "", admin: 1, confirmarSenha: "" })
            setError({ message: "" })
            setErrorEmail({ message: "" })
            setErrorSenha({ message: "" })
            await fetchUsuarios()
        } catch (error) {
            setError({ message: "Este Usuário já existe!" })
        }
    };

    const handleDelete = async () => {
        try {
            if (id > 0) {
                await apiClient.delete(`/usuarios/${id}`);
                setId(0)
                handleMessageDelete()
                modalFecharExcluir()
                await fetchUsuarios()
            }
        } catch (error) {
            setError({ message: "Este produto não existe!" })
        }
    };

    const handleUpdate = async () => {
        setError({ message: "" })
        setErrorEmail({ message: "" })
        setErrorSenha({ message: "" })
        if (!formUpdate.nome || !formUpdate.email) {
            setError({ message: formUpdate.nome ? "" : "Insira o nome" })
            setErrorEmail({ message: formUpdate.email ? "" : "Insira o email" })
            return
        }
        else if (formUpdate.password != formUpdate.confirmarSenha) {
            setErrorSenha({ message: "As senha estão incorretas" })
            return
        }

        try {
            if(formUpdate.password == undefined) formUpdate.password = ""
            await apiClient.put(`/usuarios/${formUpdate.idUsuario}`, { Nome: formUpdate.nome, Email: formUpdate.email, Senha: formUpdate.password, Admin: formUpdate.admin, Status: formUpdate.status })
            handleMessageUpdate()
            modalFecharEditar()
            setFormUpdate({ nome: "", email: "", password: "", admin: 0, confirmarSenha: "", status: "" })
            setError({ message: "" })
            setErrorEmail({ message: "" })
            setErrorSenha({ message: "" })
            await fetchUsuarios()
        } catch (error) {
            setError({ message: "Este usuário não existe!" })
        }
    };

    const fetchUsuarios = useCallback(async () => {
        try {
            const response = await apiClient.get("/usuarios/ativos");
            const sortedData = response.data.sort((a, b) => a.idUsuario - b.idUsuario);
            setUsuarios(sortedData)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchUsuarios()
    }, [fetchUsuarios])

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
                                        Código
                                    </th>
                                    <th className="p-2">
                                        Nome
                                    </th>
                                    <th className="p-2">
                                        Email
                                    </th>
                                    <th className="p-2">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className="w-full rounded-2xl">
                                {usuarios.map((user) => (
                                    <tr className="hover:bg-gray-200 h-8 border-b-[1px] border-gray-200" key={user.idUsuario}>
                                        <td className="pl-4">{user.idUsuario}</td>
                                        <td className="pl-2">{user.nome}</td>
                                        <td className="pl-2">{user.email}</td>
                                        <td className="p-2">
                                            <button onClick={() => { modalAbrirEditar(); setFormUpdate({ idUsuario: user.idUsuario, nome: user.nome, email: user.email, admin: user.admin, status: user.status }) }} className="text-blue-500 cursor-pointer hover:scale-[106%] mr-2"><FontAwesomeIcon icon={faEdit} /></button>

                                            <button onClick={() => { modalAbrirExcluir(); setId(user.idUsuario) }} className="text-red-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faTrash} /></button>
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
                            <label htmlFor="" className="font-semibold">Nome Usuário</label>
                            <input id="nome" type="text" value={form.nome} name="nome" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {error.message.length > 0 && (
                                <div className="text-red-500 text-sm">{error.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 w-[76%]">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Email</label>
                            <input id="email" type="email" value={form.email} name="email" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 
                                ${errorEmail.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {errorEmail.message.length > 0 && (
                                <div className="text-red-500 text-sm">{errorEmail.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Senha</label>
                            <div className="flex">
                                <input id="password" type={input} value={form.password} name="password" onChange={handleChange}
                                    className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${errorSenha.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                                <span onMouseDown={() => setInput("text")} onMouseUp={() => setInput("password")}
                                    className="hover:bg-gray-200 rounded flex justify-center items-center p-1 cursor-pointer">
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Confirmar Senha</label>
                            <input id="confirmarSenha" type="Password" name="confirmarSenha" onChange={handleChange}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${errorSenha.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                        </div>
                    </div>
                    {errorSenha.message.length > 0 && (
                        <div className="text-red-500 text-sm">{errorSenha.message}</div>
                    )}
                    <div className=" flex items-center gap-3 mt-4 flex-col">
                        <label className="font-semibold">Admin</label>
                        <button
                            type="button"
                            onClick={() =>
                                setForm({
                                    ...form,
                                    admin: form.admin == 1 ? 0 : 1,
                                })
                            }
                            className={`cursor-pointer relative w-16 h-7 rounded-full transition-colors duration-300 ${form.admin == 1 ? "bg-green-500" : "bg-red-400"
                                }`}
                        >
                            <span className={`
                                    text-[10px] flex items-center font-bold text-white 
                                    ${form.admin == 1 ? "justify-left  pl-2" : "justify-end  pr-2"}`}>{form.admin == 1 ? "SIM" : "NÃO"}</span>
                            <span
                                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${form.admin == 1 ? "translate-x-9" : "translate-x-0"
                                    }`}
                            />
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal onConfirm={() => handleUpdate()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Editar"
                aberto={abrirModalEditar} FecharModal={modalFecharEditar}>
                <form action="" className="flex flex-col items-center gap-2 p-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Código</label>
                            <input type="text" disabled value={formUpdate.idUsuario} className="bg-gray-300 p-1 rounded outline-none focus:outline-none focus:ring-0" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-semibold">Nome Usuário</label>
                            <input id="nome" type="text" value={formUpdate.nome} name="nome" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${error.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {error.message.length > 0 && (
                                <div className="text-red-500 text-sm">{error.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 w-[76%]">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Email</label>
                            <input id="email" type="email" value={formUpdate.email} name="email" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 
                                ${errorEmail.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                            {errorEmail.message.length > 0 && (
                                <div className="text-red-500 text-sm">{errorEmail.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Senha</label>
                            <div className="flex">
                                <input id="password" type={input} name="password" onChange={handleChangeUpdate}
                                    className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${errorSenha.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                                <span onMouseDown={() => setInput("text")} onMouseUp={() => setInput("password")}
                                    className="hover:bg-gray-200 rounded flex justify-center items-center p-1 cursor-pointer">
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="" className="font-semibold">Confirmar Senha</label>
                            <input id="confirmarSenha" type="Password" name="confirmarSenha" onChange={handleChangeUpdate}
                                className={`p-1 border-b-2 outline-none focus:border-[#4A43CF] focus:shadow-[0_1px_0_0_#4A43CF] transition-all duration-200 ${errorSenha.message.length > 0 ? "border-red-500 focus:ring-red-500 shadow-red-300 shadow" : "border-[#d2d2d2]"}`} />
                        </div>
                    </div>
                    {errorSenha.message.length > 0 && (
                        <div className="text-red-500 text-sm">{errorSenha.message}</div>
                    )}
                    <div className="flex gap-8">
                        <div className=" flex items-center gap-3 mt-4 flex-col">
                            <label className="font-semibold">Admin</label>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormUpdate({
                                        ...formUpdate,
                                        admin: formUpdate.admin == 1 ? 0 : 1,
                                    })
                                }
                                className={`cursor-pointer relative w-16 h-7 rounded-full transition-colors duration-300 ${formUpdate.admin == 1 ? "bg-green-500" : "bg-red-400"
                                    }`}
                            >
                                <span className={`
                                    text-[10px] flex items-center font-bold text-white 
                                    ${formUpdate.admin == 1 ? "justify-left  pl-2" : "justify-end  pr-2"}`}>{formUpdate.admin == 1 ? "SIM" : "NÃO"}</span>
                                <span
                                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${formUpdate.admin == 1 ? "translate-x-9" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                        <div className=" flex items-center gap-3 mt-4 flex-col">
                            <label className="font-semibold">Status</label>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormUpdate({
                                        ...formUpdate,
                                        status: formUpdate.status === "ATIVO" ? "INATIVO" : "ATIVO",
                                    })
                                }
                                className={`cursor-pointer relative w-20 h-7 rounded-full transition-colors duration-300 ${formUpdate.status == "ATIVO" ? "bg-green-500" : "bg-red-400"
                                    }`}
                            >
                                <span className={`text-[10px] flex items-center font-bold text-white ${formUpdate.status == "ATIVO" ? "justify-left  pl-2" : "justify-end  pr-2"}`}>{formUpdate.status == "ATIVO" ? "ATIVO" : "INATIVO"}</span>
                                <span
                                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${formUpdate.status == "ATIVO" ? "translate-x-12" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                </form>
            </Modal>

            <Modal onConfirm={() => handleDelete()} Tamanho="Pequeno" CorModal="bg-[#ffffff]" CorTexto="#000000" CorLinha="#000000" Titulo="Atenção" aberto={abrirModalExcluir} FecharModal={modalFecharExcluir}>
                <p className="w-[50%] text-center font-semibold">Deseja excluir esta categoria?</p>
            </Modal>

            {toastVisible && (
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
            )}
        </section>
    )
}