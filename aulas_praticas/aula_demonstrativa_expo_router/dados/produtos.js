/**
 * Dados fixos da Cafeteria UTFPR.
 *
 * Nada aqui vem de fora: buscar de uma API é a Aula 15, e do Firestore, a 18.
 * Hoje o assunto é só navegação. Produtos e preços são fictícios.
 */

// Os ids são NÚMEROS de propósito. O parâmetro de rota chega como TEXTO,
// então a tela de detalhe precisa converter: 3 === '3' é falso.
export const produtos = [
  {
    id: 1,
    nome: 'Café especial',
    preco: 20,
    categoria: 'bebidas',
    descricao: 'Grão da região, coado na hora. Xícara de 200 ml.',
  },
  {
    id: 2,
    nome: 'Espresso',
    preco: 8,
    categoria: 'bebidas',
    descricao: 'Curto e encorpado, tirado na máquina.',
  },
  {
    id: 3,
    nome: 'Cappuccino',
    preco: 18.5,
    categoria: 'bebidas',
    descricao: 'Espresso, leite vaporizado e canela.',
  },
  {
    id: 4,
    nome: 'Pão de queijo',
    preco: 7.5,
    categoria: 'salgados',
    descricao: 'Porção com três unidades, assadas na hora.',
  },
  {
    id: 5,
    nome: 'Coxinha',
    preco: 9,
    categoria: 'salgados',
    descricao: 'Frango desfiado com requeijão.',
  },
  {
    id: 6,
    nome: 'Bolo de cenoura',
    preco: 12,
    categoria: 'doces',
    descricao: 'Fatia com cobertura de chocolate.',
  },
];

export const categorias = [
  { id: 'bebidas', nome: 'Bebidas' },
  { id: 'salgados', nome: 'Salgados' },
  { id: 'doces', nome: 'Doces' },
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
