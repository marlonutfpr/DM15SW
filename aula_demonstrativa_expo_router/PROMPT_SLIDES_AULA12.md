# Prompt: atualização dos slides da Aula 12 (Claude Design)

**Tema:** Expo Router: stacks, tabs, drawer e parâmetros

**Como usar:** anexe na mesma mensagem (1) os slides da Aula 5, como referência visual, e (2) a versão atual dos slides da Aula 12, que será atualizada. Depois cole este prompt inteiro.

**O que esta atualização faz.** Os slides da Aula 12 passam a refletir o app de referência "Cafeteria UTFPR", que foi construído e executado para esta aula. Todo bloco de código deste documento foi extraído desse app, reduzido ao essencial. A atualização corrige o slide do drawer, acrescenta quatro slides e ajusta os demais. O deck passa de 16 para 20 slides.

Cada slide da seção 4 traz uma marca:

- **MANTER:** igual ao slide atual, sem nenhuma mudança além do indicador de página.
- **ALTERAR:** mesmo slide, com o conteúdo substituído pelo que está descrito aqui.
- **NOVO:** slide que não existe na versão atual.

---

## 1. Identidade visual: siga a referência anexada

Estou anexando slides já produzidos desta disciplina (Aula 5). Eles definem o padrão visual do curso e **têm precedência sobre qualquer outra indicação deste documento**.

Antes de criar qualquer slide, extraia da referência e replique com fidelidade:

- paleta exata (fundo, títulos, corpo, cor de destaque, blocos de código);
- tipografia: famílias, pesos e tamanhos relativos entre título, subtítulo, corpo e código;
- grade, margens, alinhamento e respiro;
- composição da capa e dos slides de conteúdo;
- tratamento de listas numeradas, caixas laterais, comparações em colunas e frases de fechamento;
- elementos fixos: pílula da disciplina, indicador de página, rodapé da capa.

**Resumo do padrão já estabelecido**, para conferência (não substitui a referência):

- fundo areia claro em todos os slides, com cor de destaque terracota;
- pílula "DM15SW" no canto superior esquerdo; indicador "NN / TT" no canto superior direito (na capa, três pontos);
- capa: ícone quadrado arredondado terracota com círculo claro ao centro, título grande em negrito escuro, subtítulo em cinza, cartão branco arredondado com sombra suave contendo um ponto terracota e a linha da aula, rodapé "Prof. Dr. Marlon Marcon · Universidade Tecnológica Federal do Paraná - Câmpus Dois Vizinhos" e barra horizontal discreta na base;
- objetivos numerados como "01", "02", "03";
- caixas laterais com rótulo curto em caixa alta, como PONTO DE LEITURA, PONTO DE ATENÇÃO e OBSERVAÇÃO AI-FIRST;
- comparações em duas colunas com cabeçalhos em caixa alta;
- frase de fechamento destacada na base do slide.

Não introduza cores, fontes, ícones decorativos ou logotipos novos. Os slides novos seguem a composição dos slides de conteúdo já existentes na versão atual da Aula 12: mesma paleta, mesma tipografia, mesma lógica. Se a referência for ambígua, pergunte antes de inventar.

---

## 2. Regras que valem para todos os slides

**Sem datas.** Nenhum slide traz data: nem a desta aula, nem de aulas seguintes, nem das entregas. Referencie outras aulas pelo número ("Aula 13") e as entregas pelo nome ("Entrega 2 (PP2)"). Na capa, a linha do cartão segue exatamente o formato indicado na seção 3.

**Sem travessões.** Não use travessões (traço longo) nem meias-riscas em nenhum texto dos slides, inclusive nos comentários de código. Use dois-pontos, vírgula, ponto ou o separador "·" que o design já usa.

**Código é texto literal, e vem do app.** Os blocos de código deste documento foram extraídos do app de referência e conferidos em execução. Não corrija, não modernize, não troque nomes e não complete o que parecer faltar. Em especial, mantenha exatamente:

- o objeto `router` importado de `expo-router`. Não troque pelo hook `useRouter()`;
- os nomes do projeto: `produtos`, `Cartao`, `Botao`, `aoTocar`, `variante`, e funções de estado no formato `setFavorito`;
- a extensão `.js` em todos os nomes de arquivo.

