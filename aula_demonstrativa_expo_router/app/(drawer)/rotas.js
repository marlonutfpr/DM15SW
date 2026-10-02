import { View, Text, StyleSheet } from 'react-native';

// Rota "/rotas". Lista qual arquivo de app/ responde por qual endereço.

const ROTAS = [
  { arquivo: '(drawer)/(tabs)/index.js', url: '/' },
  { arquivo: '(drawer)/(tabs)/favoritos.js', url: '/favoritos' },
  { arquivo: '(drawer)/sobre.js', url: '/sobre' },
  { arquivo: '(drawer)/navegacao.js', url: '/navegacao' },
  { arquivo: '(drawer)/rotas.js', url: '/rotas' },
  { arquivo: 'produto/[id].js', url: '/produto/3' },
  { arquivo: 'pedido/[id].js', url: '/pedido/3' },
];

const NAO_SAO_ROTAS = [
  { arquivo: '_layout.js', papel: 'Stack raiz' },
  { arquivo: '(drawer)/_layout.js', papel: 'o drawer' },
  { arquivo: '(drawer)/(tabs)/_layout.js', papel: 'as abas' },
  { arquivo: '+not-found.js', papel: 'rota inexistente' },
];

export default function MapaDeRotas() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.secao}>Arquivos de app/ que são rotas</Text>
      {ROTAS.map((rota) => (
        <View key={rota.arquivo} style={estilos.linha}>
          <Text style={estilos.arquivo}>{rota.arquivo}</Text>
          <Text style={estilos.url}>{rota.url}</Text>
        </View>
      ))}

      <Text style={estilos.secao}>Arquivos que não são rotas</Text>
      {NAO_SAO_ROTAS.map((item) => (
        <View key={item.arquivo} style={estilos.linha}>
          <Text style={estilos.arquivo}>{item.arquivo}</Text>
          <Text style={estilos.papel}>{item.papel}</Text>
        </View>
      ))}

      <Text style={estilos.nota}>
        Os grupos (drawer) e (tabs) organizam arquivos e não aparecem em
        nenhum endereço.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 6,
    backgroundColor: '#ffffff',
  },
  secao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b625c',
    marginTop: 8,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e2dc',
  },
  arquivo: {
    flex: 1,
    fontSize: 13,
  },
  url: {
    fontSize: 13,
    fontWeight: '600',
    color: '#a4492c',
  },
  papel: {
    fontSize: 13,
    color: '#6b625c',
  },
  nota: {
    fontSize: 13,
    color: '#6b625c',
    marginTop: 8,
  },
});
