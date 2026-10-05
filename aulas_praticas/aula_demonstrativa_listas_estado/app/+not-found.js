import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Renderizado quando NENHUM arquivo de app/ casa com o caminho pedido.
// Sem este arquivo, o usuário vê a tela de erro do framework.
export default function NaoEncontrado() {
  return (
    <View style={estilos.container}>
      <Ionicons name="alert-circle-outline" size={48} color="#8a5a00" />
      <Text style={estilos.titulo}>Esta tela não existe.</Text>
      <Text style={estilos.texto}>
        Nenhum arquivo em app/ responde por este caminho.
      </Text>
      <Link href="/" style={estilos.link}>Voltar ao cardápio</Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
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
  link: {
    color: '#a4492c',
    fontSize: 16,
    fontWeight: '600',
  },
});
