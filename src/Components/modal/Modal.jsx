import { Link } from "react-router-dom";
import useCarrinho from "../../hooks/useCarrinho";


export default function Modal({Titulo, Tamanho, Carrinho = false, aberto, FecharModal, children, Url}){

    if (!aberto) return null;

    if(Tamanho == "Pequeno"){
        Tamanho = "600"
    }
    else if(Tamanho == "Medio"){
        Tamanho = "800"
    }
    else if(Tamanho == "Grande"){
        Tamanho = "1400"
    }

    return (
        <div className="fixed inset-0 z-40 bg-[#0000008e] flex justify-center items-center">
            <div className={`bg-[#ffffff] w-[${Tamanho}px] absolute z-[80] top-30 rounded-2xl flex flex-col items-center shadow-2xl justify-around`}>
            <div className="p-4 w-[70%]">
                <h3 className="text-2xl font-semibold font-poppins">{Titulo}</h3>
            </div>
            
            <div className=" border-[1px] border-[#727272a8] w-[80%] "></div>
            <div className="w-[90%]  mt-2 mb-2">
                {children}
            </div>
             <div className=" border-[1px] border-[#727272a8] w-[80%] "></div>
             <div className="flex gap-4 justify-end w-[80%] p-4">
                
                <button className={`${Carrinho ? "hidden" : " hover:bg-green-700 hover:text-amber-50 border-4 border-green-700"} rounded-[5px] p-1.5  font-semibold cursor-pointer`}>Confirmar</button>

                <Link to={Url} onClick={FecharModal} className={`${Carrinho ? "hover:bg-blue-700 hover:text-amber-50 border-4 border-blue-700 rounded-[5px] p-1.5  font-semibold cursor-pointer" : "hidden"}`}>Finalizar Compra</Link>

                <button onClick={FecharModal}
                className="hover:bg-red-500  hover:text-amber-50 border-4 border-red-500 rounded-[5px] p-1.5 w-[18%] font-semibold cursor-pointer">Sair</button>
             </div>
            </div>
        </div>
    )
}