Os slides anteriores sofreram um defeito na exportação: atributos JSX em camelCase iniciados por `on` foram convertidos para uma forma inválida com prefixo `sc-camel-` (por exemplo, `onPress` virou `sc-camel-on-press`). Trate todo bloco de código como texto literal, sem nenhuma transformação de nomenclatura. **Depois de exportar, confira o arquivo final** (não apenas o editor): procure por `sc-camel` em todos os slides e confirme que os nomes em camelCase aparecem exatamente como escritos neste documento.

**Dados voláteis.** Onde houver o marcador `<!-- VERIFICAR: ... -->`, leve o conteúdo para as notas do apresentador. Nunca apresente versões, preços, cotas ou nomes de modelos como certeza no corpo do slide.

**Densidade.** No máximo cerca de 40 palavras fora do código por slide; o excedente vai para as notas do apresentador. Blocos de código com no máximo 14 linhas, legíveis quando projetados. Se um bloco não couber com boa legibilidade, divida-o em dois slides em vez de reduzir a fonte.

**Notas do apresentador.** Inclua em cada slide o roteiro de fala, os pontos de discussão e as notas marcadas neste documento. Nos slides marcados MANTER, preserve as notas atuais.

**Sem emojis.** Comentários dentro do código em português, explicando o porquê.

**Stack de referência:** React Native com Expo SDK 57 (React Native 0.86, React 19.2), JavaScript (sem TypeScript), Node.js LTS, Firebase JS SDK. Projetos criados com `npx create-expo-app@latest`.

**Enquadramento da disciplina.** A disciplina é AI-first: o engenheiro não compete com a IA escrevendo código, ele a orquestra. O estudante é sempre responsável pelo que entrega; "a IA gerou" nunca justifica defeito, falha de segurança ou decisão ruim. Onde o conteúdo pedir, os slides mostram o que a IA costuma errar naquele tema, para que o estudante reconheça o problema ao encontrá-lo.

**Exemplo recorrente.** Os exemplos usam o app didático "Cafeteria UTFPR", construído na Aula 5 (catálogo de produtos com busca e favoritos) e evoluído aula a aula.

---

## 3. Contexto da aula

- **Disciplina:** Programação para Dispositivos Móveis · DM15SW-5ES1 · Engenharia de Software · UTFPR Dois Vizinhos
- **Aula 12**, presencial, 2 horas
- **Linha da capa:** `Aula 12 · DM15SW · Programação para Dispositivos Móveis`
- **Público:** estudantes com o scaffolding do projeto pronto (Aula 11) e um mapa de navegação definido na ADR do grupo.

**Onde a aula se encaixa.**
- *Aula anterior:* Aula 11, scaffolding e depuração. A pasta `app/` já existe no projeto, mas ainda não foi explicada.
- *Aula seguinte:* Aula 13, componentes customizados, FlatList e gerenciamento de estado.

**Mensagem central:** no Expo Router, o caminho do arquivo é o endereço da tela. O mapa de navegação da ADR vira uma árvore de pastas. E a IA mistura com frequência duas APIs de navegação diferentes: o estudante precisa reconhecer qual está vendo.

**O app de referência.** A aula é conduzida com o app "Cafeteria UTFPR" aberto ao lado dos slides. Os slides constroem a navegação em quatro passos, e o último é o app como ele está:

1. um Stack com cardápio e detalhe (slides 4 a 10);
2. abas, com o detalhe abrindo por cima delas (slides 11 a 14);
3. um modal para fazer o pedido (slide 15);
4. um drawer por fora das abas (slides 16 e 17).

A árvore final do app, para conferência:

```text
app/
├── _layout.js                   # Stack raiz
├── +not-found.js                # rota inexistente
├── produto/[id].js              # /produto/3 · detalhe, por cima das abas
├── pedido/[id].js               # /pedido/3 · modal
└── (drawer)/
    ├── _layout.js               # o drawer
    ├── sobre.js                 # /sobre
    ├── navegacao.js             # /navegacao
    ├── rotas.js                 # /rotas
    └── (tabs)/
        ├── _layout.js           # as abas
        ├── index.js             # / · Cardápio
        └── favoritos.js         # /favoritos
```

**Total: 20 slides.** O indicador de página passa a ser "NN / 20" em todos.

---

## 4. Conteúdo slide a slide

