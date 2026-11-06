// services/pedidos.js
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

// O documento de pedido segue o modelo do slide 9, pensado pela tela "Meus
// pedidos": ela mostra nome e preço de cada item, então eles são COPIADOS
// para dentro do pedido. Uma leitura por pedido, e o preço guardado é o da
// compra, que não muda se o cardápio mudar.
//
//   pedidos/{pedidoId}
//   {
//     usuarioId: 'Xy3...',        // é o que torna a regra possível
//     criadoEm: Timestamp,
//     status: 'aberto',
//     itens: [{ produtoId: 'p3', nome: 'Cappuccino', preco: 18.5, quantidade: 2 }],
//     total: 37,
//   }
export async function criarPedido({ itens, total }) {
  const ref = await addDoc(collection(db, 'pedidos'), {
    // Quem é o dono vem do Authentication, não da tela. A regra confere que
    // este campo é o uid de quem está gravando.
    usuarioId: auth.currentUser.uid,
    criadoEm: serverTimestamp(), // relógio do servidor, não o do celular
    status: 'aberto',
    itens,
    total,
  });
  return ref.id;
}

// A consulta pede EXATAMENTE o que a regra libera: só os pedidos do usuário
// (slide 24). Sem o where, o Firestore recusa a consulta inteira.
//
// where em um campo e orderBy em outro exigem índice composto
// (firestore.indexes.json). Sem ele, o erro traz o link para criá-lo.
function consultaMeusPedidos() {
  return query(
    collection(db, 'pedidos'),
    where('usuarioId', '==', auth.currentUser.uid),
    orderBy('criadoEm', 'desc'),
    limit(20)
  );
}

function paraPedido(d) {
  // serverTimestamps: 'estimate' — o pedido recém-criado ainda não tem o
  // horário do servidor; sem esta opção, criadoEm viria null até a
  // confirmação chegar.
  return { id: d.id, ...d.data({ serverTimestamps: 'estimate' }) };
}

// Tempo real (slide 14): status de pedido muda enquanto o usuário olha.
// Devolve a função que encerra a escuta; quem chama tem de chamá-la.
export function ouvirMeusPedidos(aoMudar, aoFalhar) {
  return onSnapshot(
    consultaMeusPedidos(),
    (snap) => aoMudar(snap.docs.map(paraPedido)),
    aoFalhar
  );
}

// As duas abaixo existem só para a tela "Consultas e regras".

// Leitura única, com a mesma consulta.
export async function listarMeusPedidos() {
  const snap = await getDocs(consultaMeusPedidos());
  return snap.docs.map(paraPedido);
}

// A consulta ERRADA do slide 24: pede todos os pedidos, e a regra só libera
// os do usuário. Resultado: permission-denied, e não uma lista filtrada.
export async function listarTodosOsPedidos() {
  const snap = await getDocs(collection(db, 'pedidos'));
  return snap.docs.map(paraPedido);
}

// Tenta gravar um pedido em nome de outra pessoa. A regra de create confere
// request.resource.data.usuarioId == request.auth.uid, e recusa.
export async function criarPedidoEmNomeDeOutro() {
  await addDoc(collection(db, 'pedidos'), {
    usuarioId: 'outra-pessoa',
    criadoEm: serverTimestamp(),
    status: 'aberto',
    itens: [],
    total: 0,
  });
}
