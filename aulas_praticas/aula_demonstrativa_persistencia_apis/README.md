# Aula demonstrativa — Persistência local e consumo de APIs

Aplicativo de apoio à **Aula 15**: dados que sobrevivem ao app e dados que vêm de fora.

É a mesma **Cafeteria UTFPR** da Aula 13 (`../aula_demonstrativa_listas_estado`), um passo adiante. A navegação, os componentes e os contextos continuam; o que muda é de onde os dados vêm e para onde vão. Resolve os dois problemas do slide 3: os favoritos somem ao fechar o app, e o cardápio está fixo no código. Produtos, preços e dados da cafeteria são fictícios.

## O que mudou desde a Aula 13

| Aula 13 | Aula 15 |
| :--- | :--- |
| Favoritos e pedidos só na memória: recarregou, sumiram | `FavoritosContext` e `PedidosContext` leem e gravam no AsyncStorage, pelo serviço |
| Cardápio fixo em `dados/produtos.js` | `services/produtos.js` busca na API; `ProdutosContext` guarda a lista e os três estados |
| Telas sem estado de carregamento nem de erro | Cardápio, Favoritos, detalhe e pedido passam por carregando, erro e dados |
| O pedido guardava só o id do produto | O pedido guarda nome e total do momento da compra: "Meus pedidos" funciona sem internet |
| Telas "ScrollView × FlatList", "Elevação de estado" e "Onde mora cada estado" | Telas "Entrega por CEP", "Dados salvos" e "Checklist de dados" |
| Categoria "Sazonais" com dois produtos, apesar do comentário dizer que era vazia | "Sazonais" vazia de fato, para mostrar o estado vazio |

## Correspondência com os slides

| Slide | Conceito | Onde está no app |
| :-: | :--- | :--- |
| 3 | Dois problemas | Favorite e recarregue: continuam. O cardápio vem de `api/produtos.json` |
| 4 | AsyncStorage: o que é e o que não é | Tela `/armazenamento` ("Dados salvos") |
| 5 | Salvando e lendo | `services/favoritos.js`, igual ao slide; `services/pedidos.js`, mesmo molde |
| 6 | Ligando à interface, com o controle `carregado` | `contexts/FavoritosContext.js` e `contexts/PedidosContext.js` |
| 7 | O array de dependências | Os dois efeitos dos contextos; o `[]` de `contexts/ProdutosContext.js`; passos 4 e 7 do roteiro |
| 8 | Consumindo uma API, com `resposta.ok` | `services/cep.js` |
| 9 | Os três estados de uma requisição | `app/(drawer)/entrega.js`, igual ao slide; `contexts/ProdutosContext.js` |
| 10 | Exibindo cada estado, mais o vazio | Função `Resultado` em `app/(drawer)/entrega.js`; topo do Cardápio |
| 11 | A camada de serviços | `services/`: nenhuma tela importa AsyncStorage nem conhece uma URL |
| 12 | O contrato de dados | `services/produtos.js` converte `title`, `price`... para `nome`, `preco`... |
| 13 | Segredos não moram no app | Tela `/armazenamento`: qualquer um lê o que está lá |
| 14 | Checklist para dados assíncronos | Tela `/checklist`: cada pergunta e o arquivo que a responde |
| 15 | Atividade | Este app é uma resposta possível aos itens 1 e 2; a tela `/checklist`, ao 3 |

**De onde vem o cardápio.** O slide 12 usa a `fakestoreapi.com`, que devolve roupas e eletrônicos. Para o cardápio continuar sendo de cafeteria, `api/produtos.json` foi publicado neste repositório **no mesmo formato da fakestoreapi** (campos `title`, `price`, `description`, `category`, em inglês), e o app o busca pelo GitHub (`raw.githubusercontent.com`). Assim o contrato do slide 12 tem o que converter. A URL do slide está comentada em `services/produtos.js`: trocar uma constante pela outra faz o app listar os produtos da fakestoreapi sem mudar mais nada — é o "se a API mudar, só o serviço muda" na prática. Conferido no app, na web, em 16/10/2026.

**O que o app tem a mais que os slides:**

- **`ProdutosContext`.** A lista é buscada uma vez e lida por quatro telas. Os três estados moram no contexto, e cada tela decide como mostrá-los. `carregando` começa `true`, e não `false` como no slide 9: a busca dispara sozinha, ao abrir o app.
- **"Tentar de novo"** no estado de erro (`components/AvisoDeErro.js`).
- **`{ "erro": "true" }` do ViaCEP.** Um CEP com formato válido que não existe volta com status 200. `resposta.ok` é `true`, e o slide 10 mostraria um endereço em branco. `services/cep.js` trata esse caso e lança um erro.
- **Logradouro vazio.** Cidades de CEP único, como Dois Vizinhos (85660-000), voltam sem logradouro nem bairro. A tela junta só as partes preenchidas, em vez do `{dados.logradouro}, {dados.localidade}` do slide, que mostraria ", Dois Vizinhos".
- **Botão desabilitado durante a busca**, para dois toques não virarem duas requisições.
- **`useFocusEffect`** na tela "Dados salvos", que relê o armazenamento toda vez que a tela ganha o foco.
- **`CampoTexto`**, o primeiro `TextInput` da Cafeteria, como componente controlado.

