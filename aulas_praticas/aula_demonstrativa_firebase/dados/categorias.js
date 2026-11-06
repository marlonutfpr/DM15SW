/**
 * O que continua fixo no código.
 *
 * Os produtos saíram daqui: agora vêm de uma API, por services/produtos.js.
 * As categorias ficam porque são poucas, mudam pouco e o filtro do Cardápio
 * precisa delas antes de a lista chegar.
 */

// "Sazonais" não tem nenhum produto na API, DE PROPÓSITO: é o filtro que
// mostra o ListEmptyComponent da FlatList no Cardápio.
export const categorias = [
  { id: 'bebidas', nome: 'Bebidas' },
  { id: 'salgados', nome: 'Salgados' },
  { id: 'doces', nome: 'Doces' },
  { id: 'sazonais', nome: 'Sazonais' },
];

// `?.` e `??`: se a categoria não existir na lista, devolve o próprio id em
// vez de quebrar a tela. Com a fakestoreapi, aparece "electronics".
export function nomeDaCategoria(id) {
  return categorias.find((categoria) => categoria.id === id)?.nome ?? id;
}
