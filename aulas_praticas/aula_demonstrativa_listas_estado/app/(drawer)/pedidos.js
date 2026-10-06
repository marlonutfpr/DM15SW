import { View, Text, FlatList, StyleSheet } from 'react-native';
import { buscarProduto, formatarPreco } from '../../dados/produtos';
import { usePedidos } from '../../contexts/PedidosContext';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import EstadoVazio from '../../components/EstadoVazio';
import Separador from '../../components/Separador';

// Rota "/pedidos". Esta tela e o modal de pedido não têm pai comum próximo:
// um está no drawer, o outro no Stack raiz. Quem os liga é o PedidosContext.
export default function MeusPedidos() {
  const { pedidos, limparPedidos } = usePedidos();

  // Derivado com reduce: a soma sai da lista, não é outro estado.
  const totalGeral = pedidos.reduce((soma, pedido) => soma + pedido.total, 0);

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.conteudo}
      data={pedidos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => {
        const produto = buscarProduto(item.produtoId);
        // Cartao compacto e sem `aoTocar` nem `aoFavoritar`: o mesmo
        // componente do Cardápio, só desenhando.
        return (
          <Cartao
            nome={`${item.quantidade} x ${produto.nome}`}
            preco={item.total}
            variante="compacto"
          />
        );
      }}
      ListHeaderComponent={
        pedidos.length > 0 && (
          <Text style={estilos.resumo}>
            {pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'} ·{' '}
            {formatarPreco(totalGeral)}
          </Text>
        )
      }
      ListEmptyComponent={
        <EstadoVazio
          icone="receipt-outline"
          titulo="Nenhum pedido ainda"
          texto="Abra um produto, toque em Fazer pedido e confirme: ele aparece aqui."
        />
      }
      // O rodapé fica depois do último item. Aparece só se houver pedidos.
      ListFooterComponent={
        pedidos.length > 0 && (
          <View style={estilos.rodape}>
            <Botao titulo="Limpar pedidos" icone="trash-outline" variante="perigo" aoTocar={limparPedidos} />
          </View>
        )
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
  resumo: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  rodape: {
    marginTop: 20,
  },
});
