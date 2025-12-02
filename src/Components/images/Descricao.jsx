export default function Descricao(){
    return (
       <section className="w-full bg-[#f5f5f5] flex justify-center pt-10 pb-6 bg-[url('/images/bg-chocolate.png')] bg-cover bg-left">
            <div className="w-[90%] flex text-center flex-col">
                <div className="flex justify-center">
                    <h3 className="border-b-1 border-b-neutral-400 text-5xl font-sansita text-center p-4">
                        O melhor da nossa cozinha!
                    </h3>
                </div>
                <figure className="min-[350px]:flex-col lg:flex-row flex-wrap lg:flex-nowrap flex gap-4 p-4 md:">
                    <div className="min-[350px]:w-[100%] sm:w-[60%] md:w-[90%] hover:scale-[98%] transition transform">
                         <img className="w-full h-full transition transform rounded-4xl brightness-50" src="/images/pao.jpg" alt="" />
                    </div>
                    <div className="min-[350px]:w-[100%] sm:w-[30%] md:w-[100%] lg:w-[40%] flex flex-col gap-2 justify-between">
                        <div className="min-[88%]:w-[100%] sm:w-[350px] md:w-[90%] h-[400px] lg:h-[250px] xl:h-full rounded-4xl">
                            <img className="w-full h-full hover:scale-[98%] transition transform rounded-4xl brightness-50" src="/images/cafe.jpg" alt="" />
                        </div>
                        <div className="min-[88%]:w-[100%] sm:w-[350px] md:w-[90%] h-[400px] lg:h-[250px] xl:h-full rounded-4xl">
                            <img className="w-full h-full hover:scale-[98%] transition transform rounded-4xl brightness-50" src="/images/torta.avif" alt="" />
                        </div>
                    </div>
                </figure>
            </div>
       </section> 
    )
}