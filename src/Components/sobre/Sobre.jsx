import React from "react";

export default function Sobre() {
  return (
    // A classe "pt-32" aqui empurra todo o conteúdo para baixo, resolvendo o problema do título
    <div className="bg-[#ffddbd]/20 pt-82 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#48271d] tracking-tight">
            O Coração da Nossa Padaria
          </h1>
          <p className="mt-4 text-lg text-[#865439]">
            Conheça a história e a paixão por trás de cada pão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#c78b59]">
                Quem Somos
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                A Padaria São José é uma tradicional casa de pães, doces e
                salgados. Nossos produtos são feitos com carinho e cuidado,
                mantendo o sabor inigualável com o frescor da fabricação diária,
                seguindo receitas que atravessam gerações.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#c78b59]">
                Nossos Sabores
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Atuamos na fabricação e distribuição de produtos de panificação
                artesanal. Venha tomar um café conosco e experimentar o
                verdadeiro sabor que só a tradição pode oferecer.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="#"
                className="inline-block bg-[#48271d] text-white font-bold py-3 px-8 rounded-lg uppercase tracking-wider hover:bg-[#865439] transition-colors duration-300"
              >
                Entrar em Contato
              </a>
            </div>
          </div>

          {/* ========================================================== */}
          {/* SEÇÃO DE IMAGENS ATUALIZADA PARA USAR 4 FOTOS EM UM GRID 2X2 */}
          {/* ========================================================== */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
            {/* Imagem 1 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sobre/sobre-1.jpg"
                alt="Pão artesanal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#c78b59]/30 mix-blend-multiply"></div>
            </div>
            {/* Imagem 2 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sobre/sobre-2.jpg"
                alt="Ambiente da padaria"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#c78b59]/30 mix-blend-multiply"></div>
            </div>
            {/* Imagem 3 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sobre/sobre-3.jpg"
                alt="Café da padaria"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#c78b59]/30 mix-blend-multiply"></div>
            </div>
            {/* Imagem 4 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sobre/sobre-4.jpg"
                alt="Detalhe de produto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#c78b59]/30 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
