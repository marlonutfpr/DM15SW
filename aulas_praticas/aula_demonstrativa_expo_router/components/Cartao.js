import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatarPreco } from '../dados/produtos';

// Cartão de produto. Só recebe e desenha: quem decide para onde o toque
// leva é a tela, que envolve o cartão em um Link.
export default function Cartao({ nome, preco }) {
  return (
    <View style={estilos.cartao}>
      <Text style={estilos.nome}>{nome}</Text>
      <Text style={estilos.preco}>{formatarPreco(preco)}</Text>
      {/* A seta avisa que o cartão leva a outra tela. */}
      <Ionicons name="chevron-forward" size={18} color="#6b625c" />
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  nome: {
    flex: 1, // ocupa a largura que sobra; preço e seta ficam com o tamanho deles
    fontSize: 16,
    fontWeight: '600',
  },
  preco: {
    fontSize: 15,
    color: '#a4492c',
    fontWeight: '600',
  },
});
