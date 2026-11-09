// services/usuarios.js
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// O Authentication guarda a conta; o Firestore guarda os dados do usuário.
// O que liga os dois é o uid, usado como id do documento:
//
//   usuarios/{uid}   { nome, email, criadoEm }
//
// Com o uid em mãos, não é preciso consulta: o caminho já leva ao documento.

// Só grava se ainda não existir: uma conta criada antes deste documento
// ganha o seu no próximo login (sem nome, que só o cadastro pede), e um
// login comum não apaga nada.
export async function garantirUsuario(usuario, nome = '') {
  const ref = doc(db, 'usuarios', usuario.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { nome, email: usuario.email, criadoEm: serverTimestamp() });
  }
}

// null: a conta existe no Authentication, mas ainda não tem documento.
export async function buscarUsuario(uid) {
  const snap = await getDoc(doc(db, 'usuarios', uid));
  return snap.exists() ? { uid: snap.id, ...snap.data() } : null;
}
