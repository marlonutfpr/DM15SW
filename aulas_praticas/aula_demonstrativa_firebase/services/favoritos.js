// services/favoritos.js
import { collection, doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

// Na Aula 15, os favoritos moravam no AsyncStorage: eram do APARELHO. Agora
// são do USUÁRIO, numa subcoleção dentro do documento dele:
//
//   usuarios/{uid}/favoritos/{produtoId}   { criadoEm: Timestamp }
//
// O id do documento é o próprio id do produto: favoritar duas vezes grava o
// mesmo documento, sem duplicar. Nome e preço NÃO são copiados: a aba
// Favoritos já tem o cardápio carregado e só precisa saber quais ids marcar.
function favoritosDoUsuario() {
  return collection(db, 'usuarios', auth.currentUser.uid, 'favoritos');
}

// Tempo real: o coração marcado no celular aparece marcado no navegador.
// A coleção é pequena e só do usuário, então a escuta custa pouco.
export function ouvirFavoritos(aoMudar, aoFalhar) {
  return onSnapshot(
    favoritosDoUsuario(),
    (snap) => aoMudar(snap.docs.map((d) => d.id)),
    aoFalhar
  );
}

export async function adicionarFavorito(produtoId) {
  await setDoc(doc(favoritosDoUsuario(), produtoId), { criadoEm: serverTimestamp() });
}

export async function removerFavorito(produtoId) {
  await deleteDoc(doc(favoritosDoUsuario(), produtoId));
}
