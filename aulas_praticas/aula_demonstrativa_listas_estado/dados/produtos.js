/**
 * Dados fixos da Cafeteria UTFPR.
 *
 * Nada aqui vem de fora: buscar de uma API é a Aula 15. Produtos e preços são
 * fictícios.
 *
 * A lista cresceu em relação à Aula 12: com 24 produtos ela passa da altura
 * da tela, e é aí que a FlatList começa a fazer diferença.
 */

// Os ids continuam NÚMEROS. O parâmetro de rota chega como TEXTO, então a tela
// de detalhe converte com Number(id).
export const produtos = [
  { id: 1, nome: 'Café especial', preco: 20, categoria: 'bebidas', descricao: 'Grão da região, coado na hora. Xícara de 200 ml.' },
  { id: 2, nome: 'Espresso', preco: 8, categoria: 'bebidas', descricao: 'Curto e encorpado, tirado na máquina.' },
  { id: 3, nome: 'Cappuccino', preco: 18.5, categoria: 'bebidas', descricao: 'Espresso, leite vaporizado e canela.' },
  { id: 4, nome: 'Pão de queijo', preco: 7.5, categoria: 'salgados', descricao: 'Porção com três unidades, assadas na hora.' },
  { id: 5, nome: 'Coxinha', preco: 9, categoria: 'salgados', descricao: 'Frango desfiado com requeijão.' },
  { id: 6, nome: 'Bolo de cenoura', preco: 12, categoria: 'doces', descricao: 'Fatia com cobertura de chocolate.' },
  { id: 7, nome: 'Latte', preco: 16, categoria: 'bebidas', descricao: 'Espresso com bastante leite vaporizado.' },
  { id: 8, nome: 'Mocha', preco: 19, categoria: 'bebidas', descricao: 'Espresso, chocolate e leite vaporizado.' },
  { id: 9, nome: 'Chá mate', preco: 6, categoria: 'bebidas', descricao: 'Gelado, com limão.' },
  { id: 10, nome: 'Chocolate quente', preco: 14, categoria: 'bebidas', descricao: 'Cremoso, com chantili.' },
  { id: 11, nome: 'Suco de laranja', preco: 10, categoria: 'bebidas', descricao: 'Natural, copo de 300 ml.' },
  { id: 12, nome: 'Água com gás', preco: 5, categoria: 'bebidas', descricao: 'Garrafa de 500 ml.' },
  { id: 13, nome: 'Esfirra de carne', preco: 8.5, categoria: 'salgados', descricao: 'Aberta, com limão à parte.' },
  { id: 14, nome: 'Empada de palmito', preco: 9.5, categoria: 'sazonais', descricao: 'Massa amanteigada.' },
  { id: 15, nome: 'Misto quente', preco: 11, categoria: 'salgados', descricao: 'Pão de forma, presunto e queijo na chapa.' },
  { id: 16, nome: 'Pastel de queijo', preco: 8, categoria: 'salgados', descricao: 'Frito na hora.' },
  { id: 17, nome: 'Quiche de alho-poró', preco: 13, categoria: 'sazonais', descricao: 'Fatia individual.' },
  { id: 18, nome: 'Croissant', preco: 10, categoria: 'salgados', descricao: 'Folhado, com manteiga.' },
  { id: 19, nome: 'Brigadeiro', preco: 4, categoria: 'doces', descricao: 'Unidade, com granulado.' },
  { id: 20, nome: 'Brownie', preco: 9, categoria: 'doces', descricao: 'Com nozes, servido morno.' },
  { id: 21, nome: 'Torta de limão', preco: 13.5, categoria: 'doces', descricao: 'Fatia com merengue maçaricado.' },
  { id: 22, nome: 'Cookie', preco: 7, categoria: 'doces', descricao: 'Gotas de chocolate.' },
  { id: 23, nome: 'Pudim', preco: 10, categoria: 'doces', descricao: 'Fatia, calda de caramelo.' },
  { id: 24, nome: 'Cuca de banana', preco: 11, categoria: 'doces', descricao: 'Receita da região, com farofa doce.' },
];

// "Sazonais" não tem nenhum produto, DE PROPÓSITO: é o filtro que mostra o
// ListEmptyComponent da FlatList no Cardápio.
export const categorias = [
  { id: 'bebidas', nome: 'Bebidas' },
  { id: 'salgados', nome: 'Salgados' },
  { id: 'doces', nome: 'Doces' },
  { id: 'sazonais', nome: 'Sazonais' },
];

// 18.5 vira "R$ 18,50".
export function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// `?.` e `??`: se a categoria não existir na lista, devolve o próprio id em
// vez de quebrar a tela.
export function nomeDaCategoria(id) {
  return categorias.find((categoria) => categoria.id === id)?.nome ?? id;
}

// Devolve undefined quando o id não existe. Quem chama decide o que mostrar.
export function buscarProduto(id) {
  return produtos.find((produto) => produto.id === id);
}
