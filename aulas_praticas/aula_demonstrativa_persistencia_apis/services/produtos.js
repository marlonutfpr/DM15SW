// services/produtos.js

// O cardápio da cafeteria, publicado como JSON neste repositório
// (api/produtos.json) e servido pelo GitHub. Os campos estão em inglês, no
// mesmo formato da fakestoreapi.com, a API do slide.
const URL_PRODUTOS =
  'https://raw.githubusercontent.com/marlonutfpr/DM15SW/main/aulas_praticas/aula_demonstrativa_persistencia_apis/api/produtos.json';

// A do slide. Troque a constante acima por esta e o app continua funcionando,
// com roupas e eletrônicos no lugar do café: só o serviço conhece a URL.
// const URL_PRODUTOS = 'https://fakestoreapi.com/products';

export async function listarProdutos() {
  const resposta = await fetch(URL_PRODUTOS);
  if (!resposta.ok) throw new Error('Falha ao listar produtos');
  const brutos = await resposta.json();

  // O CONTRATO DE DADOS: converte o formato da API para o formato que o app
  // usa. Daqui para dentro, ninguém sabe que existe `title` ou `price`.
  return brutos.map((p) => ({
    id: p.id,
    nome: p.title,
    preco: p.price,
    categoria: p.category,
    descricao: p.description,
  }));
}
