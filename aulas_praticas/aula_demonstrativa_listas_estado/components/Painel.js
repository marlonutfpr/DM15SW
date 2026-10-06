import { View, Text, StyleSheet } from 'react-native';

// Composição com `children`. O Painel desenha a moldura — fundo, cantos,
// título — e não sabe o que vai dentro: o conteúdo é tudo o que estiver
// entre <Painel> e </Painel>.
//
//   <Painel titulo="Descrição">
//     <Text>...</Text>
//   </Painel>
//
// É o mesmo mecanismo do FavoritosProvider, que envolve o app inteiro.
export default function Painel({ titulo, children, variante = 'neutro' }) {
  return (
    <View style={[estilos.painel, variante === 'destaque' && estilos.destaque]}>
      {titulo && <Text style={estilos.titulo}>{titulo}</Text>}
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  painel: {
    gap: 8,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    padding: 14,
  },
  destaque: {
    backgroundColor: '#fdf3dc',
  },
  titulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b625c',
    textTransform: 'uppercase',
  },
});