### 1. Capa · MANTER
Título: **Expo Router: stacks, tabs, drawer e parâmetros**
Subtítulo: A navegação do app, a partir de arquivos

### 2. Objetivos da aula · ALTERAR
- Explicar o roteamento baseado em arquivos
- Estruturar a navegação com pilhas (Stack) e abas (Tabs)
- Navegar entre telas com `Link` e com `router`
- Passar e ler parâmetros em rotas dinâmicas
- Reconhecer quando cabem um drawer e um modal
- Implementar o mapa de navegação definido na ADR do grupo

Nota do apresentador: os cinco primeiros objetivos são técnicos; o sexto é a atividade: sair daqui com a navegação do app do grupo funcionando entre telas provisórias.

### 3. Do mapa ao código · MANTER
Fluxo visual em três etapas:

`Mapa de navegação da ADR → pastas em app/ → navegação funcionando`

Frase de fechamento: hoje o desenho da ADR vira estrutura de arquivos.

### 4. Cada arquivo é uma rota · ALTERAR (só as notas)

```text
app/
├── _layout.js      →  organiza as telas
├── index.js        →  /
├── sobre.js        →  /sobre
└── produto/
    └── [id].js     →  /produto/1, /produto/2 ...
```

Caixa lateral PONTO DE LEITURA: você não registra rotas, você cria arquivos. O caminho do arquivo é o endereço da tela.

Nota do apresentador, a acrescentar às atuais: esta é a primeira versão da árvore. No app de referência, `index.js` e `sobre.js` estão dentro de grupos, que só aparecem no slide 11; os endereços são exatamente os mesmos. Demonstração: no app, tocar em "Sobre a cafeteria" e mostrar que `sobre.js` não está registrado em lugar nenhum.

### 5. _layout.js: como as telas se organizam · ALTERAR (só as notas)

```js
// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Cardápio' }} />
      <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes' }} />
    </Stack>
  );
}
```

Caixa lateral PONTO DE LEITURA: `Stack` empilha telas: a nova entra por cima e voltar a remove. Cabeçalho e botão de voltar vêm prontos.

Nota do apresentador, a acrescentar às atuais: este é o layout na primeira versão. No app de referência ele já está na versão final, mostrada no slide 17, em que a primeira linha aponta para um grupo em vez de `index`.

### 6. Navegando com Link · ALTERAR

```js
import { Link } from 'expo-router';

<Link href="/sobre">Sobre a cafeteria</Link>

<Link href="/produto/3" asChild>
  <Pressable>
    <Cartao nome="Cappuccino" preco={18.5} />
  </Pressable>
</Link>
```

Caixa lateral PONTO DE LEITURA: `asChild` faz o componente filho funcionar como o link. É assim que um cartão inteiro vira navegação.

Nota do apresentador: `Link` é declarativo: serve quando o destino é conhecido no momento de desenhar a tela. O filho direto do `Link` com `asChild` é o `Pressable`, e o `Cartao` vai dentro dele: o `Cartao` só desenha, não sabe para onde o toque leva. No app, os dois usos estão na tela do Cardápio.

### 7. Navegando por código com router · ALTERAR

```js
import { router } from 'expo-router';

// empilha uma nova tela
router.push(`/produto/${proximo.id}`);

// volta para a anterior
router.back();

// substitui, sem permitir voltar
router.replace(`/produto/${proximo.id}`);
```

Pergunta para a turma, em destaque: quando usar `replace`?

Nota do apresentador: `router` é imperativo: serve quando a navegação depende de uma ação, como salvar um formulário. Demonstração no app: no detalhe de um produto, tocar três vezes em "push" e voltar três vezes, o caminho se desfaz produto a produto; repetir com "replace", um único voltar cai no cardápio. Resposta da pergunta: depois do login, o usuário não deve voltar para a tela de login com o botão de voltar. Deixar a turma responder antes.

### 8. Rotas dinâmicas e parâmetros · ALTERAR (só as notas)

```js
// app/produto/[id].js
import { useLocalSearchParams } from 'expo-router';
import { produtos } from '../../dados/produtos';

export default function DetalheProduto() {
  const { id } = useLocalSearchParams();
  const produto = produtos.find((p) => p.id === Number(id));

  return <Text>{produto.nome}</Text>;
}
```

Caixa lateral PONTO DE ATENÇÃO: parâmetros chegam como texto. Sem `Number(id)`, a comparação falha, `produto` fica `undefined` e aparece exatamente o erro que depuramos na Aula 11.

