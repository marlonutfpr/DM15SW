import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { produtos } from '../../dados/produtos';
import Cartao from '../../components/Cartao';
import ContadorFavoritos from '../../components/ContadorFavoritos';
import Painel from '../../components/Painel';
import Separador from '../../components/Separador';

// Rota "/elevacao". O exemplo do slide de elevação de estado, rodando, e de
// propósito SEM Context.
//
// Dois irmãos precisam do mesmo dado: o contador mostra o total, a lista
// mostra e altera. Nenhum dos dois pode guardar o estado, senão o outro não
// enxerga. O estado sobe para o pai comum — esta tela.

const AMOSTRA = produtos.slice(0, 6);

// Filho 2. Recebe o valor e a função que o altera; não tem useState.
function ListaProdutos({ favoritos, aoFavoritar }) {
  return (
    <FlatList
      data={AMOSTRA}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Cartao
          {...item}
          variante="compacto"
          favorito={favoritos.includes(item.id)}
          aoFavoritar={() => aoFavoritar(item.id)}
        />
      )}
      ItemSeparatorComponent={Separador}
    />
  );
}

// O pai: guarda `favoritos` e passa para baixo o valor e a função. É o
// fluxo de mão única: o dado desce por props, o pedido de mudança sobe pela
// função.
export default function ElevacaoDeEstado() {
  const [favoritos, setFavoritos] = useState([]);

  function alternarFavorito(id) {
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((favorito) => favorito !== id)
        : [...anteriores, id]
    );
  }

  return (
    <View style={estilos.container}>
      {/* Filho 1. O mesmo componente do Cardápio. */}
      <ContadorFavoritos total={favoritos.length} />

      <View style={estilos.lista}>
        <ListaProdutos favoritos={favoritos} aoFavoritar={alternarFavorito} />
      </View>

      <Painel titulo="Repare" variante="destaque">
        <Text style={estilos.texto}>
          Favorite algo aqui e abra a aba Favoritos: nada aparece. Este estado
          mora NESTA tela e serve aos dois filhos dela. Para chegar a outras
          telas, ele teria que atravessar layout, drawer e abas, que não o
          usam. Por isso os favoritos do Cardápio moram num Context.
        </Text>
      </Painel>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  lista: {
    flex: 1, // a lista ocupa o que sobra entre o contador e o aviso
  },
  texto: {
    fontSize: 13,
    color: '#8a5a00',
  },
});
