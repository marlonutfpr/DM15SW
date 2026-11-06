import { createContext, useContext, useEffect, useState } from 'react';
import { ouvirFavoritos, adicionarFavorito, removerFavorito } from '../services/favoritos';

// Para as telas, nada mudou desde a Aula 13: favoritos, alternarFavorito,
// ehFavorito. Por dentro, o AsyncStorage da Aula 15 deu lugar ao Firestore.
//
// Sumiram o `carregado` e o efeito de gravar: o estado agora é um ESPELHO do
// banco. A tela grava no Firestore, e a escuta traz o resultado de volta. O
// Firestore entrega a própria gravação na hora, antes da confirmação do
// servidor, então o coração não demora a encher.
const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  // Escuta ao montar, encerra ao desmontar (ao sair da conta).
  useEffect(() => {
    const cancelar = ouvirFavoritos(setFavoritos, (e) =>
      console.warn('Favoritos indisponíveis:', e.code)
    );
    return cancelar;
  }, []);

  function alternarFavorito(id) {
    // Não espera a gravação: quem atualiza a tela é a escuta.
    if (favoritos.includes(id)) removerFavorito(id);
    else adicionarFavorito(id);
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

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (contexto === null) {
    throw new Error('useFavoritos precisa estar dentro de <FavoritosProvider>.');
  }

  return contexto;
}
