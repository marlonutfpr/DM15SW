import { createContext, useContext, useEffect, useState } from 'react';
import { lerFavoritos, salvarFavoritos } from '../services/favoritos';

// Na Aula 13 os favoritos moravam só na memória: recarregou, sumiram. O
// contexto continua o mesmo para quem usa; o que muda é que ele agora lê e
// grava no dispositivo, pelo serviço. As telas não sabem que o AsyncStorage
// existe.
const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  // Guardamos só os ids. O produto completo vem do ProdutosContext.
  const [favoritos, setFavoritos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Ao montar: lê o que foi salvo. Array vazio, roda uma vez.
  useEffect(() => {
    lerFavoritos().then((lista) => {
      setFavoritos(lista);
      setCarregado(true);
    });
  }, []);

  // A cada mudança: grava, mas só depois da primeira leitura.
  //
  // Sem o `carregado`, este efeito também roda ao montar, com a lista ainda
  // vazia, e manda gravar [] enquanto a leitura não terminou. Nesta ordem dos
  // efeitos dá certo por sorte: a leitura foi pedida antes e o AsyncStorage
  // atende na ordem. Basta alguém pôr este efeito ACIMA do outro para a lista
  // vazia apagar o que estava salvo. É o erro clássico do código gerado; o
  // passo 4 do roteiro o provoca. O `carregado` faz o código não depender da
  // ordem.
  useEffect(() => {
    if (carregado) salvarFavoritos(favoritos);
  }, [favoritos, carregado]);

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

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (contexto === null) {
    throw new Error('useFavoritos precisa estar dentro de <FavoritosProvider>.');
  }

  return contexto;
}
