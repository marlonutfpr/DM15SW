import { createContext, useContext, useEffect, useState } from 'react';
import { lerPedidos, salvarPedidos } from '../services/pedidos';

// O mesmo padrão do FavoritosContext: lê ao montar, grava a cada mudança,
// com o controle `carregado` entre os dois.
const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    lerPedidos().then((lista) => {
      setPedidos(lista);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvarPedidos(pedidos);
  }, [pedidos, carregado]);

  // O pedido guarda o NOME e o TOTAL do momento da compra, e não só o id do
  // produto. Se amanhã a API mudar o nome ou o preço, ou tirar o produto do
  // cardápio, o pedido de ontem continua dizendo o que foi pago.
  function adicionarPedido({ produtoId, nome, quantidade, total }) {
    const pedido = {
      id: Date.now(),
      produtoId,
      nome,
      quantidade,
      total,
    };
    setPedidos((anteriores) => [pedido, ...anteriores]);
  }

  function limparPedidos() {
    setPedidos([]);
  }

  return (
    <PedidosContext.Provider value={{ pedidos, adicionarPedido, limparPedidos }}>
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const contexto = useContext(PedidosContext);

  if (contexto === null) {
    throw new Error('usePedidos precisa estar dentro de <PedidosProvider>.');
  }

  return contexto;
}
