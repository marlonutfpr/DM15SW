import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Layout do grupo (drawer): o menu lateral. As abas continuam sendo o
// destino principal; as telas da Aula 13 que só servem para demonstrar um
// conceito ficam aqui.
//
// Cada Drawer.Screen repetia o mesmo ícone com a mesma cor e tamanho; a
// função abaixo evita copiar e colar.
function icone(nome) {
  return ({ color, size }) => <Ionicons name={nome} color={color} size={size} />;
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#a4492c',
        headerTintColor: '#a4492c',
      }}
    >
      {/* As abas inteiras são UM destino do drawer, sem cabeçalho próprio
          para não empilhar com o das abas. */}
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: 'Início', headerShown: false, drawerIcon: icone('home-outline') }}
      />

      <Drawer.Screen
        name="pedidos"
        options={{ title: 'Meus pedidos', drawerIcon: icone('receipt-outline') }}
      />

      <Drawer.Screen
        name="listas"
        options={{ title: 'ScrollView × FlatList', drawerIcon: icone('list-outline') }}
      />

      <Drawer.Screen
        name="elevacao"
        options={{ title: 'Elevação de estado', drawerIcon: icone('arrow-up-circle-outline') }}
      />

      <Drawer.Screen
        name="estado"
        options={{ title: 'Onde mora cada estado', drawerIcon: icone('map-outline') }}
      />

      <Drawer.Screen
        name="sobre"
        options={{ title: 'Sobre a cafeteria', drawerIcon: icone('information-circle-outline') }}
      />
    </Drawer>
  );
}