**Dois pontos em que o slide simplifica**, conferidos no app em 16/10/2026:

- **Slide 6, o controle `carregado`.** O slide diz que, sem ele, a lista vazia apaga o que estava salvo. Na ordem do slide (ler primeiro, gravar depois), apagar o `if (carregado)` **não apaga nada**: a leitura é pedida antes da gravação e o AsyncStorage atende na ordem. O erro aparece quando o efeito de gravar fica **acima** do de ler, ordem comum em código gerado. A mensagem para a turma muda pouco, e fica mais forte: sem o `carregado`, o código funciona por sorte. O passo 4 do roteiro provoca o erro do jeito que ele acontece.
- **Slide 8, `resposta.ok`, na web.** Com o CEP "123", o ViaCEP responde 400, mas sem o cabeçalho de CORS. No navegador o `fetch` rejeita como erro de rede e o `if (!resposta.ok)` nem chega a rodar; no celular, o 400 chega e o `if` trata. Para mostrar o `resposta.ok` na web, use o passo 6 do roteiro, com o GitHub, que responde 404 com CORS.

**Ficou de fora de propósito**, por ser conteúdo posterior: Firestore no lugar do AsyncStorage (Aula 18), chave de API e intermediário (Aulas 18 e 21), login (Aula 20).

## Como rodar

Requer Node.js 20.19.4 ou superior.

```bash
npm install
```

```bash
npx expo start
```

Leia o QR code com o Expo Go, ou use `npx expo start --web` para projetar no navegador. Na web, o AsyncStorage grava no `localStorage` do navegador: dá para ver em DevTools, aba Application.

**Precisa de internet** para o cardápio e o CEP. Sem ela, o Cardápio mostra o erro, e "Meus pedidos" continua funcionando.

**Versões** (conferidas com `npx expo install --check` em 16/10/2026): Expo SDK 57 (`expo ~57.0.30`), `expo-router ~57.0.28`, React Native 0.86.3, React 19.2.3. São atualizações de correção em relação aos apps das Aulas 12 e 13, dentro do mesmo SDK.

**Dependência nova**, instalada com `npx expo install`:

| Pacote | Para quê |
| :--- | :--- |
| `@react-native-async-storage/async-storage` (2.2.0) | Persistência local, chave-valor |

`fetch` já vem com o React Native; não há biblioteca de requisição.

**Verificado em 16/10/2026**, na versão web: `npx expo-doctor` sem pendências (21/21); favoritos e pedidos persistidos depois de recarregar; erro com o servidor fora do ar e "Tentar de novo" com ele de volta; "Meus pedidos" sem a API; os três CEPs de exemplo; "Sazonais" vazia; `/produto/3` e `/produto/999` abertos direto pela URL; os passos 4 e 7 do roteiro provocados de verdade (no 7, 247 requisições em 4 segundos). Console sem erros.

<!-- VERIFICAR: testado só na web. Antes da aula, percorrer o roteiro no Expo Go: no celular, o AsyncStorage não é o localStorage, e o passo 4 precisa ser conferido lá; o CEP "123" deve chegar como 400 e passar pelo resposta.ok; e conferir se, no modo avião, o cache HTTP do aparelho (o do iOS guarda por padrão) não serve o cardápio por até 5 minutos, o que esconderia o erro pedido no entregável da atividade. -->

**Cache.** O GitHub manda `max-age=300` junto com o cardápio. Quem recarrega em menos de 5 minutos pode receber a cópia guardada pelo navegador, e é por isso que o passo 5 marca "Disable cache". O código do slide não muda o cache do `fetch`, e este app também não.

## A árvore

```
app/
├── _layout.js                   # Stack raiz, DENTRO dos três providers
├── +not-found.js
├── produto/[id].js              # detalhe — estados da requisição + favorito
├── pedido/[id].js               # MODAL — grava nome e total do pedido
└── (drawer)/
    ├── _layout.js               # o drawer
    ├── pedidos.js               # "/pedidos"       — Meus pedidos, persistidos
    ├── entrega.js               # "/entrega"       — CEP: slides 8, 9 e 10
    ├── armazenamento.js         # "/armazenamento" — o AsyncStorage por dentro
    ├── checklist.js             # "/checklist"     — slide 14
    ├── sobre.js                 # "/sobre"
    └── (tabs)/
        ├── _layout.js           # as abas — selo lido do contexto
        ├── index.js             # "/"          — Cardápio, da API
        └── favoritos.js         # "/favoritos" — Favoritos, persistidos

services/                        # A CAMADA DE SERVIÇOS: só aqui há URL e chave
├── favoritos.js                 # AsyncStorage, chave "favoritos" (slide 5)
├── pedidos.js                   # AsyncStorage, chave "pedidos"
├── armazenamento.js             # lê tudo, sem JSON.parse, para a tela "Dados salvos"
├── cep.js                       # ViaCEP (slide 8)
└── produtos.js                  # cardápio + contrato de dados (slide 12)

contexts/
├── ProdutosContext.js           # NOVO — lista e três estados, uma requisição para o app todo
├── FavoritosContext.js          # lê ao montar, grava a cada mudança
└── PedidosContext.js            # idem

components/
├── AvisoDeErro.js               # NOVO — estado de erro com "Tentar de novo"
├── CampoTexto.js                # NOVO — TextInput controlado com rótulo
├── Carregando.js                # NOVO — ActivityIndicator centralizado
└── ...                          # os da Aula 13

dados/
├── categorias.js                # o que continua fixo: as categorias do filtro
└── formato.js                   # formatarPreco

api/produtos.json                # o cardápio, no formato da fakestoreapi
```

