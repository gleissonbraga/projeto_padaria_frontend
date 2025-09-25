// import { useEffect, useState } from "react";
// import apiClient from "./api/api"; // seu Axios configurado

// export default function ProductsPage() {
//   // Estado dos produtos
//   const [produtos, setProdutos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Estado do carrinho
//   const [carProducts, setCarProducts] = useState([]);

//   // Dados do pedido
//   const [nomePessoa, setNomePessoa] = useState("");
//   const [contato, setContato] = useState("");
//   const [dataRetirada, setDataRetirada] = useState("");
//   const [horaRetirada, setHoraRetirada] = useState("");
//   console.log(produtos)
//   // Adicionar produto ao carrinho
//   const addProduct = (produto) => {
//     const exist = carProducts.find((p) => p.IdProduto === produto.id);
//     if (exist) {
//       setCarProducts(
//         carProducts.map((p) =>
//           p.IdProduto == produto.id
//             ? { ...p, Quantidade: p.Quantidade + 1 }
//             : p
//         )
//       );
//     } else {
//       setCarProducts([...carProducts, { IdProduto: produto.Id, Quantidade: 1 }]);
//     }
//   };

//   // Enviar pedido para API
//   const enviarPedido = async () => {
//     if (!nomePessoa || !contato || !dataRetirada || !horaRetirada) {
//       alert("Preencha todos os dados do pedido!");
//       return;
//     }

//     if (carProducts.length === 0) {
//       alert("Carrinho vazio!");
//       return;
//     }
//   const dataHoraRetirada = `${dataRetirada}T${horaRetirada}`;
//     const payload = {
//       NomePessoa: nomePessoa,
//       Contato: contato,
//       DataRetirada: dataHoraRetirada,
//       HoraRetirada: horaRetirada,
//       Produtos: carProducts,
//     };

//     console.log(payload)

//     try {
//       const response = await apiClient.post("api/pedidos", payload);
//       alert("Pedido enviado com sucesso!");
//       console.log("Resposta da API:", response.data);
//       setCarProducts([]);
//       setNomePessoa("");
//       setContato("");
//       setDataRetirada("");
//       setHoraRetirada("");
//     } catch (err) {
//       console.error("Erro ao enviar pedido:", err);
//       alert("Erro ao enviar pedido!");
//     }
//   };

//   // Buscar produtos da API
//   useEffect(() => {
//     const fetchProdutos = async () => {
//       try {
//         const response = await apiClient.get("produtos");
//         setProdutos(response.data);
//       } catch (err) {
//         setError(err.response?.data || "Erro ao buscar produtos");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProdutos();
//   }, []);

//   if (loading) return <p>Carregando produtos...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Lista de Produtos</h1>

//       {/* Lista de produtos */}
//       <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
//         {produtos.map((produto) => (
//           <li key={produto.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
//             <h2>{produto.nome}</h2>
//             <p>Preço: R$ {produto.preco.toFixed(2)}</p>
//             <p>Estoque: {produto.quantidade}</p>
//             <button onClick={() => addProduct(produto)}>Adicionar</button>
//           </li>
//         ))}
//       </ul>

//       {/* Inputs do pedido */}
//       <h2 style={{ marginTop: "40px" }}>Dados do Pedido</h2>
//       <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Nome da Pessoa"
//           value={nomePessoa}
//           onChange={(e) => setNomePessoa(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Contato"
//           value={contato}
//           onChange={(e) => setContato(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Data de Retirada"
//           value={dataRetirada}
//           onChange={(e) => setDataRetirada(e.target.value)}
//         />
//         <input
//           type="time"
//           placeholder="Hora de Retirada"
//           value={horaRetirada}
//           onChange={(e) => setHoraRetirada(e.target.value)}
//         />
//       </div>

//       {/* Carrinho */}
//       <h2 style={{ marginTop: "40px" }}>Carrinho</h2>
//       {carProducts.length === 0 ? (
//         <p>Carrinho vazio</p>
//       ) : (
//         <ul>
//           {carProducts.map((p) => {
//             const produtoInfo = produtos.find((prod) => prod.id === p.IdProduto);
//             return (
//               <li key={p.IdProduto}>
//                 {produtoInfo?.nome} - Quantidade: {p.Quantidade}
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       {carProducts.length > 0 && (
//         <button onClick={enviarPedido} style={{ marginTop: "20px" }}>
//           Finalizar Pedido
//         </button>
//       )}
//     </div>
//   );
// }
