import { View, Text, FlatList, StyleSheet } from 'react-native';
import { formatarPreco } from '../../dados/formato';
import { usePedidos } from '../../contexts/PedidosContext';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import EstadoVazio from '../../components/EstadoVazio';
import Separador from '../../components/Separador';

// Rota "/pedidos". Esta tela e o modal de pedido não têm pai comum próximo:
// um está no drawer, o outro no Stack raiz. Quem os liga é o PedidosContext,
// que agora também guarda os pedidos no dispositivo.
//
// Esta tela NÃO depende da API: cada pedido guarda o próprio nome. Desligue a
// internet e abra: o Cardápio mostra o erro, e os pedidos continuam aqui.
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
      // Cartao compacto e sem `aoTocar` nem `aoFavoritar`: o mesmo
      // componente do Cardápio, só desenhando.
      renderItem={({ item }) => (
        <Cartao
          nome={`${item.quantidade} x ${item.nome}`}
          preco={item.total}
          variante="compacto"
        />
      )}
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
          texto="Abra um produto, toque em Fazer pedido e confirme: ele aparece aqui, e continua aqui depois de fechar o app."
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
