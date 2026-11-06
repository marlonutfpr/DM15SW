import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// O estado de CARREGANDO de uma requisição. Ocupa a tela toda e centraliza o
// indicador; o texto é opcional.
export default function Carregando({ texto }) {
  return (
    <View style={estilos.container}>
      <ActivityIndicator size="large" color="#a4492c" />
      {texto && <Text style={estilos.texto}>{texto}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  texto: {
    fontSize: 14,
    color: '#6b625c',
  },
});
