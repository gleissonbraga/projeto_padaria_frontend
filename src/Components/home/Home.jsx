import Carrossel from "./components/Carrossel";

export default function Home(){
    return (
        <section id="home" className="w-full min-[430px]:h-[600px] sm:h-screen bg-[url('/images/bg-home-2.png')] bg-cover bg-center pt-40 flex justify-center min-[430px]:p-0 sm:pl-28 items-end">
            <div className="w-[70%] flex text-center">
                <div className="w-full flex justify-center">
                    {/* <div className="font-sansita text-white text-7xl flex flex-col text-start pt-6">
                        <h1>O sabor que abraça!</h1>
                        <h1>O pão que conforta!</h1>
                    </div>
                    <div className="flex flex-start">
                        <a href="" className="bg-[#933C24] text-[#F5F5F5] font-semibold p-2 rounded w-44">Ver Cárdapio</a>
                    </div> */}
                    <Carrossel/>
                </div>
            </div>
        </section>
    )
}