import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Rota "/navegacao" — destino do drawer. Resume as quatro formas de navegar
// que o app combina, e onde cada uma está.
const FORMAS = [
  {
    id: 'pilha',
    icone: 'layers-outline',
    nome: 'Pilha (Stack)',
    quando: 'Para aprofundar: a nova tela entra por cima, e voltar a remove.',
    onde: 'Cardápio → detalhe do produto.',
  },
  {
    id: 'abas',
    icone: 'albums-outline',
    nome: 'Abas (Tabs)',
    quando: 'Seções principais, sempre visíveis.',
    onde: 'Cardápio e Favoritos.',
  },
  {
    id: 'drawer',
    icone: 'menu',
    nome: 'Menu lateral (Drawer)',
    quando: 'Muitas seções pouco frequentes.',
    onde: 'Sobre a cafeteria, esta tela e o Mapa de rotas.',
  },
  {
    id: 'modal',
    icone: 'browsers-outline',
    nome: 'Modal',
    quando: 'Tarefa curta que interrompe e devolve aonde o usuário estava.',
    onde: 'Fazer pedido, no detalhe do produto.',
  },
];

export default function FormasDeNavegar() {
  return (
    <View style={estilos.container}>
      {FORMAS.map((forma) => (
        <View key={forma.id} style={estilos.cartao}>
          <Ionicons name={forma.icone} size={24} color="#a4492c" />
          <View style={estilos.conteudo}>
            <Text style={estilos.nome}>{forma.nome}</Text>
            <Text style={estilos.texto}>{forma.quando}</Text>
            <Text style={estilos.onde}>{forma.onde}</Text>
          </View>
        </View>
      ))}

      <Text style={estilos.nota}>
        Qual usar em cada parte do produto é decisão do grupo: está no mapa de
        navegação da ADR, não no prompt.
      </Text>
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
  cartao: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    padding: 14,
  },
  conteudo: {
    flex: 1,
    gap: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  texto: {
    fontSize: 13,
    color: '#6b625c',
  },
  onde: {
    fontSize: 13,
    color: '#a4492c',
  },
  nota: {
    fontSize: 13,
    color: '#6b625c',
  },
});
