import { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { listarPorCategoria, atualizarPreco, buscarProduto } from '../../../services/produtos';
import {
  listarMeusPedidos,
  listarTodosOsPedidos,
  criarPedidoEmNomeDeOutro,
} from '../../../services/pedidos';
import Botao from '../../../components/Botao';
import Painel from '../../../components/Painel';

// Rota "/regras". Cada botão faz uma operação de verdade no Firestore e
// mostra se ela foi ACEITA ou NEGADA. Rode antes e depois de publicar
// firestore.rules: com o banco em modo de teste, tudo passa.
//
// Não é uma tela do app da cafeteria. Existe para a aula, como as telas de
// demonstração das Aulas 13 e 15.
const TESTES = [
  {
    id: 'categoria',
    titulo: 'Bebidas por preço',
    slide: 'Slide 13',
    esperado: 'Aceita. Na primeira vez, pede o índice composto.',
    executar: async () => {
      const lista = await listarPorCategoria('bebidas');
      return `${lista.length} produtos, do mais barato (${lista[0]?.nome}) ao mais caro.`;
    },
  },
  {
    id: 'meus',
    titulo: 'Só os meus pedidos',
    slide: 'Slide 24',
    esperado: 'Aceita: a consulta pede o que a regra libera.',
    executar: async () => {
      const lista = await listarMeusPedidos();
      return `${lista.length} pedidos seus.`;
    },
  },
  {
    id: 'todos',
    titulo: 'Todos os pedidos, sem filtro',
    slide: 'Slide 24',
    esperado: 'Negada: regra não é filtro.',
    executar: async () => {
      const lista = await listarTodosOsPedidos();
      return `${lista.length} pedidos de todo mundo. A regra está aberta!`;
    },
  },
  {
    id: 'outro',
    titulo: 'Pedido em nome de outra pessoa',
    slide: 'Slide 23',
    esperado: 'Negada: usuarioId precisa ser o seu uid.',
    executar: async () => {
      await criarPedidoEmNomeDeOutro();
      return 'Gravado em nome de "outra-pessoa". A regra está aberta!';
    },
  },
  {
    id: 'cardapio',
    titulo: 'Alterar um preço do cardápio',
    slide: 'Slide 22',
    esperado: 'Negada: produtos só se alteram pelo console.',
    executar: async () => {
      // Grava o MESMO preço que já está lá: se a regra deixar passar, o
      // cardápio não muda.
      const produto = await buscarProduto('p1');
      await atualizarPreco('p1', produto.preco);
      return 'Preço gravado. A regra está aberta!';
    },
  },
];

export default function ConsultasERegras() {
  // Um resultado por teste: { carregando } ou { ok, texto }.
  const [resultados, setResultados] = useState({});

  async function rodar(teste) {
    setResultados((r) => ({ ...r, [teste.id]: { carregando: true } }));
    try {
      const texto = await teste.executar();
      setResultados((r) => ({ ...r, [teste.id]: { ok: true, texto } }));
    } catch (e) {
      // Aqui o código do erro É o assunto, então ele aparece na tela.
      setResultados((r) => ({ ...r, [teste.id]: { ok: false, texto: e.code ?? e.message } }));
      if (e.code === 'failed-precondition') console.warn(e.message); // traz o link do índice
    }
  }

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.regra}>
        O Firestore não esconde o que você não pode ler: recusa a operação
        inteira.
      </Text>

      {TESTES.map((teste) => {
        const resultado = resultados[teste.id];
        return (
          <Painel key={teste.id} titulo={teste.slide}>
            <Text style={estilos.titulo}>{teste.titulo}</Text>
            <Text style={estilos.esperado}>Esperado: {teste.esperado}</Text>

            {resultado?.carregando && <ActivityIndicator color="#a4492c" />}
            {resultado && !resultado.carregando && (
              <View style={estilos.resultado}>
                <Ionicons
                  name={resultado.ok ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={resultado.ok ? '#2e7d32' : '#b3261e'}
                />
                <Text style={[estilos.texto, { color: resultado.ok ? '#2e7d32' : '#b3261e' }]}>
                  {resultado.ok ? 'Aceita. ' : 'Negada: '}
                  {resultado.texto}
                </Text>
              </View>
            )}

            <Botao
              titulo="Executar"
              variante="secundario"
              icone="play"
              aoTocar={() => rodar(teste)}
              desabilitado={resultado?.carregando}
            />
          </Painel>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    padding: 16,
    gap: 10,
  },
  regra: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
  },
  esperado: {
    fontSize: 13,
    color: '#6b625c',
  },
  resultado: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  texto: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});
