import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Painel from '../../components/Painel';

// Rota "/checklist". O checklist do slide 14, aplicado a este app: cada
// pergunta, e onde está a resposta no código. É o item 3 da atividade.
const ITENS = [
  {
    pergunta: 'Verifica resposta.ok?',
    arquivo: 'services/cep.js, services/produtos.js',
    resposta: 'Os dois serviços lançam um erro quando o status não é 2xx. O de CEP também trata o { "erro": "true" } que o ViaCEP devolve com status 200.',
  },
  {
    pergunta: 'Trata o erro com mensagem ao usuário?',
    arquivo: 'contexts/ProdutosContext.js, components/AvisoDeErro.js',
    resposta: 'O catch troca o erro técnico por uma frase para o usuário, e o AvisoDeErro oferece "Tentar de novo".',
  },
  {
    pergunta: 'Mostra carregamento?',
    arquivo: 'components/Carregando.js, app/(drawer)/entrega.js',
    resposta: 'Cardápio, Favoritos, detalhe e pedido mostram o indicador enquanto a lista não chega. Na Entrega, o botão fica desabilitado durante a busca.',
  },
  {
    pergunta: 'Prevê o estado vazio?',
    arquivo: 'app/(drawer)/(tabs)/index.js, app/(drawer)/entrega.js',
    resposta: 'O filtro "Sazonais" volta vazio sem ser erro. A Entrega, antes da primeira busca, pede um CEP.',
  },
  {
    pergunta: 'useEffect com as dependências corretas?',
    arquivo: 'contexts/FavoritosContext.js, contexts/ProdutosContext.js',
    resposta: '[] para ler ao montar; [favoritos, carregado] para gravar. No ProdutosContext, o [] é de propósito, e o comentário diz por quê.',
  },
  {
    pergunta: 'JSON.parse protegido contra null?',
    arquivo: 'services/favoritos.js, services/pedidos.js',
    resposta: 'texto ? JSON.parse(texto) : []. Na primeira abertura não há nada salvo, e getItem devolve null.',
  },
  {
    pergunta: 'Dados sensíveis fora do AsyncStorage?',
    arquivo: 'app/(drawer)/armazenamento.js',
    resposta: 'Só ids de favoritos e o resumo dos pedidos. Nenhuma senha, token ou chave. A tela "Dados salvos" mostra tudo o que está lá.',
  },
];

export default function Checklist() {
  return (
    // Sete itens fixos: ScrollView com map basta.
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.regra}>
        Use estas perguntas para revisar o código que a IA ajudar a gerar.
      </Text>

      {ITENS.map((item) => (
        <Painel key={item.pergunta}>
          <View style={estilos.topo}>
            <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
            <Text style={estilos.pergunta}>{item.pergunta}</Text>
          </View>
          <Text style={estilos.arquivo}>{item.arquivo}</Text>
          <Text style={estilos.resposta}>{item.resposta}</Text>
        </Painel>
      ))}
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
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pergunta: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  arquivo: {
    fontSize: 12,
    color: '#a4492c',
  },
  resposta: {
    fontSize: 13,
    color: '#6b625c',
  },
});
