import { Text, StyleSheet } from 'react-native';

// Rótulo pequeno para a categoria do produto. Só recebe e desenha.
export default function Etiqueta({ texto }) {
  return <Text style={estilos.etiqueta}>{texto}</Text>;
}

const estilos = StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start', // não estica até a largura do pai
    backgroundColor: '#f3e2d9',
    color: '#a4492c',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
