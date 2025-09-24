import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#48271d] text-[#ffddbd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* coluna sobre */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#c78b59]">[Logo]</h2>
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

        {/* coluna contato e endereço */}
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
              <strong>Email:</strong>
              <a
                href="mailto:contato@padariasaojoao.com.br"
                className="hover:text-[#ffddbd] transition-colors"
              >
                {" "}
                contato@padariasaojoao.com.br
              </a>
            </p>
          </div>
        </div>

        {/* coluna horário de funcionamento */}
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
      </div>

      {/* barra de copyright */}
      <div className="mt-12 pt-8 border-t border-[#865439] text-center">
        <p className="text-sm text-[#ffddbd]/70">
          © 2025 Padaria São João. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
