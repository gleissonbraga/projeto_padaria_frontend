import Carrossel from "./components/Carrossel";

export default function Home(){
    return (
        <section id="home" className="w-full min-[430px]:h-[600px] sm:h-screen bg-[url('/images/bg-home-2.png')] bg-cover bg-center pt-40 flex justify-center min-[430px]:p-0 sm:pl-28 items-end">
            <div className="w-[70%] flex text-center">
                <div className="w-full flex justify-center">
                    <Carrossel/>
                </div>
            </div>
        </section>
    )
}