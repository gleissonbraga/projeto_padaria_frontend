import { useState } from "react"



export default function Produtos(){
    const [cartProducts, setCarProducts] = useState([])
    
    const addCar = () => {
        
    }

    return (
        <section className="w-full bg-[#FFDDBD] flex justify-center pt-40 pb-6">
            <div className=" w-[98%] flex flex-col text-center items-center p-2">
                <div className="w-[38%] text-center font-sansita text-6xl p-3">
                    <h3>Catálogo</h3>
                </div>
                <div className="w-[80%] h-24 mt-8 flex flex-col items-center">
                    <div className="w-[48%] h-10 border-b-[1px] border-[#D9D9D9] flex justify-center">
                        <ul className="flex gap-6 text-[1.2rem] text-[#5D5D5D] font-poppins font-semibold ">
                            <li className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded">Salgado</li>
                            <li className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded">Doces</li>
                            <li className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded">Pães</li>
                            <li className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded">Tortas</li>
                            <li className="hover:text-[#c78b59] cursor-pointer hover:border-b-4 hover:border-amber-500 rounded">Sucos</li>
                        </ul>
                    </div>
                </div>
                <article className="w-full flex p-3 gap-3 flex-wrap justify-center ">
                     <div className="w-[14%] flex flex-col gap-4 border-[0.4px] items-center border-[#3a3737aa] p-2 rounded-3xl hover:scale-[102%] hover:transition-transform duration-700">
                        <figure className="bg-gray-200 w-full h-36 rounded-2xl">
                            
                        </figure>
                        <div>
                            <p>Nome Produto</p>
                            <p>R$ 00,00</p>
                        </div>
                        <div className="flex w-full gap-1 justify-center">
                            <div className="flex gap-1 items-center">
                                <button className="font-bold bg-red-500 w-6 h-6 rounded">-</button>
                                <input type="number" className="w-8"/>
                                <button className="font-bold bg-blue-500 w-6 h-6 rounded">+</button>
                            </div>
                        </div>
                        <button className="w-[60%] rounded text-[1rem] border-2 border-amber-700 hover:bg-amber-700 hover:text-[#FFFF]">Adicionar</button>
                    </div>
                </article>
            </div>
        </section>
    )
}