_# Aula 07: Componentes Básicos do React Native_

## 1. A Base da UI: View, Text e Image

Estes são os blocos de construção mais fundamentais de qualquer interface em React Native.

- **`<View>`**: É o contêiner mais básico. Mapeia para `UIView` no iOS e `android.view.View` no Android. É ideal para agrupar outros componentes e aplicar estilos de layout, como Flexbox.
- **`<Text>`**: Usado para exibir qualquer tipo de texto. Todo texto em um aplicativo React Native deve estar dentro de um componente `<Text>`.
- **`<Image>`**: Renderiza imagens. Pode carregar imagens de fontes locais (no seu projeto) ou remotas (de uma URL).

```javascript
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ComponentesBasicos = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Olá, React Native!</Text>
    <Image 
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      style={styles.logo}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  logo: { width: 50, height: 50, marginTop: 10 },
});

export default ComponentesBasicos;
```

## 2. Interação do Usuário: Button e Pressable

- **`<Button>`**: Um botão simples e multiplataforma. Sua aparência é definida pelo sistema operacional e oferece poucas opções de customização.
- **`<Pressable>`**: Um componente mais moderno e flexível, introduzido para substituir os `Touchable*`. Ele permite detectar diferentes estágios de uma interação de toque (como `onPressIn`, `onPressOut`) e customizar o feedback visual.

```javascript
import React from 'react';
import { View, Button, Pressable, Text, Alert } from 'react-native';

const Botoes = () => (
  <View>
    <Button 
      title="Aperte-me (Button)"
      onPress={() => Alert.alert('Botão simples clicado!')}
      color="#841584"
    />
    <Pressable 
      onPress={() => Alert.alert('Pressable clicado!')} 
      style={({ pressed }) => [{
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#2196F3',
        padding: 10,
        marginTop: 10,
      }]}
    >
      <Text style={{ color: 'white' }}>Aperte-me (Pressable)</Text>
    </Pressable>
  </View>
);

export default Botoes;
```

## 3. Entrada de Dados: TextInput

O `<TextInput>` é o componente padrão para que o usuário possa inserir texto no aplicativo através do teclado.

```javascript
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputExemplo = () => {
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onChangeText={setNome}
        value={nome}
      />
      <Text>Olá, {nome || 'visitante'}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});

export default InputExemplo;
```

## 4. Conteúdo Rolável: ScrollView e KeyboardAvoidingView

- **`<ScrollView>`**: Um contêiner genérico que permite rolar o conteúdo que excede o tamanho da tela. Ele renderiza todos os seus filhos de uma vez, o que pode ser um problema de performance para listas muito longas.
- **`<KeyboardAvoidingView>`**: Um componente que ajusta automaticamente sua altura, posição ou preenchimento em resposta à aparição do teclado, evitando que o teclado cubra os inputs.

```javascript
import React from 'react';
import { ScrollView, KeyboardAvoidingView, TextInput, Platform, StyleSheet } from 'react-native';

const ScrollExemplo = () => (
  <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={styles.container}
  >
    <ScrollView>
      <TextInput placeholder="Campo 1" style={styles.input} />
      <TextInput placeholder="Campo 2" style={styles.input} />
      {/* Adicione mais campos para ver o scroll e o teclado funcionando */}
    </ScrollView>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { height: 50, margin: 12, borderWidth: 1, padding: 10 },
});

export default ScrollExemplo;
```

---

### Referências
[1] [React Native Documentation: Core Components](https://reactnative.dev/docs/components-and-apis)
