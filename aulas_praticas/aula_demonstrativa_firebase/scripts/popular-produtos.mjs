// Popula a coleção `produtos` com o cardápio de scripts/produtos.json.
//
//   node scripts/popular-produtos.mjs
//
// Atalho para não digitar 24 produtos no console. Usa o SDK do Firebase pelo
// Node, com a MESMA configuração do app, e por isso passa pelas regras de
// segurança: só funciona com o banco em MODO DE TESTE. Rode antes de publicar
// firestore.rules; depois disso, `allow write: if false` recusa a gravação, e
// o cardápio passa a ser mantido pelo console.
//
// Os ids são fixos (p1, p2...), como no slide 9: rodar de novo sobrescreve
// os mesmos documentos em vez de duplicar.
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, serverTimestamp } from 'firebase/firestore';

// Lê o objeto firebaseConfig de services/firebase.js, para a configuração
// existir num lugar só. Esse arquivo importa React Native e não roda no Node.
const fonte = readFileSync(new URL('../services/firebase.js', import.meta.url), 'utf8');
const literal = fonte.match(/const firebaseConfig = (\{[\s\S]*?\});/)[1];
const firebaseConfig = Function(`return ${literal}`)();

const db = getFirestore(initializeApp(firebaseConfig));
const produtos = JSON.parse(readFileSync(new URL('./produtos.json', import.meta.url), 'utf8'));

// Um lote: as 24 gravações vão juntas, e ou entram todas ou nenhuma.
const lote = writeBatch(db);
for (const { id, ...campos } of produtos) {
  lote.set(doc(db, 'produtos', id), { ...campos, criadoEm: serverTimestamp() });
}

try {
  await lote.commit();
  console.log(`${produtos.length} produtos gravados em ${firebaseConfig.projectId}.`);
  process.exit(0);
} catch (e) {
  console.error(`Falhou: ${e.code ?? e.message}`);
  if (e.code === 'permission-denied') {
    console.error('As regras já não estão em modo de teste. Popule pelo console.');
  }
  process.exit(1);
}
