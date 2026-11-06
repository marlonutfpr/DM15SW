// services/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

// A tela chama estas funções, nunca o SDK direto: é a camada de serviços da
// Aula 15. O Firebase já recusa senha com menos de 6 caracteres e e-mail
// repetido.
export const cadastrar = (email, senha) =>
  createUserWithEmailAndPassword(auth, email, senha);

export const entrar = (email, senha) =>
  signInWithEmailAndPassword(auth, email, senha);

export const sair = () => signOut(auth);

// Os erros chegam em error.code. A tela não precisa conhecer esses códigos:
// recebe uma frase pronta.
//
// De propósito, "e-mail não cadastrado" e "senha errada" viram a MESMA
// mensagem, e o e-mail repetido no cadastro também fica genérico: dizer qual
// dos dois falhou ajuda quem tenta adivinhar contas.
export function mensagemDeErro(erro) {
  switch (erro?.code) {
    case 'auth/invalid-email':
      return 'Esse e-mail não é válido.';
    case 'auth/missing-password':
      return 'Digite a senha.';
    case 'auth/weak-password':
      return 'A senha precisa de pelo menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Espere um pouco e tente de novo.';
    case 'auth/email-already-in-use':
      return 'Não foi possível criar a conta com esses dados.';
    default:
      return 'E-mail ou senha incorretos.';
  }
}
