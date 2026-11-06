import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Recebe só o número. Não sabe se ele veio de um estado elevado (tela
// "Elevação de estado") ou do contexto (Cardápio): não depende de onde é
// usado.
export default function ContadorFavoritos({ total }) {
  const texto =
    total === 0 ? 'Nenhum favorito' : `${total} ${total === 1 ? 'favorito' : 'favoritos'}`;

  return (
    <View style={estilos.contador}>
      <Ionicons name={total > 0 ? 'heart' : 'heart-outline'} size={16} color="#a4492c" />
      <Text style={estilos.texto}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // não estica até a largura do pai
    gap: 6,
    backgroundColor: '#f3e2d9',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  texto: {
    color: '#a4492c',
    fontSize: 13,
    fontWeight: '600',
  },
});
