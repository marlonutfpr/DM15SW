# Aula demonstrativa — Listas e estado

Aplicativo de apoio à **Aula 13**: componentes customizados, listas e gerenciamento de estado.

É a mesma **Cafeteria UTFPR** da Aula 12 (`../aula_demonstrativa_expo_router`), um passo adiante: a navegação continua igual, e o que muda é como as telas são montadas e onde os dados moram. Produtos, preços e dados da cafeteria são fictícios.

## O que mudou desde a Aula 12

| Aula 12 | Aula 13 |
| :--- | :--- |
| Cardápio com `map` e 6 produtos | `FlatList` com 24 produtos, cabeçalho, estado vazio e separador |
| Favorito em `useState` dentro do detalhe | `FavoritosContext`: Cardápio, detalhe, aba Favoritos e selo da aba leem o mesmo estado |
| Aba Favoritos sempre vazia | Aba Favoritos lista o que foi marcado, com `FlatList` |
| Pedido confirmado e esquecido | `PedidosContext`: o modal grava, "Meus pedidos" lista |
| Chips de filtro repetidos dentro da tela | Componente `Filtro` |
| `/produto/999` quebrava a tela | O detalhe trata o produto inexistente |
| Telas "Formas de navegar" e "Mapa de rotas" | Telas "ScrollView × FlatList", "Elevação de estado" e "Onde mora cada estado" |

## Correspondência com os slides

| Slide | Conceito | Onde está no app |
| :-: | :--- | :--- |
| 3 | "Como o favorito chega à aba Favoritos?" | Respondida: favorite no Cardápio e abra a aba |
| 4 | Componente bom: responsabilidade única, props claras | `components/` — cada arquivo faz uma coisa |
| 5 | Variantes por props, valor padrão na desestruturação | `components/Botao.js` (`primario`, `secundario`, `perigo`) e `components/Cartao.js` (`completo`, `compacto`) |
| 6 | Composição com `children` | `components/Painel.js` e `components/EstadoVazio.js`; os providers também |
| 7 | Por que não `ScrollView` com `map` | Tela `/listas` |
| 8 | `FlatList`: `data`, `keyExtractor`, `renderItem` | `app/(drawer)/(tabs)/index.js` |
| 9 | Cabeçalho, estado vazio, separador e `{...item}` | `app/(drawer)/(tabs)/index.js` — filtro "Sazonais" para o vazio |
| 10 | Onde o estado deve morar | Tela `/estado` |
| 11 | Elevação de estado | Tela `/elevacao` — `ContadorFavoritos` e `ListaProdutos` |
| 12 | O limite da elevação | O aviso da tela `/elevacao` e o roteiro, passo 7 |
| 13 | Context: criando | `contexts/FavoritosContext.js` |
| 14 | Context: usando; a função de alternar no próprio contexto | `app/_layout.js` e `alternarFavorito` no contexto |
| 16 | Atividade | Este app é uma resposta possível aos quatro itens |

O PDF usado para montar esta tabela não traz os slides 6 e 15. O 6 foi inferido dos objetivos ("compor interfaces usando `children`"); o 15 ficou sem correspondência.

**O que o app tem a mais que os slides:**

- **`useFavoritos` com guarda.** O slide devolve `useContext(...)` direto; aqui o hook lança um erro com mensagem clara quando usado fora do provider (passo 9 do roteiro).
- **Dois contextos**, um por assunto, em vez de um contexto com tudo.
- **O contexto guarda só ids**, e as telas derivam os produtos de `dados/produtos.js`.
- **Selo na aba Favoritos** (`tabBarBadge`): um layout também lê contexto.
- **`ListFooterComponent`** em "Meus pedidos", além dos três do slide 9.

**Ficou de fora de propósito**, por ser conteúdo posterior: persistência e `fetch` (Aula 15). Ao recarregar o app, favoritos e pedidos somem — é o gancho do slide 17.

## Como rodar

Requer Node.js 20.19.4 ou superior.

```bash
npm install
```

```bash
npx expo start
```

Leia o QR code com o Expo Go, ou use `npx expo start --web` para projetar no navegador.

**Na web, navegue pelos toques, não pela barra de endereço.** Digitar uma URL recarrega a página, e o estado em memória — favoritos e pedidos — volta a zero. Isso, aliás, é uma boa introdução à Aula 15.

**Versões:** as mesmas do app da Aula 12 — Expo SDK 57 (`expo ~57.0.26`), `expo-router ~57.0.24`, React Native 0.86.3, React 19.2.3. Nenhuma dependência nova: `FlatList`, `createContext` e `useContext` já vêm com React Native e React.

**Verificado em 05/10/2026:** `npx expo-doctor` sem pendências (21/21), e os fluxos dos passos 3 a 8 do roteiro percorridos na versão web, sem erros nem avisos no console.

<!-- VERIFICAR: testado só na web. Antes da aula, percorrer o roteiro no Expo Go: a contagem de linhas da tela /listas depende do tamanho da tela e pode diferir da web. -->

## A árvore

