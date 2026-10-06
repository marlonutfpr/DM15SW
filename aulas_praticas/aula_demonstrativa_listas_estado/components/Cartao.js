import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatarPreco, nomeDaCategoria } from '../dados/produtos';
import BotaoFavorito from './BotaoFavorito';

// Cartão de produto. Só recebe e desenha: para onde o toque leva e o que o
// coração faz, quem decide é a tela, pelas props `aoTocar` e `aoFavoritar`.
//
// As props têm os mesmos nomes dos campos do produto. Por isso a lista pode
// escrever <Cartao {...item} />: o espalhamento vira nome, preco, categoria.
// Campos que o cartão não usa (id, descricao) chegam e são ignorados.
export default function Cartao({
  nome,
  preco,
  categoria,
  favorito = false,
  aoTocar, // sem esta prop, o cartão não é tocável e não mostra a seta
  aoFavoritar, // sem esta prop, o coração não aparece
  variante = 'completo', // 'completo' ou 'compacto'
}) {
  const compacto = variante === 'compacto';

  return (
    <View style={[estilos.cartao, compacto && estilos.cartaoCompacto]}>
      {/* A área de texto e o coração são IRMÃOS, não um dentro do outro:
          tocar no coração não abre o detalhe. */}
      <Pressable style={estilos.area} onPress={aoTocar} disabled={!aoTocar}>
        <View style={estilos.textos}>
          <Text style={[estilos.nome, compacto && estilos.nomeCompacto]}>{nome}</Text>
          {!compacto && <Text style={estilos.categoria}>{nomeDaCategoria(categoria)}</Text>}
        </View>
        <Text style={estilos.preco}>{formatarPreco(preco)}</Text>
        {/* A seta avisa que o cartão leva a outra tela. */}
        {aoTocar && <Ionicons name="chevron-forward" size={18} color="#6b625c" />}
      </Pressable>

      {aoFavoritar && <BotaoFavorito ativo={favorito} aoTocar={aoFavoritar} />}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cartaoCompacto: {
    paddingVertical: 8,
  },
  area: {
    flex: 1, // ocupa a largura que sobra; o coração fica com o tamanho dele
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  nomeCompacto: {
    fontSize: 15,
  },
  categoria: {
    fontSize: 12,
    color: '#6b625c',
  },
  preco: {
    fontSize: 15,
    color: '#a4492c',
    fontWeight: '600',
  },
});
