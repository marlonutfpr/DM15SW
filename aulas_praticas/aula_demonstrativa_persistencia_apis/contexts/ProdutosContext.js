import { createContext, useContext, useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtos';

// Cardápio, Favoritos, detalhe e modal de pedido precisam da mesma lista. Se
// cada tela buscasse a sua, seriam quatro requisições iguais. O contexto busca
// UMA vez e entrega o resultado — e os três estados da requisição — a todas.
const ProdutosContext = createContext(null);

export function ProdutosProvider({ children }) {
  // Os três estados de uma requisição. `carregando` começa true, e não false
  // como na tela de CEP: aqui a busca dispara sozinha, ao abrir o app, e não
  // quando alguém toca num botão.
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregar() {
    setCarregando(true);
    setErro(null);
    try {
      setProdutos(await listarProdutos());
    } catch (e) {
      setErro('Não foi possível carregar o cardápio.');
    } finally {
      setCarregando(false);
    }
  }

  // Ao montar, uma vez. O array vazio é DE PROPÓSITO: `carregar` é uma função
  // nova a cada renderização, e pô-la aqui faria o efeito rodar de novo a
  // cada renderização — que a própria busca provoca. Ciclo infinito de
  // requisições: o passo 7 do roteiro.
  useEffect(() => {
    carregar();
  }, []);

  // Devolve undefined quando o id não existe. Quem chama decide o que mostrar.
  function buscarProduto(id) {
    return produtos.find((produto) => produto.id === id);
  }

  return (
    <ProdutosContext.Provider
      value={{ produtos, carregando, erro, recarregar: carregar, buscarProduto }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutos() {
  const contexto = useContext(ProdutosContext);

  if (contexto === null) {
    throw new Error('useProdutos precisa estar dentro de <ProdutosProvider>.');
  }

  return contexto;
}
