_# Aula 17: Consumo de APIs REST_

## 1. O que é uma API REST?

Uma **API** (Interface de Programação de Aplicativos) é um conjunto de regras e definições que permite que diferentes sistemas de software se comuniquem. **REST** (Representational State Transfer) é um estilo de arquitetura para projetar APIs em rede. Uma API RESTful, ou simplesmente API REST, utiliza requisições HTTP para realizar operações em recursos.

As operações mais comuns são:

-   **GET**: Para obter dados de um recurso.
-   **POST**: Para criar um novo recurso.
-   **PUT** / **PATCH**: Para atualizar um recurso existente.
-   **DELETE**: Para remover um recurso.

## 2. Fetch API: O Padrão do Navegador (e do React Native)

A Fetch API é uma interface moderna, baseada em Promises, para realizar requisições de rede. Ela é um padrão da web e está disponível globalmente no React Native, então não é preciso instalar nada para usá-la.

### Exemplo de Requisição GET

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ConsumindoAPI = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {loading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default ConsumindoAPI;
```

## 3. Axios: Uma Alternativa Popular

Axios é uma biblioteca de cliente HTTP de terceiros, muito popular no ecossistema JavaScript. Ela oferece algumas vantagens em relação à Fetch API, como:

-   Transformação automática de dados para JSON.
-   Melhor tratamento de erros.
-   Suporte a interceptadores (interceptors) para requisições e respostas.

### Instalação

```bash
npm install axios
```

### Exemplo de Requisição GET com Axios

```javascript
import axios from 'axios';

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => setData(response.data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
```

## 4. Tratamento de Erros e Loading States

É crucial fornecer feedback ao usuário enquanto os dados estão sendo carregados e também quando ocorre um erro. A interface não deve simplesmente ficar em branco.

-   **Loading State**: Use uma variável de estado (ex: `loading`) para controlar a exibição de um `<ActivityIndicator>` enquanto a requisição está em andamento.
-   **Error State**: Use outra variável de estado (ex: `error`) para armazenar qualquer erro que ocorra. Se um erro acontecer, você pode exibir uma mensagem amigável para o usuário com a opção de tentar novamente.

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// ... dentro do useEffect
.catch((err) => {
  setError(err);
  console.error(err);
})
.finally(() => {
  setLoading(false);
});

// ... no JSX
if (loading) {
  return <ActivityIndicator />;
}

if (error) {
  return <Text>Ocorreu um erro ao buscar os dados.</Text>;
}

return (
  // Renderiza os dados
);
```

---

### Referências
[1] [MDN Web Docs: Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
[2] [Axios NPM Package](https://www.npmjs.com/package/axios)
[3] [React Native Documentation: Networking](https://reactnative.dev/docs/network)
