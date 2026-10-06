import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { buscarProduto, formatarPreco, nomeDaCategoria } from '../../dados/produtos';
import { useFavoritos } from '../../contexts/FavoritosContext';
import Botao from '../../components/Botao';
import BotaoFavorito from '../../components/BotaoFavorito';
import Etiqueta from '../../components/Etiqueta';
import EstadoVazio from '../../components/EstadoVazio';
import Painel from '../../components/Painel';

// Rota dinâmica "/produto/<id>".
export default function DetalheProduto() {
  const { id } = useLocalSearchParams();

  // Parâmetros chegam SEMPRE COMO TEXTO; os ids dos produtos são números.
  const produto = buscarProduto(Number(id));

  // Na Aula 12 o favorito era um useState AQUI, e morria com a tela. Agora
  // vem do contexto: o mesmo coração aparece cheio no Cardápio e na aba
  // Favoritos.
  const { ehFavorito, alternarFavorito } = useFavoritos();

  // "/produto/999" quebrava a tela na Aula 12. A pergunta "de quem é a
  // responsabilidade?" tem resposta: desta tela, que recebe o id.
  if (!produto) {
    return (
      <EstadoVazio
        icone="alert-circle-outline"
        titulo="Produto não encontrado"
        texto={`Nenhum produto tem o id "${id}".`}
      >
        <Botao titulo="Voltar" variante="secundario" aoTocar={() => router.back()} />
      </EstadoVazio>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.nome}>{produto.nome}</Text>
        <BotaoFavorito
          ativo={ehFavorito(produto.id)}
          aoTocar={() => alternarFavorito(produto.id)}
          tamanho={28}
        />
      </View>

      <Etiqueta texto={nomeDaCategoria(produto.categoria)} />

      {/* Painel com `children`: a moldura é do Painel, o conteúdo é desta
          tela. */}
      <Painel titulo="Descrição">
        <Text style={estilos.descricao}>{produto.descricao}</Text>
      </Painel>

      <Painel titulo="Preço">
        <Text style={estilos.preco}>{formatarPreco(produto.preco)}</Text>
      </Painel>

      <View style={estilos.acoes}>
        {/* Abre o modal. Ao confirmar, o pedido vai para o PedidosContext e
            aparece em "Meus pedidos", no drawer. */}
        <Botao
          titulo="Fazer pedido"
          icone="bag-handle-outline"
          aoTocar={() =>
            router.push({ pathname: '/pedido/[id]', params: { id: produto.id } })
          }
        />
        <Botao titulo="Voltar" icone="arrow-back" variante="secundario" aoTocar={() => router.back()} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nome: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
  },
  descricao: {
    fontSize: 15,
  },
  preco: {
    fontSize: 20,
    fontWeight: '600',
    color: '#a4492c',
  },
  acoes: {
    marginTop: 'auto', // empurra os botões para o fim da tela
    gap: 10,
  },
});
