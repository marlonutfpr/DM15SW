# Aula demonstrativa — Firebase, Authentication e regras

Aplicativo de apoio à **Aula 18**: Firestore, Authentication e regras de segurança.

É a mesma **Cafeteria UTFPR** da Aula 15 (`../aula_demonstrativa_persistencia_apis`), um passo adiante: os dados saem do aparelho e vão para a nuvem. O cardápio vem do Firestore, os favoritos e os pedidos passam a ser do usuário, e não do aparelho, e o app só abre depois do login. Produtos, preços e dados da cafeteria são fictícios.

<!-- VERIFICAR: README provisório. Falta o roteiro de demonstração, que depende dos testes com login e com as regras publicadas. -->

## O que mudou desde a Aula 15

| Aula 15 | Aula 18 |
| :--- | :--- |
| Cardápio de um JSON por `fetch` | `services/produtos.js` lê a coleção `produtos` do Firestore, com o mesmo nome de função e o mesmo formato |
| Favoritos no AsyncStorage, do aparelho | `usuarios/{uid}/favoritos`, do usuário, escutados em tempo real |
| Pedidos no AsyncStorage, num contexto | Coleção `pedidos`, com o modelo do slide 9; "Meus pedidos" escuta com `onSnapshot` |
| Qualquer um abre o app | Login com e-mail e senha; `Stack.Protected` no layout raiz |
| Ids numéricos, `Number(id)` no detalhe | Ids de documento são texto (`p3`): a única linha de tela que a troca mudou |
| Telas "Dados salvos" e "Checklist de dados" | Telas "Consultas e regras" e "Minha conta" |
| "Limpar pedidos" | Removido: a regra diz `allow update, delete: if false` |

O Cardápio, a aba Favoritos e o `ProdutosContext` são os mesmos da Aula 15. É o que a camada de serviços prometia (slide 26).

## Correspondência com os slides

| Slide | Conceito | Onde está no app |
| :-: | :--- | :--- |
| 4 | Configurando | Projeto `pd26s-928fa`; `npx expo install firebase` |
| 5 | Inicialização | `services/firebase.js` |
| 6 | A configuração não é segredo | O `firebaseConfig` está no código, num repositório público |
| 7 a 9 | Modelo do Firestore, modelar pela tela | `services/pedidos.js`: nome e preço copiados para dentro do pedido |
| 10 a 12 | Criar, ler, atualizar e remover | `services/produtos.js`, `services/pedidos.js`, `services/favoritos.js` |
| 13 | Consultas e índice composto | `listarPorCategoria`; a consulta de "Meus pedidos"; `firestore.indexes.json` |
| 14 | Tempo real com `onSnapshot` e a limpeza | `app/(app)/(drawer)/pedidos.js`, `contexts/FavoritosContext.js` |
| 17 a 19 | Authentication: configuração, cadastro, entrada, saída | `services/firebase.js`, `services/auth.js`, `app/login.js`, tela "Minha conta" |
| 20 | Observando a sessão | `hooks/useUsuario.js` |
| 21 | `Stack.Protected` | `app/_layout.js` e o grupo `app/(app)/` |
| 22 a 24 | Regras, dono do pedido, regra não é filtro | `firestore.rules`; tela "Consultas e regras" |

**O que o app tem a mais que os slides:**

- **Auth na web.** `getReactNativePersistence` só existe no build React Native do SDK (`firebase` 13.2.0). Na web, `services/firebase.js` usa `getAuth`, que já guarda a sessão no navegador. Sem isso, `npx expo start --web` quebra.
- **Mensagens de erro do login** traduzidas em `services/auth.js`, sem dizer se foi o e-mail ou a senha que errou (slide 19).
- **Providers dentro de `(app)`**, e não no layout raiz: a escuta dos favoritos precisa do uid, e ao sair o grupo desmonta e encerra as escutas.
- **Favoritos em subcoleção** do usuário, com o uid no caminho; a regra compara o caminho, e não um campo.
- **Documento do usuário** em `usuarios/{uid}` (`services/usuarios.js`): criado no cadastro, que pede o nome completo, com o uid do Authentication como id, e lido em "Minha conta". Uma conta sem documento ganha o seu no próximo login, sem nome.
- **`scripts/popular-produtos.mjs`**, que grava os 24 produtos enquanto o banco está em modo de teste.

