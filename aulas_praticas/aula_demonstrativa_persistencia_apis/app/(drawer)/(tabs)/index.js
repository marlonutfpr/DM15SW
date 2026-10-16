import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { categorias } from '../../../dados/categorias';
import { useProdutos } from '../../../contexts/ProdutosContext';
import { useFavoritos } from '../../../contexts/FavoritosContext';
import Cartao from '../../../components/Cartao';
import Filtro from '../../../components/Filtro';
import ContadorFavoritos from '../../../components/ContadorFavoritos';
import EstadoVazio from '../../../components/EstadoVazio';
import Separador from '../../../components/Separador';
import Carregando from '../../../components/Carregando';
import AvisoDeErro from '../../../components/AvisoDeErro';

// Rota "/" — o Cardápio. Na Aula 13 a lista vinha de dados/produtos.js, fixa
// no código. Agora vem da API, pelo ProdutosContext, e a tela tem de dar conta
// dos estados da requisição.
export default function Cardapio() {
  const [categoria, setCategoria] = useState('todos');
  const { produtos, carregando, erro, recarregar } = useProdutos();
  const { favoritos, alternarFavorito, ehFavorito } = useFavoritos();

  // Um estado por vez, nesta ordem: carregando, erro, e só então os dados.
  // O código gerado costuma pular os dois primeiros.
  if (carregando) return <Carregando texto="Buscando o cardápio..." />;
  if (erro) return <AvisoDeErro mensagem={erro} aoTentarDeNovo={recarregar} />;

  const visiveis =
    categoria === 'todos'
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoria);

  const cabecalho = (
    <View style={estilos.cabecalho}>
      <View style={estilos.filtros}>
        <Filtro
          titulo="Todos"
          ativo={categoria === 'todos'}
          aoTocar={() => setCategoria('todos')}
        />
        {categorias.map((item) => (
          <Filtro
            key={item.id}
            titulo={item.nome}
            ativo={item.id === categoria}
            aoTocar={() => setCategoria(item.id)}
          />
        ))}
      </View>

      <ContadorFavoritos total={favoritos.length} />
    </View>
  );

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.conteudo}
      data={visiveis}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Cartao
          {...item}
          favorito={ehFavorito(item.id)}
          aoFavoritar={() => alternarFavorito(item.id)}
          aoTocar={() =>
            router.push({ pathname: '/produto/[id]', params: { id: item.id } })
          }
        />
      )}
      ListHeaderComponent={cabecalho}
      // O ESTADO VAZIO não é erro: a requisição deu certo e não veio nada
      // nesta categoria. Experimente "Sazonais".
      ListEmptyComponent={
        <EstadoVazio
          icone="search-outline"
          titulo="Nenhum produto encontrado."
          texto="Não há produtos nesta categoria por enquanto."
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
  cabecalho: {
    gap: 12,
    marginBottom: 12,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
