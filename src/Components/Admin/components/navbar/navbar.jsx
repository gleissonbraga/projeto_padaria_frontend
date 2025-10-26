import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBasketShopping, faChevronDown, faChevronRight, faCoffee, faGear, faHouse, faLayerGroup, faPaste, faPenToSquare, faPercent, faRegistered, faRightFromBracket, faUser, faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function NavBarAdmin() {
    const [abrirMenu, setAbrirMenu] = useState(false)
    const [abrirMenuCadastro, setAbrirMenuCadastro] = useState(false)
    const [usuario, setUsuario] = useState({})
    const [select, setSelect] = useState("Inicio")

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const tokenLocal = jwtDecode(token)
                setUsuario(tokenLocal)
            } catch (err) {
                console.error("Token inválido")
            }
        }
    }, [])

    const handleMenu = () => {
        if (abrirMenu) {
            setAbrirMenu(false)
        } else {
            setAbrirMenu(true)
        }
    }

    const handleMenuCadastro = () => {
        if (abrirMenuCadastro) {
            setAbrirMenuCadastro(false)
        } else {
            setAbrirMenuCadastro(true)
        }
    }

    const handleSair = () => {
        localStorage.clear("token")
        navigate("/login")
    }

    const handleVoltarSite = () => {
        navigate("/")
    }

    return (
        <nav className="w-full h-20 fixed bg-white shadow-2xl flex justify-between items-center p-4">
            {
                abrirMenu && (
                    <div className="fixed left-0 h-screen w-[14%] shadow-2xl bg-white top-0 flex flex-col"><div className="flex justify-end">
                        <button className="cursor-pointer hover:bg-gray-100 hover:rounded p-2" onClick={() => handleMenu()}>
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </button>
                    </div>
                        <div className="flex flex-col justify-between grow">
                            <div className="w-full mt-4 border-b-[1px] border-gray-200 p-2">
                                <h3 className="text-[#4F46E5] font-bold text-2xl text-center">{usuario?.unique_name || ""}</h3>
                            </div>
                            <div className="w-full p-3 flex flex-col items-center">
                                <ul className="w-full text-lg flex flex-col gap-1">
                                    <li className={`cursor-pointer hover:rounded p-2 
                                        ${select === "Inicio" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`} onClick={() => setSelect("Inicio")}><Link to="/admin/"><FontAwesomeIcon icon={faHouse} /> Inicio</Link>
                                        </li>
                                         
                                    <li onClick={() => { handleMenuCadastro(); setSelect("Cadastros")}} 
                                    className={`cursor-pointer hover:rounded p-2 flex gap-2 
                                    ${select === "Cadastros" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}>
                                        <span> <FontAwesomeIcon icon={faRegistered} /> Cadastros</span>
                                        <span><FontAwesomeIcon icon={abrirMenuCadastro ? faChevronDown : faChevronRight} /></span>
                                    </li>
                                    {abrirMenuCadastro && (
                                        <ul className="w-full flex flex-col items-center gap-1">
                                            <li onClick={() => setSelect("Categoria")}
                                            className={`w-[80%] cursor-pointer hover:rounded p-2 
                                            ${select === "Categoria" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}>
                                                <Link to="/admin/cadastro/categoria"><FontAwesomeIcon icon={faLayerGroup} /> Categoria</Link>
                                            </li>
                                            <li onClick={() => setSelect("Produtos")}
                                            className={`w-[80%]  cursor-pointer  hover:rounded p-2 
                                            ${select === "Produtos" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"} `}>
                                                 <Link to="/admin/cadastro/produtos"><FontAwesomeIcon icon={faUtensils} />  Produtos</Link>
                                            </li>
                                            <li onClick={() => setSelect("Promoções")}
                                            className={`w-[80%]  cursor-pointer  hover:rounded p-2 
                                            ${select === "Promoções" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"} `}>
                                                <Link to="/admin/cadastro/promocoes"><FontAwesomeIcon icon={faPercent} />  Promoções</Link>
                                            </li>
                                            <li onClick={() => setSelect("Usuários")}
                                            className={`w-[80%]  cursor-pointer  hover:rounded p-2 
                                            ${select === "Usuários" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"} `}>
                                                <Link to="/admin/cadastro/usuarios"><FontAwesomeIcon icon={faUser} />  Usuários</Link>
                                            </li>
                                        </ul>
                                    )}
                                    <li onClick={() => setSelect("Pedidos")}
                                    className={`cursor-pointer  hover:rounded p-2 
                                    ${select === "Pedidos" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}>
                                        <Link to="/admin/pedidos"><FontAwesomeIcon icon={faBasketShopping} />  Pedidos</Link>
                                        </li>
                                    <li onClick={() => setSelect("Relatórios")}
                                    className={`cursor-pointer  hover:rounded p-2 
                                    ${select === "Relatórios" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}> <FontAwesomeIcon icon={faPaste} />Relatórios</li>
                                    <li onClick={() => setSelect("Site")}
                                    className={`cursor-pointer  hover:rounded p-2 
                                    ${select === "Site" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}> <FontAwesomeIcon icon={faPenToSquare} 
                                    />Site</li>
                                    <li onClick={() => setSelect("Configurações")}
                                    className={`cursor-pointer hover:rounded p-2 
                                    ${select === "Configurações" ? "bg-[#4F46E5] hover:bg-[#4a43cf] text-white rounded" : "hover:bg-gray-200"}`}><FontAwesomeIcon icon={faGear} />Configurações</li>
                                </ul>
                            </div>
                            <div className="w-full p-2 mb-10">
                                <button onClick={() => handleSair()} className="text-red-500 font-bold flex justify-center w-full gap-2 cursor-pointer hover:bg-red-200 hover:rounded p-2">
                                    <p>Sair</p>
                                    <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <button className="cursor-pointer hover:bg-gray-100 hover:rounded p-2" onClick={() => handleMenu()}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <p className="text-3xl">Visão Geral do Sistema</p>
            <div className="flex flex-col items-center gap-2">
                {/* <div className="flex gap-2 items-center">
                    <p>Administrador</p>
                    <FontAwesomeIcon icon={faUser} />
                </div> */}
                <div>
                    <button onClick={() => handleVoltarSite()}
                        className="cursor-pointer hover:underline">
                        Voltar ao Site
                    </button>
                </div>
            </div>
        </nav>
    )
}