O caminho de um dado é sempre o mesmo, o do slide 11: **tela → contexto → `services/` → API ou AsyncStorage**. Na Aula 18, o AsyncStorage dá lugar ao Firestore, e só `services/` muda.

## Roteiro de demonstração

1. **Os dois problemas (slide 3).** Abra o app da Aula 13, favorite dois produtos e recarregue: sumiram. Abra `../aula_demonstrativa_listas_estado/dados/produtos.js`: o cardápio está no código.
2. **Persistência (slides 4 e 5).** Neste app, favorite dois produtos e faça um pedido. Recarregue (no Expo Go, feche o app de vez e abra de novo): continuam lá. Mostre `services/favoritos.js`.
3. **Só texto (slides 4 e 5).** No menu, "Dados salvos". Os favoritos aparecem como `[1,4]`, entre colchetes, e o tipo é `string`. Favorite outro produto e volte: o texto mudou. Na web, mostre o mesmo em DevTools, Application, Local Storage. Pergunte: o que mais um usuário curioso conseguiria ler aqui? (slide 13)
4. **O controle `carregado` (slides 6 e 7).** Em `contexts/FavoritosContext.js`, apague o `if (carregado)` e salve. Recarregue: os favoritos continuam. Pergunte por quê, então mova o efeito de gravar para **acima** do de ler, salve e recarregue: os favoritos sumiram, e "Dados salvos" mostra `[]`. Desfaça as duas mudanças e favorite de novo. A lição: sem o `carregado`, o código dependia da ordem das linhas.
5. **A API e os três estados (slides 9 e 10).** Na web, abra DevTools, aba Network, marque **"Disable cache"** e escolha "Slow 4G". Sem o "Disable cache", o navegador reaproveita a resposta do GitHub por até 5 minutos (`max-age=300`), e o "Offline" abaixo continua mostrando o cardápio. Recarregue: aparece "Buscando o cardápio...". Agora escolha "Offline" e recarregue: o erro, com "Tentar de novo". Volte para "No throttling" e toque em "Tentar de novo". Com o app offline, abra "Meus pedidos": funciona, porque o pedido guarda o próprio nome. No celular, desligue o Wi-Fi e os dados móveis, como pede o entregável da atividade.
6. **`resposta.ok` (slide 8).** Em `services/produtos.js`, troque `produtos.json` por `produto.json` no fim da URL e salve. O GitHub responde 404, o `if (!resposta.ok)` lança o erro, e a tela mostra a mensagem. Pergunte à turma o que aconteceria sem o `if`: o `fetch` não reclama de um 404. Desfaça.
7. **Ciclo infinito (slide 7).** Em `contexts/ProdutosContext.js`, troque o `[]` do `useEffect` por `[carregar]` e salve, com a aba Network aberta. As requisições não param: `carregar` é uma função nova a cada renderização, e a própria busca provoca renderizações. Desfaça **logo**, para não gastar a cota da rede da sala.
8. **Estado vazio não é erro (slide 10).** No Cardápio, toque em "Sazonais": a requisição deu certo, e não veio nada. Em "Entrega por CEP", antes de consultar: "Digite um CEP para consultar."
9. **CEP (slides 8 a 10).** Em "Entrega por CEP", use os três atalhos: `85660-000` (Dois Vizinhos, sem logradouro), `123` (formato inválido) e `99999-999` (formato válido, não existe; o ViaCEP responde 200 com `{ "erro": "true" }`). Mostre `services/cep.js`: cada API tem seu jeito de dizer "não achei", e quem traduz é o serviço.
10. **Camada de serviços (slide 11).** Procure no projeto por `from '@react-native-async-storage`, `fetch(` e `https://`: só aparecem em `services/`. Nenhuma tela sabe a chave nem a URL.
11. **Contrato de dados (slide 12).** Em `services/produtos.js`, mostre o `map`. Em seguida, comente a constante `URL_PRODUTOS` e descomente a da fakestoreapi: o Cardápio passa a mostrar mochilas e camisetas, e nenhuma tela foi alterada. Desfaça.
12. **Checklist (slide 14).** No menu, "Checklist de dados". É o item 3 da atividade, respondido para este app, com o arquivo de cada resposta.

## Para depois da aula

- Os favoritos e os pedidos vão para o Firestore, e passam a ser do usuário, não do aparelho — Aula 18. Só `services/` muda.
- Login, e cada usuário com os seus dados — Aula 20.
