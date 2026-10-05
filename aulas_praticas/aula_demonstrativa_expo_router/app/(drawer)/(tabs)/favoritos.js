import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Rota "/favoritos" — e não "/(tabs)/favoritos": o grupo não entra na URL.
//
// Tela provisória. O botão Favoritar do detalhe guarda o estado DENTRO
// daquela tela, e esta aba não tem como saber dele. Decidir onde esse estado
// deve morar é a Aula 13.
export default function Favoritos() {
  return (
    <View style={estilos.container}>
      <Ionicons name="heart-outline" size={48} color="#6b625c" />
      <Text style={estilos.titulo}>Nenhum favorito ainda</Text>
      <Text style={estilos.texto}>
        Favorite um produto no detalhe e volte aqui: nada muda. Como esta aba
        sabe o que foi favoritado no Cardápio?
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  texto: {
    fontSize: 14,
    color: '#6b625c',
    textAlign: 'center',
  },
});