## Como preparar o Firebase

1. No [console](https://console.firebase.google.com): crie o projeto, registre um app Web, crie o Firestore em modo de teste e ative E-mail/senha em Authentication.
2. Cole o `firebaseConfig` do app Web em `services/firebase.js`.
3. Com o banco **ainda em modo de teste**, popule o cardápio:

```bash
node scripts/popular-produtos.mjs
```

4. No console, Firestore, aba **Regras**: cole o conteúdo de `firestore.rules` e publique.
5. Crie os índices compostos: abra "Meus pedidos" e "Consultas e regras", e siga o link que o erro `failed-precondition` mostra no console. Ou, com o Firebase CLI, `firebase deploy --only firestore`.

## Como rodar

```bash
npm install
```

```bash
npx expo start
```

**Versões** (conferidas em 06/11/2026): Expo SDK 57 (`expo ~57.0.32`), `expo-router ~57.0.30`, `firebase` 13.2.0, React Native 0.86.3. `npx expo-doctor` sem pendências (21/21).

## Regras de segurança

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Cardápio: todos leem, gravação só pelo console (slide 22).
    match /produtos/{produtoId} {
      allow read: if true;
      allow write: if false;
    }

    // Cada pedido, só do seu dono (slide 23).
    match /pedidos/{pedidoId} {
      allow read: if request.auth != null
        && resource.data.usuarioId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.usuarioId == request.auth.uid;
      allow update, delete: if false;
    }

    // Dados do usuário: o id do documento é o uid do Authentication.
    match /usuarios/{uid} {
      allow read, create, update: if request.auth != null && request.auth.uid == uid;
    }

    // Favoritos: o uid está no caminho.
    match /usuarios/{uid}/favoritos/{produtoId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Modelo de dados

| Coleção | Documento | Campos | Quem lê |
| :--- | :--- | :--- | :--- |
| `produtos` | `p1` a `p24` | `nome`, `preco`, `categoria`, `descricao`, `criadoEm` | Cardápio, Favoritos, detalhe, pedido |
| `pedidos` | id automático | `usuarioId`, `criadoEm`, `status`, `itens[]` (`produtoId`, `nome`, `preco`, `quantidade`), `total` | "Meus pedidos", só os do usuário |
| `usuarios` | uid do Authentication | `nome`, `email`, `criadoEm` | "Minha conta", só o próprio usuário |
| `usuarios/{uid}/favoritos` | id do produto | `criadoEm` | Cardápio, Favoritos, detalhe |

## A árvore

```
app/
├── _layout.js                   # Stack raiz com Stack.Protected
├── login.js                     # "/login" — só para quem não entrou
├── +not-found.js
└── (app)/                       # só para quem entrou
    ├── _layout.js               # providers + Stack
    ├── produto/[id].js
    ├── pedido/[id].js           # MODAL — grava no Firestore
    └── (drawer)/
        ├── pedidos.js           # tempo real
        ├── entrega.js
        ├── regras.js            # "Consultas e regras"
        ├── conta.js             # "Minha conta" e Sair
        ├── sobre.js
        └── (tabs)/              # Cardápio e Favoritos, iguais aos da Aula 15

services/   firebase.js, auth.js, usuarios.js, produtos.js, pedidos.js, favoritos.js, cep.js
hooks/      useUsuario.js
scripts/    popular-produtos.mjs, produtos.json
firestore.rules, firestore.indexes.json, firebase.json
```
