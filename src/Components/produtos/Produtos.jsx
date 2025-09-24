export default function Produtos(){
    return (
        <section className="w-full bg-[#f5f5f5] flex justify-center pt-24">
            <div className=" w-[98%] flex flex-col text-center items-center p-2">
                <div className="w-[38%] text-center font-sansita text-6xl p-3">
                    <h3>Catálogo</h3>
                </div>
                <div className="w-[80%] h-24 mt-8 flex flex-col items-center">
                    <div className="w-[40%] border-b-[1px] border-gray-300 flex justify-center">
                        <ul className="flex gap-6 text-[1.2rem] text-[#5D5D5D] font-poppins font-semibold ">
                            <li>Salgado</li>
                            <li>Doces</li>
                            <li>Pães</li>
                            <li>Tortas</li>
                            <li>Sucos</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}