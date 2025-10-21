import { faBarsProgress, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import apiClient from "../../../../api/api";
import Modal from "../../../modal/Modal";

export default function CategoriaAdmin(){
    const [categorias, setCategorias] = useState([{codigoCategoria: 0, nomeCategoria: ""}])
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false);
    const [abrirModalEditar, setAbrirModalEditar] = useState(false);
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false);

    const modalAbrirCadastro = () => setAbrirModalCadastro(true);
    const modalFecharCadastro = () => setAbrirModalCadastro(false);

    const modalAbrirEditar = () => setAbrirModalEditar(true);
    const modalFecharEditar = () => setAbrirModalEditar(false);

    const modalAbrirExcluir = () => setAbrirModalExcluir(true);
    const modalFecharExcluir = () => setAbrirModalExcluir(false);

    const teste = () => {
        window.alert("Deu certo")
    }

    useEffect(() => {
        const fetchCategorias = async () => {

            try {
                const response = await apiClient.get("/categorias")
                const sortedData = response.data.sort((a, b) => a.codigoCategoria - b.codigoCategoria);
                setCategorias(sortedData)
            } catch (error) {
                console.error(error)
            }
        } 
    fetchCategorias()
    }, [])
    
    return (
        <section className="w-full flex justify-center pt-12">
            <div className="w-[90%] rounded-2xl mb-6 shadow-2xl flex flex-col border-[1px] border-[#4A43CF]">
                <div className="w-full bg-[#4A43CF] h-12 rounded-t-2xl p-2">
                    <h3 className="text-2xl font-semibold text-white pl-4 flex gap-4">
                        <span><FontAwesomeIcon icon={faBarsProgress}/></span>
                        <span>Cadastro Categorias</span>
                    </h3>
                </div>
                <div className="w-full p-6">
                    <button onClick={modalAbrirCadastro} className="
                    px-3 border-2 border-[#000000] bg-[#000000bd] text-white rounded cursor-pointer
                     hover:bg-[#000000] hover:scale-[104%] transform transition delay-100">
                        <FontAwesomeIcon icon={faPlus}/> Adcionar
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
                                        teste
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="w-full rounded-2xl">
                                {categorias.map((cat) => (
                                    <tr className="hover:bg-gray-200 h-8 border-b-[1px] border-gray-200" key={cat.codigoCategoria}>
                                        <td className="pl-4">{cat.codigoCategoria}</td>
                                        <td className="pl-2">{cat.nomeCategoria}</td>
                                        <td className="pl-2 flex gap-2 justify-center">
                                            <button onClick={modalAbrirEditar} className="text-blue-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faEdit}/></button>
                                            <button onClick={modalAbrirExcluir} className="text-red-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faTrash}/></button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                  <Modal onConfirm={() => teste()} Tamanho="Pequeno" CorModal="#ffffff" CorTexto="#000000" CorLinha="#000000" Titulo="Cadastro" aberto={abrirModalCadastro} FecharModal={modalFecharCadastro}>
                  </Modal>
                  <Modal Tamanho="Pequeno" CorModal="#ffffff" CorTexto="#000000" CorLinha="#000000" Titulo="Editar" aberto={abrirModalEditar} FecharModal={modalFecharEditar}>
                  </Modal>
                  <Modal Tamanho="Pequeno" CorModal="#ffffff" CorTexto="#000000" CorLinha="#000000" Titulo="Atenção" aberto={abrirModalExcluir} FecharModal={modalFecharExcluir}>
                  </Modal>
        </section>
    )
}


{/* <div className="w-full flex justify-center">
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
                                        teste
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="w-full rounded-2xl">
                                <tr className="hover:bg-gray-200">
                                    <td className="p-1">1</td>
                                    <td className="p-1">Salgado</td>
                                    <td className="p-1 flex gap-2 justify-center">
                                        <button className="text-blue-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faEdit}/></button>
                                        <button className="text-red-500 cursor-pointer hover:scale-[106%]"><FontAwesomeIcon icon={faTrash}/></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}