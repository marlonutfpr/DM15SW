_# Aula 12: Navegação Avançada com React Navigation_

## 1. Passagem de Parâmetros entre Telas

É muito comum a necessidade de passar dados de uma tela para outra. Por exemplo, ao clicar em um item de uma lista, você navega para uma tela de detalhes que precisa saber qual item foi clicado. O React Navigation torna isso simples através da função `navigate`.

```javascript
// Tela de Origem (ex: uma lista de usuários)
<Button
  title="Ver Perfil do João"
  onPress={() => {
    navigation.navigate('Perfil', {
      userId: 1,
      userName: 'João',
    });
  }}
/>

// Tela de Destino (Perfil)
const PerfilScreen = ({ route, navigation }) => {
  // Acessa os parâmetros via `route.params`
  const { userId, userName } = route.params;

  return (
    <View>
      <Text>ID do Usuário: {userId}</Text>
      <Text>Nome: {userName}</Text>
    </View>
  );
};
```

## 2. Navegação Aninhada (Nested Navigation)

É possível aninhar navegadores uns dentro dos outros. Um cenário comum é ter um Stack Navigator dentro de cada aba de um Tab Navigator. Isso permite que cada aba gerencie sua própria pilha de navegação de forma independente.

```javascript
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      {/* O componente do Tab.Screen agora é um navegador inteiro */}
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: 'Início' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
```

## 3. Customização de Headers e Tabs

O React Navigation oferece uma vasta gama de opções para customizar a aparência dos navegadores, que podem ser definidas na prop `options` de cada `Screen`.

### Customizando o Header do Stack Navigator

```javascript
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'Meu App',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff', // Cor do texto e do botão de voltar
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button onPress={() => alert('Isso é um botão!')} title="Info" color="#fff" />
    ),
  }}
/>
```

### Customizando a Tab Bar

```javascript
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarLabel: 'Início',
    tabBarIcon: ({ color, size }) => (
      // Exige a instalação de uma biblioteca de ícones, como @expo/vector-icons
      <MaterialCommunityIcons name="home" color={color} size={size} />
    ),
    tabBarBadge: 3, // Pequeno emblema no ícone da aba
  }}
/>
```

## 4. Deep Linking e Navegação Programática

- **Deep Linking**: Permite que URLs externas (ou notificações push) abram seu aplicativo diretamente em uma tela específica. A configuração é feita no `NavigationContainer`.

- **Navegação Programática**: Além de `navigate`, o objeto `navigation` oferece outros métodos úteis:
    - `navigation.goBack()`: Volta para a tela anterior na pilha.
    - `navigation.push('NomeDaTela')`: Adiciona outra instância da mesma tela à pilha (útil para navegar para detalhes de itens relacionados).
    - `navigation.popToTop()`: Volta para a primeira tela da pilha.

---

### Referências
[1] [React Navigation Documentation: Passing parameters to routes](https://reactnavigation.org/docs/params)
[2] [React Navigation Documentation: Nesting navigators](https://reactnavigation.org/docs/nesting-navigators)
[3] [React Navigation Documentation: Configuring the header bar](https://reactnavigation.org/docs/headers)
