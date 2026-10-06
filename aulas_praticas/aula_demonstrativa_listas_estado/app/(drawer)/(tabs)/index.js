import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { produtos, categorias } from '../../../dados/produtos';
import { useFavoritos } from '../../../contexts/FavoritosContext';
import Cartao from '../../../components/Cartao';
import Filtro from '../../../components/Filtro';
import ContadorFavoritos from '../../../components/ContadorFavoritos';
import EstadoVazio from '../../../components/EstadoVazio';
import Separador from '../../../components/Separador';

// Rota "/" — o Cardápio. Na Aula 12 era um `map` dentro de uma View; agora a
// lista tem 24 produtos e é uma FlatList.
export default function Cardapio() {
  // ESTADO LOCAL: só esta tela usa o filtro. Não há motivo para subir.
  const [categoria, setCategoria] = useState('todos');

  // ESTADO COMPARTILHADO: os favoritos vêm do contexto, não de useState.
  const { favoritos, alternarFavorito, ehFavorito } = useFavoritos();

  // Derivar em vez de guardar: a lista filtrada sai do estado que já existe.
  const visiveis =
    categoria === 'todos'
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoria);

  // O cabeçalho rola junto com a lista. Vai como ELEMENTO (<View>), não como
  // função: assim ele não é desmontado a cada renderização.
  const cabecalho = (
    <View style={estilos.cabecalho}>
      <View style={estilos.filtros}>
        <Filtro
          titulo="Todos"
          ativo={categoria === 'todos'}
          aoTocar={() => setCategoria('todos')}
        />
        {/* Quatro filtros, fixos: aqui `map` basta. */}
        {categorias.map((item) => (
          <Filtro
            key={item.id}
            titulo={item.nome}
            ativo={item.id === categoria}
            aoTocar={() => setCategoria(item.id)}
          />
        ))}
      </View>

      {/* O mesmo ContadorFavoritos da tela "Elevação de estado". Lá o total
          vem do pai; aqui, do contexto. O componente não percebe diferença. */}
      <ContadorFavoritos total={favoritos.length} />
    </View>
  );

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.conteudo}
      data={visiveis}
      // A chave identifica cada item entre uma renderização e outra. Sempre
      // texto: o id é número, então vira String.
      keyExtractor={(item) => String(item.id)}
      // `renderItem` recebe { item } e devolve o componente. {...item}
      // espalha os campos do produto como props do Cartao.
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
      // Experimente o filtro "Sazonais": nenhum produto, e a lista mostra
      // isto sem nenhum `if` na tela.
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
    flexWrap: 'wrap', // quebra a linha quando os filtros não cabem na largura
    gap: 8,
  },
});
