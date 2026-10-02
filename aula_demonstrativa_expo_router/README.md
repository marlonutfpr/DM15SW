# Aula demonstrativa — Expo Router

Aplicativo de apoio à **Aula 12**: Expo Router — stacks, tabs, drawer e parâmetros.

É a **Cafeteria UTFPR**, o exemplo recorrente dos slides, com o código dos slides 4 a 13 rodando de verdade. Produtos, preços e dados da cafeteria são fictícios: o assunto aqui é só navegação.

## Correspondência com os slides

| Slide | Conceito | Onde está no app |
| :-: | :--- | :--- |
| 4 | Cada arquivo é uma rota | `app/(drawer)/sobre.js` responde por `/sobre` |
| 5 | `_layout.js` e `Stack` | `app/_layout.js` — `Stack.Screen name="produto/[id]"` |
| 6 | `Link`, simples e com `asChild` | `app/(drawer)/(tabs)/index.js` |
| 7 | `router.push`, `back` e `replace` | `app/produto/[id].js` — `import { router } from 'expo-router'` |
| 8 | Rota dinâmica, `useLocalSearchParams` e `Number(id)` | `app/produto/[id].js` |
| 9 | `href` com `pathname` e `params` | `app/(drawer)/(tabs)/index.js` |
| 10 | Grupo `(tabs)` | `app/(drawer)/(tabs)/` — `/favoritos`, sem o grupo na URL |
| 11 | `Tabs`, com `tabBarIcon` | `app/(drawer)/(tabs)/_layout.js` |
| 12 | Detalhe no Stack raiz, por cima das abas | `app/produto/[id].js` fora de `(tabs)` |
| 13 | Drawer | `app/(drawer)/_layout.js` |
| 16 | "Como a aba Favoritos sabe o que foi favoritado?" | Botão de favoritar no detalhe e aba Favoritos vazia |

**O que o app tem a mais que os slides:**

- **Modal** (`app/pedido/[id].js`) — é só a opção `presentation: 'modal'` em `Stack.Screen`.
- **Drawer por fora das abas**, num grupo `(drawer)`. O slide 13 mostra o drawer sozinho no layout raiz.
- **`+not-found.js`**, para a rota inexistente.
- **`unstable_settings`** no layout raiz: quem abre `/produto/3` direto pela URL ainda consegue voltar ao cardápio.
- **`DrawerToggleButton`** no cabeçalho das abas, para abrir o menu.

