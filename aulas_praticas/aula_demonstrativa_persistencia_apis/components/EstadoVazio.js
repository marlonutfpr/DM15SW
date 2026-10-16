import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// O que aparece quando não há nada para mostrar. É o ListEmptyComponent de
// três listas diferentes e a tela de produto inexistente: um componente,
// vários usos.
//
// `children` é opcional: serve para pôr uma ação embaixo do texto.
export default function EstadoVazio({ icone = 'file-tray-outline', titulo, texto, children }) {
  return (
    <View style={estilos.container}>
      <Ionicons name={icone} size={48} color="#6b625c" />
      <Text style={estilos.titulo}>{titulo}</Text>
      {texto && <Text style={estilos.texto}>{texto}</Text>}
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  texto: {
    fontSize: 14,
    color: '#6b625c',
    textAlign: 'center',
  },
});
