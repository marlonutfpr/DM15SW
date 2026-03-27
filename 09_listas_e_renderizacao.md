_# Aula 09: Listas e Renderização de Dados_

## 1. O Problema da `ScrollView`

Como vimos, a `ScrollView` é ótima para exibir uma pequena quantidade de conteúdo rolável. No entanto, ela tem uma grande desvantagem: renderiza todos os seus componentes filhos de uma só vez, mesmo aqueles que não estão visíveis na tela. Para listas longas (de dezenas a milhares de itens), isso causa sérios problemas de performance e consumo de memória.

## 2. `FlatList`: Listas Performáticas

A `FlatList` é a solução do React Native para este problema. Ela implementa a **virtualização**: renderiza apenas os itens que estão atualmente visíveis na tela (e alguns itens próximos) e "recicla" os componentes à medida que o usuário rola a lista. Isso mantém o uso de memória baixo e a interface fluida, independentemente do tamanho da lista.

Para usar a `FlatList`, você precisa de duas props essenciais:

-   **`data`**: Um array de dados que será renderizado.
-   **`renderItem`**: Uma função que recebe um item do array de dados e retorna o componente React que deve ser renderizado para aquele item.
-   **`keyExtractor`**: Uma função que retorna uma chave única para cada item. O React usa essa chave para otimizar a renderização e gerenciar os itens da lista.

```javascript
import React from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';

const DADOS = [
  { id: '1', titulo: 'Primeiro Item' },
  { id: '2', titulo: 'Segundo Item' },
  { id: '3', titulo: 'Terceiro Item' },
];

const Item = ({ titulo }) => (
  <View style={styles.item}>
    <Text style={styles.titulo}>{titulo}</Text>
  </View>
);

const ListaSimples = () => {
  const renderItem = ({ item }) => (
    <Item titulo={item.titulo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DADOS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16 },
  titulo: { fontSize: 24 },
});

export default ListaSimples;
```

## 3. `SectionList`: Listas com Seções

A `SectionList` funciona de forma semelhante à `FlatList`, mas é projetada para exibir dados agrupados em seções lógicas, com cabeçalhos para cada seção.

Além de `renderItem` e `keyExtractor`, ela requer a prop `sections`. O array de seções deve ter objetos com a seguinte estrutura: `{ title: 'Título da Seção', data: [...] }`.

```javascript
import React from 'react';
import { SafeAreaView, SectionList, Text, View, StyleSheet } from 'react-native';

const DADOS_SECAO = [
  { title: 'Frutas', data: ['Maçã', 'Banana', 'Laranja'] },
  { title: 'Legumes', data: ['Cenoura', 'Batata', 'Brócolis'] },
];

const ListaComSecao = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DADOS_SECAO}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.titulo}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { padding: 20, marginVertical: 8 },
  titulo: { fontSize: 20 },
  header: { fontSize: 28, backgroundColor: '#f0f0f0', padding: 10 },
});

export default ListaComSecao;
```

## 4. Otimização e Funcionalidades Adicionais

-   **`onEndReached`**: Uma função chamada quando o usuário rola a lista até uma certa distância do final. É aqui que você implementa o **infinite scroll**, buscando mais dados de uma API.
-   **`RefreshControl`**: Um componente que pode ser adicionado à `FlatList` para implementar a funcionalidade de **pull-to-refresh** (puxar para atualizar).
-   **`getItemLayout`**: Uma otimização opcional que informa à `FlatList` o tamanho de cada item. Isso pode melhorar a performance de rolagem, pois a `FlatList` não precisa calcular dinamicamente o layout dos itens.

---

### Referências
[1] [React Native Documentation: FlatList](https://reactnative.dev/docs/flatlist)
[2] [React Native Documentation: SectionList](https://reactnative.dev/docs/sectionlist)