Nota do apresentador: fazer a ponte explícita com a Aula 11. No app, a faixa no topo do detalhe mostra o `id` recebido, entre aspas. Trocar `Number(id)` por `id` ao vivo e salvar: a tela quebra em `produto.nome`. Mesmo erro, causa diferente, mesmo método de leitura. Desfazer em seguida.

<!-- VERIFICAR: o texto exato do erro muda entre o celular e a web. No celular, "Cannot read property 'nome' of undefined", em tela vermelha. Na web, "Cannot read properties of undefined (reading 'nome')", em painel escuro. Conferir no dispositivo usado na aula antes de citar a mensagem. -->

### 9. Passando parâmetros · ALTERAR

```js
<Link
  href={{ pathname: '/produto/[id]', params: { id: produto.id } }}
  asChild
>
  <Pressable>
    <Cartao nome={produto.nome} preco={produto.preco} />
  </Pressable>
</Link>
```

Caixa lateral PONTO DE LEITURA: passe identificadores, não objetos inteiros. A tela de destino busca os dados pelo id. Parâmetro de rota deve ser pequeno e simples.

Nota do apresentador: a forma com `pathname` e `params` é equivalente a montar o texto `/produto/3`, mas evita erro de concatenação. É o mesmo cartão do slide 6, agora dentro do `map` do cardápio. A IA frequentemente passa o objeto produto inteiro serializado no parâmetro: funciona em demonstração e quebra com dados reais.

### 10. Quando o endereço não leva a lugar nenhum · NOVO
Comparação em duas colunas:

| NENHUM ARQUIVO CASA | O ARQUIVO CASA, O DADO NÃO EXISTE |
|---|---|
| `/rota-que-nao-existe` | `/produto/999` |
| aparece `app/+not-found.js` | `[id].js` aceita qualquer valor |
| a rota não existe | `produto` fica `undefined` e a tela quebra |

Caixa lateral PONTO DE ATENÇÃO: `+not-found.js` só cobre o primeiro caso. Tratar o produto que não existe é responsabilidade da tela de detalhe.

Nota do apresentador: os dois casos têm um link pronto na tela do Cardápio do app, em "Experimentos de navegação". O segundo quebra com o mesmo erro do slide 8, mesmo com o `Number(id)` no lugar. De propósito, o app não trata esse caso. Perguntar: o que a tela deveria mostrar? E lembrar a Aula 11: esconder o erro com `produto?.nome` não é tratar.

### 11. Abas: grupos de rotas · MANTER
Era o slide 10.

```text
app/
├── _layout.js          # Stack raiz
└── (tabs)/
    ├── _layout.js      # define as abas
    ├── index.js        # aba Cardápio
    └── favoritos.js    # aba Favoritos
```

Caixa lateral PONTO DE LEITURA: parênteses criam um grupo, que organiza arquivos sem aparecer no endereço. A rota é `/favoritos`, não `/(tabs)/favoritos`.

### 12. O layout das abas · ALTERAR (só as notas)
Era o slide 11.

```js
// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Cardápio' }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
    </Tabs>
  );
}
```

Nota do apresentador: a estrutura é a mesma do Stack: um componente de layout e uma Screen por arquivo. Demonstração no app: filtrar o cardápio por "Salgados", ir a Favoritos e voltar. O filtro continua lá, porque as abas mantêm cada tela montada. Os ícones vêm no próximo slide.

### 13. Ícones nas abas · NOVO

```bash
npx expo install @expo/vector-icons expo-font
```

```js
import Ionicons from '@expo/vector-icons/Ionicons';

<Tabs.Screen
  name="index"
  options={{
    title: 'Cardápio',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="cafe" color={color} size={size} />
    ),
  }}
/>
```

Caixa lateral PONTO DE LEITURA: `tabBarIcon` recebe `color` e `size` já calculados pela barra. A aba ativa chega com a cor de destaque, sem nenhum `if` no seu código.

Nota do apresentador: no app, a aba Favoritos usa o mesmo trecho com `name="heart"`. Os nomes dos ícones vêm do catálogo da família Ionicons. Nome de ícone é um ponto em que código gerado erra: conferir no catálogo antes de aceitar.

