import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { produtos } from '../../../dados/produtos';
import { useFavoritos } from '../../../contexts/FavoritosContext';
import Cartao from '../../../components/Cartao';
import EstadoVazio from '../../../components/EstadoVazio';
import Separador from '../../../components/Separador';

// Rota "/favoritos". Na Aula 12 esta aba era sempre vazia: o favorito ficava
// preso dentro da tela de detalhe. Agora as duas telas leem o MESMO estado,
// o do FavoritosProvider.
export default function Favoritos() {
  const { favoritos, alternarFavorito } = useFavoritos();

  // O contexto guarda só os ids; os produtos completos saem dos dados.
  // Derivado a cada renderização — não é outro estado.
  const itens = produtos.filter((produto) => favoritos.includes(produto.id));

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.conteudo}
      data={itens}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Cartao
          {...item}
          // Aqui todos são favoritos: tocar no coração tira o item da lista.
          favorito
          aoFavoritar={() => alternarFavorito(item.id)}
          aoTocar={() =>
            router.push({ pathname: '/produto/[id]', params: { id: item.id } })
          }
        />
      )}
      ListEmptyComponent={
        <EstadoVazio
          icone="heart-outline"
          titulo="Nenhum favorito ainda"
          texto="Toque no coração de um produto no Cardápio ou no detalhe: ele aparece aqui."
        />
      }
      ItemSeparatorComponent={Separador}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    padding: 16,
  },
});