**Divergência conhecida com o slide 13**, que estava marcado com VERIFICAR: no SDK 57 o drawer não usa `@react-navigation/drawer` nem precisa de `GestureHandlerRootView`. A instalação é `npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler`. Fonte: [docs.expo.dev/router/advanced/drawer](https://docs.expo.dev/router/advanced/drawer/), conferida em 02/10/2026.

**Ficou de fora de propósito**, por ser conteúdo posterior: `FlatList` e estado compartilhado (Aula 13), persistência e `fetch` (Aula 15), login e proteção de rotas (Aula 20). Também não há `ScrollView` nem `TextInput`; as telas foram dimensionadas para caber sem rolagem.

## Como rodar

Requer Node.js 20.19.4 ou superior.

```bash
npm install
```

```bash
npx expo start
```

Leia o QR code com o Expo Go. Para projetar em sala sem depender do celular, `npx expo start --web` abre o mesmo app no navegador — e a barra de endereço passa a mostrar a URL de cada tela, o que ajuda a explicar que o arquivo é a rota.

**Versões** (conferidas no registro do npm em 02/10/2026): Expo SDK 57 (`expo ~57.0.26`), `expo-router ~57.0.24`, React Native 0.86.3, React 19.2.3. Fonte: [expo.dev/changelog](https://expo.dev/changelog).

**Dependências além do mínimo do Expo Router**, todas instaladas com `npx expo install`:

| Pacote | Para quê |
| :--- | :--- |
| `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets` | O drawer: gesto de arrastar e animação |
| `@expo/vector-icons`, `expo-font` | Os ícones |

**Verificado em 02/10/2026:** `npx expo-doctor` sem pendências, e o roteiro abaixo percorrido na versão web.

<!-- VERIFICAR: o app foi testado só na web. Antes da aula, percorrer o roteiro no Expo Go — o drawer em Android e iOS depende de reanimated e gesture-handler, a apresentação do modal muda por plataforma (folha no iOS, tela cheia no Android) e a tela de erro do passo 5 é vermelha só no celular. -->

## A árvore

```
app/
├── _layout.js                   # Stack raiz — não é rota
├── +not-found.js                # rota inexistente
├── produto/
│   └── [id].js                  # "/produto/3" — detalhe, por cima das abas
├── pedido/
│   └── [id].js                  # "/pedido/3"  — MODAL
└── (drawer)/                    # GRUPO: não aparece na URL
    ├── _layout.js               # o drawer — não é rota
    ├── sobre.js                 # "/sobre"     — Sobre a cafeteria
    ├── navegacao.js             # "/navegacao" — Formas de navegar
    ├── rotas.js                 # "/rotas"     — Mapa de rotas
    └── (tabs)/                  # GRUPO dentro de grupo
        ├── _layout.js           # as abas — não é rota
        ├── index.js             # "/"          — Cardápio
        └── favoritos.js         # "/favoritos" — Favoritos

components/                      # Botao, Cartao, Etiqueta
dados/produtos.js                # dados fixos
```

São três navegadores, um dentro do outro: **Stack raiz → drawer → abas**. O detalhe do produto e o modal ficam no Stack raiz, por fora dos outros dois, e por isso cobrem a tela inteira.

## Roteiro de demonstração

Cada passo mostra um comportamento, na ordem dos slides.

1. **Cada arquivo é uma rota (slide 4).** Em Cardápio, toque em "Sobre a cafeteria". Abra `app/(drawer)/sobre.js` no editor: não há registro de tela. Na web, digite `/sobre` na barra de endereço.
2. **Stack (slide 5).** Toque em um produto: o detalhe entra por cima, com cabeçalho e botão de voltar que ninguém escreveu. Mostre `app/_layout.js`.
3. **`Link` (slides 6 e 9).** Em `app/(drawer)/(tabs)/index.js`, compare os dois usos: o `Link` de texto para `/sobre` e o `Link` com `asChild` em volta do cartão, com `pathname` e `params`.
4. **`router` (slide 7).** No detalhe, toque três vezes em "push" e volte três vezes: o caminho se desfaz produto a produto. Repita com "replace": um único voltar cai no cardápio.
5. **Parâmetro e a tela vermelha (slide 8).** A faixa do topo do detalhe mostra o `id` recebido. Em `app/produto/[id].js`, troque `Number(id)` por `id` e salve: tela vermelha, `Cannot read property 'nome' of undefined`. É o erro da Aula 11, lido do mesmo jeito. Desfaça.
6. **Mesmo erro, causa diferente.** Em Cardápio, "Abrir um produto que não existe (tela vermelha)". O `Number(id)` está lá e a tela quebra do mesmo jeito: a rota `[id].js` casa com qualquer valor, e o produto 999 não existe. Pergunte à turma de quem é a responsabilidade de tratar isso.
7. **Rota inexistente.** Em Cardápio, "Abrir uma rota que não existe". Aqui nenhum arquivo casa, e quem responde é o `+not-found.js`.
8. **Abas e grupo (slides 10 e 11).** Em Cardápio, filtre por "Salgados", vá a Favoritos e volte: o filtro continua. Na web, repare que o endereço é `/favoritos`, sem `(tabs)`.
9. **Navegação aninhada (slide 12).** Abra um produto: a barra de abas some, porque `produto/[id].js` está fora de `(tabs)`. Pergunte qual dos dois comportamentos o mapa da ADR de cada grupo pede.
10. **Drawer (slide 13).** Abra pelo botão do cabeçalho e, no celular, arrastando da borda esquerda. Vá a "Mapa de rotas" e volte por "Início": a aba em que você estava foi preservada.
11. **De quem é o cabeçalho.** Em `app/(drawer)/_layout.js`, apague o `headerShown: false` do `(tabs)` e salve: aparecem dois cabeçalhos, o do drawer e o das abas. Desfaça. É o erro mais comum ao aninhar navegadores.
12. **Modal.** No detalhe, "Fazer pedido". Mostre `app/pedido/[id].js`: nada ali diz que é modal. Em `app/_layout.js`, apague `presentation: 'modal'` e salve — a mesma tela passa a entrar como tela comum. Desfaça. "Cancelar" e "Fechar" chamam `router.back()`.
13. **O gancho da Aula 13 (slide 16).** No detalhe, toque no coração. Volte e abra a aba Favoritos: vazia. O estado está preso dentro de uma tela.

## Para depois da aula

O que este app ainda não faz, e em que aula passa a fazer:

- O cardápio vira `FlatList`, e o favorito e o pedido passam a ser vistos por outras telas — Aula 13.
- Os favoritos sobrevivem ao fechamento do app, e os produtos vêm de uma API — Aula 15.
- `replace` depois do login, e rotas protegidas — Aula 20.