### 14. Navegação aninhada · ALTERAR (só as notas)
Era o slide 12. Diagrama em camadas:

```text
Stack raiz
├── (tabs)  →  [ Cardápio | Favoritos ]
└── produto/[id]  →  abre por cima das abas
```

Frase de fechamento: abas para as seções principais, pilha para aprofundar.

Nota do apresentador: o detalhe do produto fica fora do grupo de abas, no Stack raiz: por isso abre por cima e esconde a barra de abas. Mostrar no app. Se ficasse dentro de `(tabs)`, abriria dentro da aba. Perguntar: qual dos dois comportamentos o mapa da ADR de vocês pede?

### 15. Modal: a mesma rota, outra apresentação · NOVO

```js
// app/_layout.js
<Stack.Screen
  name="pedido/[id]"
  options={{ presentation: 'modal', title: 'Fazer pedido' }}
/>
```

```js
// app/pedido/[id].js: fechar é voltar
<Botao titulo="Cancelar" aoTocar={() => router.back()} />
```

Caixa lateral PONTO DE LEITURA: modal é uma rota como as outras. Serve para uma tarefa curta, que interrompe o fluxo e devolve o usuário aonde ele estava.

Nota do apresentador: no app, "Fazer pedido" no detalhe do produto abre o modal. Mostrar o arquivo `pedido/[id].js`: nada nele diz que é modal. Apagar `presentation: 'modal'` ao vivo e salvar: a mesma tela passa a entrar como tela comum. Desfazer. O pedido confirmado não é guardado em lugar nenhum, o que prepara a Aula 13.

<!-- VERIFICAR: a aparência do modal muda por plataforma. Pela documentação do Expo Router, no iOS o modal fecha arrastando para baixo e no Android fecha com o botão voltar. Na web, em janela estreita, apareceu como tela cheia. Conferir no dispositivo usado na aula. -->

### 16. Drawer: menu lateral · ALTERAR
Era o slide 13. Substitua o comando de instalação e o código inteiros.

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets
```

```js
// app/(drawer)/_layout.js
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Início', headerShown: false }} />
      <Drawer.Screen name="sobre" options={{ title: 'Sobre a cafeteria' }} />
    </Drawer>
  );
}
```

Caixa lateral PONTO DE LEITURA: o drawer atende apps com muitas seções pouco frequentes. Na maioria dos apps da disciplina, abas resolvem.

Nota do apresentador: mostrar rapidamente; o objetivo é reconhecer, não adotar. A partir do SDK 56 o drawer vem embutido no Expo Router: o pacote `@react-navigation/drawer` não é mais instalado e o `GestureHandlerRootView` não aparece no layout. Código gerado por IA costuma trazer os dois, porque é o que existia antes. No app, o drawer tem ainda "Formas de navegar" e "Mapa de rotas", além de ícones com a opção `drawerIcon`, no mesmo formato de `tabBarIcon`.

<!-- VERIFICAR: o app de referência foi executado sem GestureHandlerRootView apenas na web. Conferir no celular, com Expo Go, antes de afirmar em aula que ele é dispensável. Fonte das dependências: docs.expo.dev/router/advanced/drawer -->

### 17. A árvore final: drawer por fora das abas · NOVO

```text
app/
├── _layout.js            # Stack raiz
├── +not-found.js
├── produto/[id].js       # por cima das abas
├── pedido/[id].js        # modal
└── (drawer)/
    ├── _layout.js        # o drawer
    ├── sobre.js          # /sobre
    └── (tabs)/
        ├── _layout.js    # as abas
        ├── index.js      # /
        └── favoritos.js  # /favoritos
