import { useEffect, useState } from "react";
import apiClient from "./api/api"; // ajuste o caminho conforme seu projeto

export default function ProductsPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await apiClient.get("/api/produtos");
        console.log(response.data)
        setProdutos(response.data);
      } catch (err) {
        setError(err.response?.data || "Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  console.log(produtos)

  if (loading) return <p style={{ color: "gray" }}>Carregando produtos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Lista de Produtos
      </h1>
      {produtos.length === 0 ? (
        <p style={{ color: "gray" }}>Nenhum produto cadastrado.</p>
      ) : (
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {produtos.map((produto) => (
            <li
              key={produto.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{produto.nome}</h2>
              <p style={{ color: "#333" }}>Preço: R$ {produto.preco.toFixed(2)}</p>
              <p style={{ color: "#666" }}>Estoque: {produto.quantidade}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
