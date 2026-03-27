_# Aula 11: Navegação com React Navigation_

## 1. O que é React Navigation?

Em um aplicativo móvel, a transição entre diferentes telas é uma parte fundamental da experiência do usuário. O React Navigation é a solução de navegação mais popular e recomendada pela comunidade para aplicativos React Native. Ele fornece uma maneira fácil de configurar a navegação entre telas com gestos e animações nativas.

## 2. Instalação e Configuração

O React Navigation é composto por vários pacotes. Primeiro, instalamos o pacote principal e suas dependências, que são necessárias para qualquer tipo de navegador que formos usar.

```bash
npm install @react-navigation/native

# Instalação das dependências no Expo
npx expo install react-native-screens react-native-safe-area-context
```

## 3. Stack Navigator: Navegação em Pilha

O Stack Navigator é o tipo de navegação mais comum. Ele gerencia as telas em uma pilha. Quando você navega para uma nova tela, ela é colocada no topo da pilha. Ao voltar, a tela do topo é removida, revelando a tela anterior.

### Instalação

```bash
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

### Exemplo de Uso

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Tela Inicial</Text>
    <Button 
      title="Ir para Detalhes"
      onPress={() => navigation.navigate('Detalhes')}
    />
  </View>
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Tela de Detalhes</Text>
  </View>
);

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Detalhes" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
```

## 4. Tab Navigator: Navegação por Abas

O Tab Navigator é ideal para exibir diferentes seções principais de um aplicativo, geralmente através de uma barra de abas na parte inferior da tela.

### Instalação

```bash
npm install @react-navigation/bottom-tabs
```

### Exemplo de Uso

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

const HomeScreen = () => <View><Text>Home</Text></View>;
const SettingsScreen = () => <View><Text>Configurações</Text></View>;

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
```

## 5. Drawer Navigator: Menu Lateral

O Drawer Navigator renderiza um menu lateral que pode ser aberto a partir da borda da tela. É útil para navegação com muitos itens.

### Instalação

```bash
npm install @react-navigation/drawer
# A dependência react-native-gesture-handler já foi instalada com o Stack Navigator
npx expo install react-native-reanimated
```

### Exemplo de Uso

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

const HomeScreen = () => <View><Text>Home</Text></View>;
const NotificationsScreen = () => <View><Text>Notificações</Text></View>;

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;
```

---

### Referências
[1] [React Navigation Documentation](https://reactnavigation.org/)
