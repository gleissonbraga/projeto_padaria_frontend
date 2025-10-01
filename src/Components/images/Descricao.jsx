export default function Descricao(){
    return (
       <section className="w-full bg-[#f5f5f5] flex justify-center pt-10 pb-6 bg-[url('/images/bg-chocolate.png')] bg-cover bg-left">
            <div className="w-[90%] flex text-center flex-col">
                <div className="flex justify-center">
                    <h3 className="border-b-1 border-b-neutral-400 text-5xl font-sansita text-center p-4">
                        O melhor da nossa cozinha!
                    </h3>
                </div>
                <figure className=" flex-wrap flex gap-4 p-4 justify-center">
                    <div className="w-[50%] hover:scale-[98%] transition transform">
                         <img className="w-full h-full transition transform rounded-4xl brightness-50" src="/images/pao.jpg" alt="" />
                    </div>
                    <div className="w-[30%] flex flex-col gap-2 justify-between">
                        <div className="w-[350px] h-[250px] rounded-4xl">
                            <img className="w-full h-full hover:scale-[98%] transition transform rounded-4xl brightness-50" src="/images/cafe.jpg" alt="" />
                        </div>
                        <div className="w-[350px] h-[250px] rounded-4xl">
                            <img className="w-full h-full hover:scale-[98%] transition transform rounded-4xl brightness-50" src="/images/torta.avif" alt="" />
                        </div>
                    </div>
                </figure>
            </div>
       </section> 
    )
}