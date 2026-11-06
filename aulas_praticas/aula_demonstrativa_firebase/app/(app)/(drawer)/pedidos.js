import { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { ouvirMeusPedidos } from '../../../services/pedidos';
import { formatarPreco } from '../../../dados/formato';
import CartaoPedido from '../../../components/CartaoPedido';
import EstadoVazio from '../../../components/EstadoVazio';
import Separador from '../../../components/Separador';
import Carregando from '../../../components/Carregando';
import AvisoDeErro from '../../../components/AvisoDeErro';

// Rota "/pedidos". Na Aula 15 os pedidos vinham de um contexto gravado no
// AsyncStorage. Agora esta tela escuta o Firestore diretamente, em tempo
// real: o modal grava, e o pedido aparece aqui sem ninguém avisar. Mude o
// status de um pedido pelo console e veja a etiqueta mudar.
export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState(null); // null: ainda não chegou
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Escuta mudanças e devolve a função que encerra a escuta.
    const cancelar = ouvirMeusPedidos(
      (lista) => {
        setPedidos(lista);
        setErro(null);
      },
      (e) => {
        // failed-precondition: falta o índice composto; o link para criá-lo
        // aparece no console do Metro (ou do navegador).
        setErro(
          e.code === 'failed-precondition'
            ? 'Esta consulta precisa de um índice. O link para criá-lo está no console.'
            : 'Não foi possível carregar seus pedidos.'
        );
        console.warn(e.message);
      }
    );
    // Sem devolver cancelar, a escuta continuaria depois de a tela fechar:
    // vazamento de memória e leituras contabilizadas.
    return cancelar;
  }, []);

  if (erro) return <AvisoDeErro mensagem={erro} />;
  if (pedidos === null) return <Carregando texto="Buscando seus pedidos..." />;

  const totalGeral = pedidos.reduce((soma, pedido) => soma + pedido.total, 0);

  return (
    <FlatList
      style={estilos.lista}
      contentContainerStyle={estilos.conteudo}
      data={pedidos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CartaoPedido {...item} />}
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
          texto="Abra um produto, toque em Fazer pedido e confirme: ele aparece aqui, em qualquer aparelho em que você entrar."
        />
      }
      // Sem "Limpar pedidos": a regra diz `allow update, delete: if false`.
      // Pedido feito não muda pelo app.
      ListFooterComponent={
        pedidos.length === 20 && (
          <Text style={estilos.rodape}>Mostrando os 20 mais recentes.</Text>
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
    marginTop: 16,
    fontSize: 13,
    color: '#6b625c',
    textAlign: 'center',
  },
});
