import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-[#c78a5972] flex flex-row justify-around items-center p-4 fixed w-full z-50">
      <div>
        <img src="/images/image.png" alt="Logo" className="h-12 w-12" />
      </div>
      <div>
        <ul className="flex gap-6 uppercase text-white font-semibold">
           <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">Sobre Nós</a>
            </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">Contato</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-white text-sm font-bold">
        <span>📞 51 99930-3193</span>
        <span>☎️ 51 3333-3333</span>
      </div>
      <div>
        <Link to="/carrinho"><img src="/images/cart-bakery.svg" alt="cart" className="h-8 w-8 text-white" /></Link>
      </div>
    </nav>
  );
}