_# Aula 05: Fundamentos de React_

## 1. A Essência do React: Componentes

O React é uma biblioteca JavaScript para construir interfaces de usuário. Sua principal ideia é dividir a UI em partes independentes e reutilizáveis chamadas **componentes**. Em React Native, esses componentes são traduzidos para os elementos nativos da plataforma.

### Componentes Funcionais

Hoje, a forma mais comum e moderna de escrever componentes é através de funções JavaScript. São simples, diretas e, com o auxílio dos Hooks, podem gerenciar estado e ciclo de vida.

```javascript
import React from 'react';
import { Text } from 'react-native';

const Saudacao = (props) => {
  return <Text>Olá, {props.nome}!</Text>;
};

export default Saudacao;
```

## 2. JSX: JavaScript e XML

JSX é uma extensão de sintaxe para JavaScript que se parece muito com HTML ou XML. Ele nos permite escrever a estrutura da nossa UI de forma declarativa dentro do próprio código JavaScript. O JSX não é entendido pelo navegador ou pelo React Native diretamente; ele é transpilado (convertido) para chamadas de `React.createElement()`.

```javascript
// Este código JSX:
const elemento = <Text style={{ color: 'blue' }}>Clique aqui</Text>;

// É convertido para isto:
const elemento = React.createElement(Text, { style: { color: 'blue' } }, 'Clique aqui');
```

## 3. Props: Passando Dados

**Props** (abreviação de "properties") são a forma como os componentes se comunicam. Eles permitem passar dados de um componente pai para um componente filho. As props são **somente leitura**, o que significa que um componente filho nunca deve modificar as props que recebe.

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const CartaoDeVisita = (props) => {
  return (
    <View>
      <Text>Nome: {props.nome}</Text>
      <Text>Cargo: {props.cargo}</Text>
    </View>
  );
};

const App = () => {
  return (
    <View>
      <CartaoDeVisita nome="Ana" cargo="Desenvolvedora" />
      <CartaoDeVisita nome="Carlos" cargo="Designer" />
    </View>
  );
};

export default App;
```

## 4. State: Gerenciando o Estado

O **state** (estado) é um objeto que armazena dados que podem mudar ao longo do tempo e que afetam a renderização do componente. Diferente das props, o state é **privado e controlado pelo próprio componente**.

Quando o state de um componente muda, o React o re-renderiza automaticamente para refletir essa mudança. Para gerenciar o state em componentes funcionais, usamos o Hook `useState`.

```javascript
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Contador = () => {
  // Declara uma variável de estado chamada "contagem"
  const [contagem, setContagem] = useState(0);

  return (
    <View>
      <Text>Você clicou {contagem} vezes</Text>
      <Button
        title="Clique aqui"
        onPress={() => setContagem(contagem + 1)}
      />
    </View>
  );
};

export default Contador;
```

---

### Referências
[1] [React Documentation: Main Concepts](https://react.dev/learn)
