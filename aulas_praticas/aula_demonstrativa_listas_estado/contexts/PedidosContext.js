import { createContext, useContext, useState } from 'react';

// Segundo contexto, separado do de favoritos: cada um com uma única
// responsabilidade, como os componentes. Quem só lê favoritos não
// re-renderiza quando entra um pedido.
//
// O modal de pedido ESCREVE aqui; a tela "Meus pedidos", no drawer, LÊ.
const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);

  function adicionarPedido({ produtoId, quantidade, total }) {
    const pedido = {
      // Date.now() basta como id aqui: um pedido por toque.
      id: Date.now(),
      produtoId,
      quantidade,
      total,
    };
    // Mais recente primeiro.
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
