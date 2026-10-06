import { createContext, useContext, useState } from 'react';

// Os favoritos são lidos e alterados em lugares que não são pai e filho um do
// outro: o Cardápio, a aba Favoritos, o detalhe do produto e o selo da aba,
// no layout. Elevar até o pai comum faria o dado atravessar layouts e telas
// que não o usam. É o caso do Context.
//
// `null` é o valor que recebe quem lê o contexto FORA de um provider.
const FavoritosContext = createContext(null);

// O provider envolve as telas por `children`: não sabe quais telas são, só
// guarda o estado e o entrega para baixo.
export function FavoritosProvider({ children }) {
  // Guardamos só os ids. O produto completo sai de dados/produtos.js.
  const [favoritos, setFavoritos] = useState([]);

  // A regra de alternar mora AQUI, junto do estado, e não repetida em cada
  // tela. Forma com função: o novo valor depende do anterior.
  function alternarFavorito(id) {
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((favorito) => favorito !== id)
        : [...anteriores, id]
    );
  }

  function ehFavorito(id) {
    return favoritos.includes(id);
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, alternarFavorito, ehFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

// Hook de acesso. Quem usa não importa o contexto nem o useContext.
export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  // Sem provider acima, `contexto` é o null do createContext. Em vez de
  // quebrar mais adiante com "Cannot read property of null", a mensagem diz
  // exatamente o que falta.
  if (contexto === null) {
    throw new Error('useFavoritos precisa estar dentro de <FavoritosProvider>.');
  }

  return contexto;
}
