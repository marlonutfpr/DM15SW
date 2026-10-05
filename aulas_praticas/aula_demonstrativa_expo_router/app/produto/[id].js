import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { produtos, formatarPreco, nomeDaCategoria } from '../../dados/produtos';
import Botao from '../../components/Botao';
import Etiqueta from '../../components/Etiqueta';

// Rota dinâmica "/produto/<qualquer coisa>". O que vier na URL chega como o
// parâmetro `id`, porque o arquivo se chama [id].js.
export default function DetalheProduto() {
  const { id } = useLocalSearchParams();

  // Parâmetros chegam SEMPRE COMO TEXTO, e os ids dos produtos são números.
  // Sem o Number(id), a comparação '3' === 3 falha, `produto` fica undefined
  // e a tela quebra em `produto.nome` — o mesmo erro depurado na Aula 11.
  //
  // De propósito, esta tela NÃO trata o produto inexistente: "/produto/999"
  // quebra do mesmo jeito. Mesmo erro, causa diferente.
  const produto = produtos.find((p) => p.id === Number(id));

  // Estado local: vive só enquanto esta tela existe. A aba Favoritos não
  // enxerga este valor — é a pergunta que abre a Aula 13.
  const [favorito, setFavorito] = useState(false);

  // Próximo produto do cardápio; depois do último, volta ao primeiro.
  const indice = produtos.indexOf(produto);
  const proximo = produtos[(indice + 1) % produtos.length];

  return (
    <View style={estilos.container}>
      <Text style={estilos.parametro}>Parâmetro recebido: id = "{id}"</Text>

      <View style={estilos.cabecalho}>
        <Text style={estilos.nome}>{produto.nome}</Text>
        <Pressable onPress={() => setFavorito(!favorito)}>
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={28}
            color="#a4492c"
          />
        </Pressable>
      </View>

      <Etiqueta texto={nomeDaCategoria(produto.categoria)} />
      <Text style={estilos.descricao}>{produto.descricao}</Text>
      <Text style={estilos.preco}>{formatarPreco(produto.preco)}</Text>

      {/* Abre o MODAL. Para quem navega, é um link como outro qualquer: a
          apresentação diferente está declarada no layout raiz, não aqui. */}
      <Link href={{ pathname: '/pedido/[id]', params: { id: produto.id } }} asChild>
        <Pressable style={estilos.botaoPedir}>
          <Ionicons name="bag-handle-outline" size={18} color="#ffffff" />
          <Text style={estilos.textoBotaoPedir}>Fazer pedido</Text>
        </Pressable>
      </Link>

      <View style={estilos.navegacao}>
        <Text style={estilos.secao}>Próximo produto: {proximo.nome}</Text>

        <View style={estilos.linha}>
          {/* push EMPILHA uma nova tela: o voltar retorna para este produto. */}
          <View style={estilos.coluna}>
            <Botao
              titulo="push"
              icone="layers-outline"
              aoTocar={() => router.push(`/produto/${proximo.id}`)}
            />
          </View>

          {/* replace SUBSTITUI, sem permitir voltar: este produto sai da
              pilha, e o voltar vai para o que estava antes dele. */}
          <View style={estilos.coluna}>
            <Botao
              titulo="replace"
              icone="swap-horizontal"
              variante="secundario"
              aoTocar={() => router.replace(`/produto/${proximo.id}`)}
            />
          </View>
        </View>

        <Text style={estilos.dica}>
          Abra alguns produtos com cada botão e volte: com push, você refaz o
          caminho um a um; com replace, o produto anterior some da pilha.
        </Text>

        {/* Faz o mesmo que o botão voltar do cabeçalho. */}
        <Botao
          titulo="Voltar"
          icone="arrow-back"
          variante="secundario"
          aoTocar={() => router.back()}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
    backgroundColor: '#ffffff',
  },
  parametro: {
    backgroundColor: '#fdf3dc',
    color: '#8a5a00',
    fontSize: 13,
    padding: 10,
    borderRadius: 8,
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
    color: '#6b625c',
  },
  preco: {
    fontSize: 20,
    fontWeight: '600',
    color: '#a4492c',
  },
  botaoPedir: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#a4492c',
    borderRadius: 8,
    paddingVertical: 12,
  },
  textoBotaoPedir: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  navegacao: {
    marginTop: 'auto', // empurra o bloco para o fim da tela
    gap: 10,
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  coluna: {
    flex: 1, // divide a largura em vez de fixar pixels
  },
  secao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b625c',
  },
  dica: {
    fontSize: 13,
    color: '#6b625c',
  },
});
