import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Painel from '../../components/Painel';

// Rota "/estado". Responde, para este app, à pergunta da aula: onde mora
// cada estado, e por quê. É o parágrafo de justificativa pedido na
// atividade, em forma de tela.

const ONDE = {
  local: { rotulo: 'Local', cor: '#2e7d32' },
  elevado: { rotulo: 'Elevado', cor: '#8a5a00' },
  contexto: { rotulo: 'Context', cor: '#a4492c' },
};

const ESTADOS = [
  {
    nome: 'categoria (filtro)',
    onde: 'local',
    arquivo: 'app/(drawer)/(tabs)/index.js',
    porque: 'Só o Cardápio usa. Trocar de aba e voltar mantém o filtro, porque as abas não desmontam a tela.',
  },
  {
    nome: 'quantidade, confirmado',
    onde: 'local',
    arquivo: 'app/pedido/[id].js',
    porque: 'Só interessam ao modal enquanto ele está aberto. Fechou, podem sumir.',
  },
  {
    nome: 'modo, contagem',
    onde: 'local',
    arquivo: 'app/(drawer)/listas.js',
    porque: 'Só a tela de comparação usa.',
  },
  {
    nome: 'favoritos (demonstração)',
    onde: 'elevado',
    arquivo: 'app/(drawer)/elevacao.js',
    porque: 'Dois irmãos — contador e lista — precisam do mesmo dado. Sobe para o pai comum, e nada além disso.',
  },
  {
    nome: 'favoritos',
    onde: 'contexto',
    arquivo: 'contexts/FavoritosContext.js',
    porque: 'Cardápio, aba Favoritos, detalhe e o selo da aba. Elevar até o pai comum faria o dado atravessar layouts que não o usam.',
  },
  {
    nome: 'pedidos',
    onde: 'contexto',
    arquivo: 'contexts/PedidosContext.js',
    porque: 'O modal escreve e "Meus pedidos", no drawer, lê. Estão em navegadores diferentes.',
  },
];

export default function OndeMoraCadaEstado() {
  return (
    // Seis itens fixos e conhecidos: ScrollView com map é adequado. FlatList
    // é para lista longa ou de tamanho desconhecido.
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.regra}>
        O estado mora no componente mais próximo que precisa dele. Comece
        local; suba só quando precisar.
      </Text>

      {ESTADOS.map((estado) => (
        <Painel key={estado.nome}>
          <View style={estilos.topo}>
            <Text style={estilos.nome}>{estado.nome}</Text>
            <Text style={[estilos.selo, { backgroundColor: ONDE[estado.onde].cor }]}>
              {ONDE[estado.onde].rotulo}
            </Text>
          </View>
          <Text style={estilos.arquivo}>{estado.arquivo}</Text>
          <Text style={estilos.porque}>{estado.porque}</Text>
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
    justifyContent: 'space-between',
    gap: 8,
  },
  nome: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  selo: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  arquivo: {
    fontSize: 12,
    color: '#a4492c',
  },
  porque: {
    fontSize: 13,
    color: '#6b625c',
  },
});
