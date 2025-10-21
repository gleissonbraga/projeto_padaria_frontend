import React from "react";

import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer" className="bg-[#48271d] text-[#ffddbd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <img
            src="/images/image.png"
            alt="Logo da Padaria"
            className="h-21 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Feito com amor, todos os dias. Nossos pães e doces são preparados
            com ingredientes frescos e selecionados para levar o melhor sabor
            até você.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c78b59] hover:text-[#ffddbd] transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c78b59] hover:text-[#ffddbd] transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://wa.me/5551999998888"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c78b59] hover:text-[#ffddbd] transition-colors"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#c78b59] uppercase">
            Contato
          </h3>
          <div className="text-sm space-y-2">
            <p>
              <strong>Endereço:</strong> Rua das Flores, 123 - Bairro Menino
              Deus, Porto Alegre - RS
            </p>
            <p>
              <strong>Telefone Fixo:</strong> (51) 3333-4444
            </p>
            <p>
              <strong>WhatsApp:</strong> (51) 99999-8888
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contato@padariasaojose.com"
                className="hover:text-[#ffddbd] transition-colors"
              >
                {" "}
                contato@padariasaojose.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#c78b59] uppercase">
            Horário de Funcionamento
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Segunda a Sexta:</strong> 6:30 – 19:30
            </li>
            <li>
              <strong>Sábados:</strong> 7:00 – 18:00
            </li>
            <li>
              <strong>Domingos e Feriados:</strong> 7:00 – 12:00
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#c78b59] uppercase">
            Formas de Pagamento
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            <img
              src="/images/visa.svg"
              alt="Visa"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/mastercard.svg"
              alt="Mastercard"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/elo.svg"
              alt="Elo"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/hipercard.svg"
              alt="Hipercard"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/paypal.svg"
              alt="Paypal"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/jcb.svg"
              alt="JCB"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/diners.svg"
              alt="Diners"
              className="h-9 bg-white rounded p-1"
            />
            <img
              src="/images/americanexpress.svg"
              alt="American Express"
              className="h-9 bg-white rounded p-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#865439] text-center">
        <p className="text-sm text-[#ffddbd]/70">
          © 2025 Padaria São José. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
