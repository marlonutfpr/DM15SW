import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useProdutos } from '../../../contexts/ProdutosContext';
import { useFavoritos } from '../../../contexts/FavoritosContext';
import Cartao from '../../../components/Cartao';
import EstadoVazio from '../../../components/EstadoVazio';
import Separador from '../../../components/Separador';
import Carregando from '../../../components/Carregando';
import AvisoDeErro from '../../../components/AvisoDeErro';

// Rota "/favoritos". Os ids vêm do FavoritosContext, que agora sobrevive ao
// fechamento do app. Os produtos vêm da API: esta aba também depende da
// requisição, e também trata os estados dela.
export default function Favoritos() {
  const { favoritos, alternarFavorito } = useFavoritos();
  const { produtos, carregando, erro, recarregar } = useProdutos();

  if (carregando) return <Carregando />;
  if (erro) return <AvisoDeErro mensagem={erro} aoTentarDeNovo={recarregar} />;

  // O contexto guarda só os ids; os produtos completos saem da API.
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
          texto="Toque no coração de um produto no Cardápio ou no detalhe: ele aparece aqui, e continua aqui depois de fechar o app."
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