```

Caixa lateral PONTO DE ATENÇÃO: cada navegador traz o próprio cabeçalho. `headerShown: false` no de fora evita dois cabeçalhos empilhados.

Frase de fechamento: três navegadores, um dentro do outro, e nenhum grupo aparece no endereço.

Nota do apresentador: esta é a estrutura real do app de referência; a árvore omite `navegacao.js` e `rotas.js`, que são telas do drawer como `sobre.js`. No Stack raiz, a primeira `Stack.Screen` do slide 5 passa a ser `name="(drawer)"`, com `headerShown: false`. Como o cabeçalho do drawer fica escondido sobre as abas, o botão do menu vai no cabeçalho delas: `headerLeft: () => <DrawerToggleButton />`, importado de `expo-router/drawer`. Demonstração: apagar o `headerShown: false` do `(tabs)` em `app/(drawer)/_layout.js` e mostrar os dois cabeçalhos; desfazer. A tela "Mapa de rotas" do app lista qual arquivo responde por qual endereço.

### 18. Duas APIs que a IA mistura · ALTERAR (só as notas)
Era o slide 14. Comparação em duas colunas:

| REACT NAVIGATION CLÁSSICO | EXPO ROUTER |
|---|---|
| `NavigationContainer` e `createStackNavigator` | pastas em `app/` e `_layout.js` |
| `navigation.navigate('Detalhes')` | `router.push('/produto/3')` |
| `route.params` | `useLocalSearchParams()` |

Caixa lateral OBSERVAÇÃO AI-FIRST: misturar as duas APIs no mesmo projeto é um dos erros mais comuns em código gerado. Ao pedir código, diga explicitamente "Expo Router, roteamento por arquivos".

Nota do apresentador, a acrescentar às atuais: o slide 16 é um exemplo concreto. Pedir um drawer à IA sem dizer a versão do SDK costuma devolver `@react-navigation/drawer` e `GestureHandlerRootView`, que o projeto não usa.

### 19. Atividade · ALTERAR
Era o slide 15.

**Em grupo · 35 minutos**
1. Desenhem a árvore de pastas de `app/` a partir do mapa da ADR, antes de pedir código
2. Criem o Stack raiz e o grupo de abas
3. Implementem ao menos uma rota dinâmica com parâmetro
4. Naveguem com `Link` e com `router`
5. Criem o `+not-found.js`
6. Comparem o resultado com a ADR. Se algo mudou, atualizem a ADR

**Entregável:** commit com a navegação funcionando entre telas provisórias e a árvore de rotas no README.

Nota do apresentador: o passo 1 é no papel, antes da IA. Circular pelos grupos conferindo a árvore desenhada. Drawer e modal só entram se o mapa da ADR pedir. Atualizar a ADR não é derrota: é a ADR funcionando como documento vivo.

### 20. Resumo e próxima aula · ALTERAR
Era o slide 16.

**HOJE:** roteamento por arquivos, Stack, Tabs, Drawer, modal, `Link`, `router` e parâmetros.

**AULA 13:** componentes customizados, FlatList e gerenciamento de estado.

Frase de fechamento, como gancho: com duas abas, surge uma pergunta: como a aba Favoritos sabe o que foi favoritado no Cardápio?

Nota do apresentador: mostrar a pergunta acontecendo no app. No detalhe de um produto, tocar no coração; voltar e abrir a aba Favoritos: vazia. O estado está preso dentro de uma tela, e decidir onde ele deve morar é o tema da próxima aula. Deixar a pergunta no ar.

---

## 5. Fora do escopo desta aula

Não ensine: proteção de rotas e autenticação (Aula 20), links profundos (deep linking), rotas tipadas, TypeScript, compartilhamento de estado entre telas (Aula 13).

O app de referência tem dois recursos que **não entram nos slides**: a configuração `unstable_settings` do layout raiz, que é assunto de links profundos, e a pilha dentro de uma aba, que o app não usa. Não os acrescente por conta própria.

---

## Verificação final

Antes de entregar, confirme:

- [ ] Paleta, tipografia e composição idênticas à referência anexada
- [ ] 20 slides, na ordem especificada, com o indicador "NN / 20" em todos
- [ ] Slides marcados MANTER sem nenhuma mudança além do indicador de página
- [ ] Slide 16 sem `@react-navigation/drawer` e sem `GestureHandlerRootView`
- [ ] `router` importado de `expo-router` em todos os blocos; nenhuma ocorrência de `useRouter`
- [ ] Nenhuma data em nenhum slide, inclusive capa e slide final
- [ ] Nenhum travessão ou meia-risca nos textos, inclusive nos comentários de código
- [ ] Arquivo exportado conferido: nenhuma ocorrência de `sc-camel`; nomes em camelCase intactos
- [ ] Blocos de código legíveis quando projetados à distância, com no máximo 14 linhas, idênticos aos deste documento
- [ ] Marcadores `VERIFICAR` levados para as notas do apresentador, nunca para o corpo do slide
- [ ] Nenhum conteúdo listado em "Fora do escopo desta aula"
