import { Text, Pressable, StyleSheet } from 'react-native';

// Um chip de filtro. Na Aula 12 este código estava repetido dentro do
// Cardápio (uma vez para "Todos", outra para as categorias). Extraído, a tela
// só diz QUAL filtro está ativo.
export default function Filtro({ titulo, ativo = false, aoTocar }) {
  return (
    <Pressable style={[estilos.filtro, ativo && estilos.filtroAtivo]} onPress={aoTocar}>
      <Text style={[estilos.texto, ativo && estilos.textoAtivo]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  filtro: {
    borderWidth: 1,
    borderColor: '#a4492c',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filtroAtivo: {
    backgroundColor: '#a4492c',
  },
  texto: {
    color: '#a4492c',
    fontSize: 14,
  },
  textoAtivo: {
    color: '#ffffff',
  },
});
