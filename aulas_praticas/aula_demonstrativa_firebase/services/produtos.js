// services/produtos.js
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Na Aula 15 o cardápio vinha de um JSON por fetch. Agora vem do Firestore.
// listarProdutos mantém o MESMO nome e o MESMO formato de retorno, e por isso
// o ProdutosContext e as telas não perceberam a troca.
//
// Uma diferença atravessou o contrato: o id. Antes era número (1, 2, 3);
// no Firestore é o id do documento, e id de documento é texto ('p1').
export async function listarProdutos() {
  const snap = await getDocs(collection(db, 'produtos'));
  // O id não vem dentro de data(): é preciso juntá-lo.
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function buscarProduto(id) {
  const snap = await getDoc(doc(db, 'produtos', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Consulta com filtro, ordenação e limite (slide 13). Filtro de igualdade em
// um campo e ordenação por outro exigem índice composto: na primeira vez, o
// erro traz o link para criá-lo. Usada na tela "Consultas e regras".
export async function listarPorCategoria(categoria) {
  const q = query(
    collection(db, 'produtos'),
    where('categoria', '==', categoria),
    orderBy('preco'),
    limit(20)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// As três abaixo são o CRUD dos slides 10 e 12. As regras (firestore.rules)
// dizem `allow write: if false` para produtos: pelo app, todas recebem
// permission-denied. O cardápio é mantido pelo console, que não passa pelas
// regras. A tela "Consultas e regras" usa atualizarPreco para mostrar a
// recusa.

export async function criarProduto(produto) {
  const ref = await addDoc(collection(db, 'produtos'), {
    ...produto,
    criadoEm: serverTimestamp(),
  });
  return ref.id;
}

// updateDoc altera só os campos enviados. setDoc substituiria o documento
// inteiro, e nome e categoria sumiriam.
export async function atualizarPreco(id, preco) {
  await updateDoc(doc(db, 'produtos', id), { preco });
}

export async function removerProduto(id) {
  await deleteDoc(doc(db, 'produtos', id));
}
