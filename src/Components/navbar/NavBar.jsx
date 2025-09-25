import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex bg-[#ffddbd]  flex-row justify-around items-center fixed w-full z-50 mt-6">
      <div className="flex items-start">
        <img src="/images/image.png" alt="Logo" className="h-40 w-60" />
      </div>
      <div className="border-t-4 p-2 border-[#48271d] rounded">
        <ul className="flex gap-6 h-10 text-2xl text-[#48271d] font-bold">
           <li className="hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded">
            <Link to="/">Inicio</Link>
          </li>
          <li className="hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded">
            <Link to="/produtos">Produtos</Link>
          </li>
          <li className="hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded">
            <a href="#" target="_blank" rel="noopener noreferrer">Sobre Nós</a>
            </li>
          <li className="hover:scale-[101%] hover:border-b-4 hover:text-[#5d5d5d] hover:border-amber-500 rounded">
            <a href="#" target="_blank" rel="noopener noreferrer">Contato</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-[#48271d] text-sm font-bold">
        <span className="font-semibold font-poppins text-[1.2rem]"> 51 99930-3193</span>
        <span className="font-semibold font-poppins text-[1.2rem]"> 51 3333-3333</span>
      </div>
      <div>
        <Link to="/carrinho">
          <div className="w-6 h-6 bg-red-600 rounded-4xl relative top-3 left-5"> </div>
          <img src="/images/cart-bakery.svg" alt="cart" className="h-8 w-8 text-[#48271d]"/>
        </Link>
      </div>
    </nav>
  );
}