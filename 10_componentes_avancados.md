_# Aula 10: Componentes Avançados de Interface_

## 1. Modal e Alert

- **`<Modal>`**: O componente Modal é usado para apresentar conteúdo acima de uma view principal. É ideal para formulários, alertas personalizados ou qualquer conteúdo que precise de foco total do usuário. Ele pode ser animado e sua visibilidade é controlada por uma propriedade de estado.

- **`Alert`**: Uma API que permite disparar um diálogo de alerta nativo do sistema. É mais simples que o Modal e serve para mensagens rápidas, confirmações ou alertas de erro.

```javascript
import React, { useState } from 'react';
import { Modal, View, Text, Button, Alert, StyleSheet } from 'react-native';

const AlertasEModais = () => {
  const [modalVisivel, setModalVisivel] = useState(false);

  const showAlert = () => {
    Alert.alert(
      'Título do Alerta',
      'Esta é a mensagem do alerta.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressionado') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Este é um modal!</Text>
            <Button title="Fechar Modal" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Mostrar Modal" onPress={() => setModalVisivel(true)} />
      <View style={{ marginTop: 10 }}>
        <Button title="Mostrar Alerta" onPress={showAlert} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center' },
});

export default AlertasEModais;
```

## 2. ActivityIndicator e Feedback Visual

O `<ActivityIndicator>` exibe um indicador de carregamento circular. É essencial para fornecer feedback ao usuário durante operações assíncronas, como uma chamada de API, informando que o aplicativo não travou e está processando algo.

```javascript
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const IndicadorDeAtividade = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma operação de carregamento
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <View />; // Retorna a view principal após o carregamento
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default IndicadorDeAtividade;
```

## 3. Switch e Picker

- **`<Switch>`**: Um componente booleano de controle, que renderiza um interruptor de liga/desliga.
- **`<Picker>`**: Renderiza um seletor de itens nativo. (Observação: O Picker foi movido do core do React Native para a biblioteca `@react-native-picker/picker`).

```javascript
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Seletores = () => {
  const [notificacoes, setNotificacoes] = useState(false);
  const [linguagem, setLinguagem] = useState('js');

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Receber notificações?</Text>
        <Switch
          value={notificacoes}
          onValueChange={setNotificacoes}
        />
      </View>

      <Picker
        selectedValue={linguagem}
        onValueChange={(itemValue) => setLinguagem(itemValue)}
      >
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="py" />
        <Picker.Item label="Java" value="java" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
});

export default Seletores;
```

## 4. TouchableOpacity e Gestos Básicos

O `TouchableOpacity` é um wrapper que torna suas views responsivas ao toque. Ao ser pressionado, ele diminui a opacidade da view, dando um feedback visual ao usuário. É um dos componentes de toque mais utilizados pela sua simplicidade e eficácia.

```javascript
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const BotaoCustomizado = () => (
  <View style={styles.container}>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => alert('Pressionado!')}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Botão com Opacidade</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
});

export default BotaoCustomizado;
```

---

### Referências
[1] [React Native Documentation: Components and APIs](https://reactnative.dev/docs/components-and-apis)
[2] [@react-native-picker/picker Documentation](https://github.com/react-native-picker/picker)
