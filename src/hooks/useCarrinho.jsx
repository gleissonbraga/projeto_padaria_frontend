// hooks/useCarrinho.js
import { useState, useEffect } from 'react';

export default function useCarrinho() {
  const [itens, setItens] = useState([]);
  const [qtdTotal, setQtdTotal] = useState(0);
  const [cartNotification, setCartNotification] = useState(false);
  const [carregado, setCarregado] = useState(false); // Estado para controlar se já carregou

  // Carrega o carrinho do localStorage na inicialização
  useEffect(() => {
    const carregarCarrinho = () => {
      try {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        setItens(carrinho);

        if (carrinho.length > 0) {
          const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
          console.log(totalItens);
          setQtdTotal(totalItens); // Corrigido: era carrinho.lenght
          setCartNotification(true);
        } else {
          setQtdTotal(0);
          setCartNotification(false);
        }
        
        setCarregado(true); // Marca como carregado
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setItens([]);
        setQtdTotal(0);
        setCartNotification(false);
        setCarregado(true);
      }
    };

    carregarCarrinho();

    const handleStorageChange = (e) => {
      if (e.key === 'carrinho') {
        carregarCarrinho();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Só salva no localStorage depois que carregou inicialmente
  useEffect(() => {
    if (!carregado) return; // Não executa se ainda não carregou
    
    try {
      localStorage.setItem("carrinho", JSON.stringify(itens));
      
      if (itens.length > 0) {
        const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
        setQtdTotal(totalItens);
        setCartNotification(true);
      } else {
        setQtdTotal(0);
        setCartNotification(false);
      }
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [itens, carregado]);

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setItens(itensAtuais => {
      const index = itensAtuais.findIndex(p => p.idProduto === produto.idProduto);
      
      if (index !== -1) {
        // Se já existe, atualiza a quantidade
        return itensAtuais.map(item =>
          item.idProduto === produto.idProduto
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        // Se não existe, adiciona novo produto
        return [...itensAtuais, { ...produto, quantidade }];
      }
    });
  };

  const removerDoCarrinho = (idProduto) => {
    setItens(itensAtuais => {
      return itensAtuais.reduce((acc, item) => {
        if (item.idProduto === idProduto) {
          if (item.quantidade > 1) {
            acc.push({ ...item, quantidade: item.quantidade - 1 });
          }
          // Se quantidade é 1, não adiciona ao acc (remove completamente)
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  // Remover produto completamente do carrinho
  const removerProdutoCompleto = (idProduto) => {
    setItens(itensAtuais => 
      itensAtuais.filter(item => item.idProduto !== idProduto)
    );
  };

  // Atualizar quantidade específica de um produto
  const atualizarQuantidade = (idProduto, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerProdutoCompleto(idProduto);
      return;
    }

    setItens(itensAtuais =>
      itensAtuais.map(item =>
        item.idProduto === idProduto
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  // Obter quantidade de um produto específico
  const obterQuantidade = (idProduto) => {
    const produto = itens.find(item => item.idProduto === idProduto);
    return produto ? produto.quantidade : 0;
  };

  // Verificar se produto está no carrinho
  const produtoNoCarrinho = (idProduto) => {
    return itens.some(item => item.idProduto === idProduto);
  };

  // Limpar carrinho completamente
  const limparCarrinho = () => {
    setItens([]);
    localStorage.removeItem("carrinho");
  };

  // Calcular valor total do carrinho
  const valorTotal = itens.reduce((total, item) => {
    const preco = typeof item.preco === 'number' ? item.preco : parseFloat(item.preco) || 0;
    return total + (preco * item.quantidade);
  }, 0);

  // Calcular quantidade de produtos diferentes
  const qtdProdutosDiferentes = itens.length;

  return {
    // Estados
    itens,
    qtdTotal,
    cartNotification,
    valorTotal,
    qtdProdutosDiferentes,
    carregado, // Exporta o estado de carregamento
    
    // Funções de manipulação
    adicionarAoCarrinho,
    removerDoCarrinho,
    removerProdutoCompleto,
    atualizarQuantidade,
    limparCarrinho,
    
    // Funções de consulta
    obterQuantidade,
    produtoNoCarrinho
  };
}