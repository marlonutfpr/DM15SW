_# Aula 06: Hooks do React_

## 1. O que são Hooks?

Hooks são uma adição do React 16.8 que permitem que você "engate" (hook into) o estado e o ciclo de vida do React a partir de componentes de função. Antes dos Hooks, essas funcionalidades estavam disponíveis apenas em componentes de classe. Os Hooks não funcionam dentro de classes — eles permitem que você use o React sem classes.

## 2. `useState`: Gerenciamento de Estado

Como vimos na aula anterior, o `useState` é o Hook que nos permite adicionar estado a componentes funcionais.

- **Declaração**: `const [estado, setEstado] = useState(valorInicial);`
- **Retorno**: Um array com duas posições: o valor atual do estado e uma função para atualizá-lo.

```javascript
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

const InputExemplo = () => {
  const [texto, setTexto] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Digite algo..."
        value={texto}
        onChangeText={setTexto}
      />
      <Text>Você digitou: {texto}</Text>
    </View>
  );
};
```

## 3. `useEffect`: Efeitos Colaterais

O `useEffect` permite executar "efeitos colaterais" (side effects) em componentes funcionais. Efeitos colaterais são operações como buscar dados de uma API, manipular o DOM diretamente, ou configurar uma inscrição (subscription).

- **Execução**: Por padrão, o `useEffect` executa após cada renderização.
- **Array de Dependências**: Podemos controlar *quando* o efeito é executado através de um array de dependências.

```javascript
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const ExemploAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Este efeito executa apenas uma vez, após a primeira renderização
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(json => setData(json));
  }, []); // O array de dependências vazio [] garante a execução única

  return <Text>{data ? data.titulo : 'Carregando...'}</Text>;
};
```

## 4. `useContext`: Estado Global

O `useContext` permite que você acesse um "contexto" do React diretamente, sem precisar passar props manualmente por todos os níveis da árvore de componentes. É uma solução para o problema de "prop drilling".

```javascript
// 1. Crie o Contexto
const TemaContext = React.createContext('claro');

// 2. Use o Provider para envolver os componentes que precisam do contexto
const App = () => (
  <TemaContext.Provider value="escuro">
    <ComponenteFilho />
  </TemaContext.Provider>
);

// 3. Use o Hook useContext para acessar o valor
const ComponenteFilho = () => {
  const tema = useContext(TemaContext);
  return <Text>O tema atual é: {tema}</Text>; // O tema atual é: escuro
};
```

## 5. Hooks Personalizados

Um Hook personalizado é uma função JavaScript cujo nome começa com "use" e que pode chamar outros Hooks. Eles nos permitem extrair e reutilizar lógica de componentes.

```javascript
// Hook personalizado para buscar dados de uma API
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

// Usando o Hook personalizado em um componente
const MeuComponente = () => {
  const { data, loading } = useFetch('https://api.example.com/user');

  if (loading) return <Text>Carregando...</Text>;

  return <Text>Nome do usuário: {data.nome}</Text>;
};
```

---

### Referências
[1] [React Documentation: Hooks API Reference](https://react.dev/reference/react)
