import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { produtos, categorias } from '../../../dados/produtos';
import Cartao from '../../../components/Cartao';

// Rota "/" — o index do grupo (tabs) é a primeira tela do app.
export default function Cardapio() {
  // Estado local da tela. Troque de aba e volte: o filtro continua aqui,
  // porque as abas mantêm cada tela montada.
  const [categoria, setCategoria] = useState('todos');

  // Derivar em vez de guardar: a lista filtrada sai do estado que já existe.
  const produtosVisiveis =
    categoria === 'todos'
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoria);

  return (
    <View style={estilos.container}>
      <View style={estilos.filtros}>
        <Pressable
          style={[estilos.filtro, categoria === 'todos' && estilos.filtroAtivo]}
          onPress={() => setCategoria('todos')}
        >
          <Text style={[estilos.textoFiltro, categoria === 'todos' && estilos.textoFiltroAtivo]}>
            Todos
          </Text>
        </Pressable>

        {categorias.map((item) => (
          <Pressable
            key={item.id}
            style={[estilos.filtro, item.id === categoria && estilos.filtroAtivo]}
            onPress={() => setCategoria(item.id)}
          >
            <Text style={[estilos.textoFiltro, item.id === categoria && estilos.textoFiltroAtivo]}>
              {item.nome}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista pequena e fixa, então `map` basta. Lista longa é FlatList,
          na Aula 13. */}
      {produtosVisiveis.map((produto) => (
        // `asChild` faz o Pressable funcionar como o link: é assim que um
        // cartão inteiro vira navegação.
        //
        // O destino vai como objeto: `pathname` é a rota, com o [id] do nome
        // do arquivo, e `params` preenche o colchete. Passa-se o
        // identificador, não o produto inteiro — a tela de destino busca os
        // dados pelo id.
        <Link
          key={produto.id}
          href={{ pathname: '/produto/[id]', params: { id: produto.id } }}
          asChild
        >
          <Pressable>
            <Cartao nome={produto.nome} preco={produto.preco} />
          </Pressable>
        </Link>
      ))}

      <View style={estilos.experimentos}>
        <Text style={estilos.secao}>Experimentos de navegação</Text>

        {/* Link simples, renderizado como texto. O destino é uma tela do
            drawer, fora do grupo (tabs). */}
        <Link href="/sobre" style={estilos.link}>Sobre a cafeteria</Link>

        {/* Nenhum arquivo responde por este caminho: aparece o +not-found. */}
        <Link href="/rota-que-nao-existe" style={estilos.link}>
          Abrir uma rota que não existe
        </Link>

        {/* A rota EXISTE: [id].js casa com qualquer valor. O que não existe
            é o produto 999 — e a tela de detalhe não trata esse caso. */}
        <Link href="/produto/999" style={estilos.link}>
          Abrir um produto que não existe (tela vermelha)
        </Link>
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
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap', // quebra a linha quando os filtros não cabem na largura
    gap: 8,
    marginBottom: 4,
  },
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
  textoFiltro: {
    color: '#a4492c',
    fontSize: 14,
  },
  textoFiltroAtivo: {
    color: '#ffffff',
  },
  experimentos: {
    marginTop: 'auto', // empurra o bloco para o fim da tela
    gap: 8,
  },
  secao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b625c',
  },
  link: {
    color: '#a4492c',
    fontSize: 15,
  },
});
