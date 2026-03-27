_# Aula 08: Estilização no React Native_

## 1. A API `StyleSheet`

No React Native, a estilização não é feita com CSS. Em vez disso, usamos JavaScript. Para organizar e otimizar os estilos, o React Native fornece a API `StyleSheet`. Embora você possa aplicar estilos diretamente a um componente usando um objeto JavaScript (estilo inline), o `StyleSheet` oferece duas vantagens principais:

1.  **Performance**: Os estilos são criados apenas uma vez e referenciados por um ID, evitando a criação de um novo objeto de estilo a cada renderização.
2.  **Organização**: Centraliza os estilos do componente em um único lugar, tornando o código mais limpo e legível.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EstiloExemplo = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Estilização com StyleSheet</Text>
  </View>
);

// Criação da folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default EstiloExemplo;
```

## 2. Layout com Flexbox

Flexbox é o principal modelo de layout no React Native. Se você já usou Flexbox na web, a maioria dos conceitos será familiar. Ele é projetado para fornecer um layout consistente em diferentes tamanhos de tela.

### Propriedades do Contêiner (`flexDirection`, `justifyContent`, `alignItems`)

-   **`flexDirection`**: Define o eixo principal do layout. O padrão é `column` (vertical).
    -   `row`: Itens são dispostos na horizontal.
    -   `column`: Itens são dispostos na vertical.
-   **`justifyContent`**: Alinha os filhos ao longo do **eixo principal**.
    -   `flex-start`, `center`, `flex-end`, `space-between`, `space-around`.
-   **`alignItems`**: Alinha os filhos ao longo do **eixo secundário** (o eixo perpendicular ao principal).
    -   `flex-start`, `center`, `flex-end`, `stretch`.

### Propriedades do Item (`flex`)

-   **`flex`**: Define como um item deve "crescer" para preencher o espaço disponível. Um valor de `flex: 1` em um componente fará com que ele ocupe todo o espaço disponível no contêiner.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const FlexboxExemplo = () => (
  <View style={styles.container}>
    <View style={styles.box1} />
    <View style={styles.box2} />
    <View style={styles.box3} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    flexDirection: 'row', // Eixo principal é horizontal
    justifyContent: 'space-around', // Espaçamento igual entre os itens
    alignItems: 'center', // Centraliza verticalmente
  },
  box1: { width: 50, height: 50, backgroundColor: 'powderblue' },
  box2: { width: 50, height: 50, backgroundColor: 'skyblue' },
  box3: { width: 50, height: 50, backgroundColor: 'steelblue' },
});

export default FlexboxExemplo;
```

## 3. Dimensões e Unidades

-   **Pixels Independentes de Densidade (dp)**: As dimensões no React Native não têm unidade. Elas correspondem a pixels independentes de densidade. Isso significa que o sistema operacional se encarrega de escalar os elementos para que tenham uma aparência consistente em telas com diferentes densidades de pixels.
-   **API `Dimensions`**: Para obter as dimensões da tela (largura e altura), você pode usar a API `Dimensions`.

```javascript
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

## 4. Estilos Inline vs. StyleSheet

-   **Estilos Inline**: Úteis para estilos dinâmicos que dependem do estado ou das props de um componente.
-   **StyleSheet**: Preferível para estilos estáticos, pela performance e organização.

Você pode combinar ambos usando um array de estilos:

```javascript
<Text style={[styles.base, styles.destaque]}>Texto com múltiplos estilos</Text>
```

---

### Referências
[1] [React Native Documentation: Style](https://reactnative.dev/docs/style)
[2] [React Native Documentation: Layout with Flexbox](https://reactnative.dev/docs/flexbox)