```
app/
├── _layout.js                   # Stack raiz, DENTRO dos dois providers
├── +not-found.js
├── produto/[id].js              # detalhe — lê e altera favoritos (Context)
├── pedido/[id].js               # MODAL — grava o pedido (Context)
└── (drawer)/
    ├── _layout.js               # o drawer
    ├── pedidos.js               # "/pedidos"  — Meus pedidos (FlatList + Context)
    ├── listas.js                # "/listas"   — ScrollView × FlatList
    ├── elevacao.js              # "/elevacao" — elevação de estado, sem Context
    ├── estado.js                # "/estado"   — onde mora cada estado
    ├── sobre.js                 # "/sobre"
    └── (tabs)/
        ├── _layout.js           # as abas — selo lido do contexto
        ├── index.js             # "/"          — Cardápio (FlatList)
        └── favoritos.js         # "/favoritos" — Favoritos (FlatList + Context)

contexts/
├── FavoritosContext.js          # FavoritosProvider, useFavoritos
└── PedidosContext.js            # PedidosProvider, usePedidos

components/
├── Botao.js                     # variantes por objeto
├── BotaoFavorito.js             # o coração; não guarda estado
├── Cartao.js                    # aceita {...item}; variantes completo/compacto
├── ContadorFavoritos.js         # recebe só `total`
├── EstadoVazio.js               # ListEmptyComponent reutilizável; aceita children
├── Etiqueta.js
├── Filtro.js                    # chip extraído do Cardápio
├── Painel.js                    # moldura com children
└── Separador.js                 # ItemSeparatorComponent

dados/produtos.js                # 24 produtos; categoria "Sazonais" vazia de propósito
```

## Onde mora cada estado

É o item 4 da atividade, respondido para este app. A mesma tabela está na tela `/estado`.

| Estado | Onde mora | Por quê |
| :--- | :--- | :--- |
| `categoria` | Local, no Cardápio | Só o Cardápio usa |
| `quantidade`, `confirmado` | Local, no modal de pedido | Só interessam enquanto o modal está aberto |
| `modo`, `contagem` | Local, em `/listas` | Só a tela de comparação usa |
| `favoritos` da demonstração | Elevado, em `/elevacao` | Dois irmãos — contador e lista — precisam dele; sobe até o pai comum e para aí |
| `favoritos` | `FavoritosContext` | Cardápio, detalhe, aba Favoritos e o layout das abas; o pai comum é o layout raiz, e o dado teria que atravessar drawer e abas |
| `pedidos` | `PedidosContext` | Escrito pelo modal, no Stack raiz, e lido por "Meus pedidos", no drawer |

## Roteiro de demonstração

1. **Componentes (slides 4 e 5).** Abra `components/`. Cada arquivo faz uma coisa. Em `Botao.js`, mostre o objeto `VARIANTES`: com duas variantes o ternário do slide basta; com três, o objeto lê melhor. Mostre `<Botao variante="perigo" />` em "Meus pedidos".
2. **`children` (slide 6).** No detalhe de um produto, os blocos "Descrição" e "Preço" são `Painel`. Abra `components/Painel.js`: ele não sabe o que vai dentro. Mostre que o `FavoritosProvider` usa o mesmo mecanismo.
3. **ScrollView × FlatList (slide 7).** No menu, "ScrollView × FlatList". Com FlatList, toque em "Contar": algumas dezenas de 1000. Troque para "ScrollView + map" — repare na demora — e conte: 1000 de 1000. Volte para FlatList e conte de novo.
4. **FlatList (slides 8 e 9).** Em `app/(drawer)/(tabs)/index.js`, aponte `data`, `keyExtractor` com `String(...)`, `renderItem` com `{...item}`, e os três componentes extras. Toque em "Sazonais": aparece o `ListEmptyComponent`, sem nenhum `if` na tela.
5. **A pergunta da aula passada, respondida (slide 3).** Favorite dois produtos no Cardápio. Repare no contador do cabeçalho e no selo da aba. Abra a aba Favoritos: estão lá. Abra um deles: o coração do detalhe está cheio. Desfavorite no detalhe e volte: sumiu da aba.
6. **Elevação de estado (slide 11).** No menu, "Elevação de estado". Favorite dois produtos: o contador acompanha. Em `app/(drawer)/elevacao.js`, mostre que nem `ContadorFavoritos` nem `ListaProdutos` têm `useState`: o pai guarda e passa o valor e a função.
7. **O limite da elevação (slide 12).** Ainda nessa tela, abra a aba Favoritos: nada do que foi marcado ali aparece. Pergunte à turma o caminho que o dado teria que percorrer por props: `_layout` raiz → drawer → abas → Favoritos. Nenhum desses layouts usa o dado.
8. **Context (slides 13 e 14).** Mostre `contexts/FavoritosContext.js` e o `app/_layout.js`. Em seguida, o pedido: abra um produto, "Fazer pedido", confirme e toque em "Ver em Meus pedidos". O modal e a lista estão em navegadores diferentes; quem os liga é o `PedidosContext`.
9. **Usar fora do provider.** Em `app/_layout.js`, troque `<FavoritosProvider>` e `</FavoritosProvider>` por `<>` e `</>` e salve: tela vermelha com "useFavoritos precisa estar dentro de &lt;FavoritosProvider&gt;". Sem a guarda em `useFavoritos`, o erro seria um "Cannot read property of null" bem menos útil. Desfaça.
10. **Onde mora cada estado (slide 10).** No menu, "Onde mora cada estado". É o parágrafo de justificativa da atividade, item por item.
11. **O gancho da Aula 15 (slide 17).** Com favoritos e pedidos marcados, recarregue o app: tudo some.

## Para depois da aula

- Favoritos e pedidos sobrevivem ao fechamento do app, e os produtos vêm de uma API — Aula 15.
