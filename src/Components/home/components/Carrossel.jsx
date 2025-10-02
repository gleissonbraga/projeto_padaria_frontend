import { useState, useEffect } from "react";

const images = [
  "/images/pao-carrossel.png",
  "/images/doce-carrossel.png",
  "/images/Cafe-carrossel.png",
];

export default function Carrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Muda a imagem a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[90%] h-[400px] overflow-hidden rounded-2xl">
      {/* Imagens */}
      {images.map((img, index) => (
        <img
    key={index}
    src={img}
    alt={`Slide ${index}`}
    className={`absolute w-full h-full object-contain transition-opacity duration-700 ${
      index === currentIndex ? "opacity-100" : "opacity-0"
    }`}
/>
      ))}

      {/* Botões de navegação */}
      {/* <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ▶
      </button> */}

      {/* Indicadores */}
      {/* <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
