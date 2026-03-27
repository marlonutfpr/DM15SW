_# Aula 22: Performance e Otimização_

## 1. Por que a Performance Importa?

A performance é um fator crítico para a experiência do usuário. Aplicativos lentos, com animações travadas ou que consomem muita bateria tendem a ser desinstalados rapidamente. Mesmo que o React Native ofereça uma boa performance por padrão, há várias técnicas que podemos aplicar para otimizar ainda mais nossos aplicativos.

## 2. Profiling e Identificação de Gargalos

Antes de otimizar, é essencial identificar onde estão os problemas. O React Native oferece algumas ferramentas para isso:

-   **React DevTools**: Permite inspecionar a árvore de componentes e identificar re-renderizações desnecessárias.
-   **Performance Monitor**: No menu de desenvolvedor do aplicativo (acessível sacudindo o dispositivo ou via `Cmd+D` no iOS / `Cmd+M` no Android), você pode ativar o "Performance Monitor" para ver métricas como FPS (frames por segundo) e uso de memória em tempo real.
-   **Flipper**: Uma plataforma de depuração extensível para aplicativos móveis, que oferece plugins para profiling de performance, inspeção de rede e muito mais.

## 3. Otimização de Renderizações

### Evitar Re-renderizações Desnecessárias

Por padrão, quando o estado ou as props de um componente mudam, ele e todos os seus filhos são re-renderizados. Isso pode ser ineficiente se os filhos não dependem das mudanças.

-   **`React.memo`**: É um Higher-Order Component (HOC) que memoriza um componente funcional. Ele só re-renderiza o componente se suas props mudarem.

    ```javascript
    const MeuComponente = React.memo(({ nome }) => {
      console.log('Renderizando MeuComponente');
      return <Text>{nome}</Text>;
    });
    ```

-   **`useMemo`**: Memoriza o resultado de um cálculo custoso, evitando que ele seja recalculado a cada renderização.

    ```javascript
    const valorCalculado = useMemo(() => {
      return calcularAlgoComplexo(dados);
    }, [dados]); // Só recalcula se 'dados' mudar
    ```

-   **`useCallback`**: Memoriza uma função, evitando que uma nova instância da função seja criada a cada renderização. Útil quando passamos funções como props para componentes filhos memorizados.

    ```javascript
    const handlePress = useCallback(() => {
      console.log('Botão pressionado');
    }, []); // A função é criada apenas uma vez
    ```

## 4. Otimização de Listas

Como vimos na Aula 9, usar `FlatList` ou `SectionList` é essencial para listas longas. Além disso:

-   **`keyExtractor`**: Sempre forneça uma chave única e estável para cada item. Evite usar o índice do array como chave, pois isso pode causar problemas se a ordem dos itens mudar.
-   **`getItemLayout`**: Se todos os itens da lista têm a mesma altura, forneça essa informação à `FlatList`. Isso permite que ela calcule o layout de forma mais eficiente.
-   **`removeClippedSubviews`**: Uma prop que, quando `true`, remove as views que estão fora da tela do DOM nativo, economizando memória. (Experimental)

## 5. Otimização de Imagens

-   **Redimensione as imagens**: Não carregue imagens maiores do que o necessário. Use ferramentas como `expo-image-manipulator` para redimensioná-las.
-   **Use formatos otimizados**: WebP oferece melhor compressão do que JPEG ou PNG.
-   **Lazy Loading**: Carregue imagens apenas quando elas estiverem prestes a aparecer na tela, especialmente em listas.

## 6. Boas Práticas Gerais

-   **Evite lógica complexa no `render`**: Mova cálculos pesados para `useMemo` ou para fora do componente.
-   **Minimize o uso da Bridge**: Operações que exigem muita comunicação entre o JavaScript e o código nativo podem ser lentas. Considere usar bibliotecas nativas para tarefas intensivas.
-   **Use bibliotecas otimizadas**: Para animações complexas, considere usar `react-native-reanimated`, que executa animações diretamente no thread de UI nativa.

---

### Referências
[1] [React Native Documentation: Performance](https://reactnative.dev/docs/performance)
[2] [React Documentation: Optimizing Performance](https://react.dev/learn/render-and-commit)
