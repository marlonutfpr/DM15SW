import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Layout do grupo (drawer): o menu lateral. Assim como (tabs), o grupo NÃO
// vira segmento de URL.
//
// O drawer guarda as seções pouco frequentes. As principais continuam nas
// abas, que ficam sempre visíveis: abrir o menu custa um toque a mais.
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#a4492c',
        headerTintColor: '#a4492c',
      }}
    >
      {/* As abas inteiras são UM destino do drawer. O cabeçalho do drawer
          fica escondido aqui para não empilhar com o das abas — o botão que
          abre o menu vai dentro do cabeçalho delas (ver (tabs)/_layout.js). */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Início',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* `drawerLabel` é o texto no menu; `title` é o do cabeçalho. */}
      <Drawer.Screen
        name="sobre"
        options={{
          drawerLabel: 'Sobre a cafeteria',
          title: 'Sobre a cafeteria',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="navegacao"
        options={{
          drawerLabel: 'Formas de navegar',
          title: 'Formas de navegar',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="rotas"
        options={{
          drawerLabel: 'Mapa de rotas',
          title: 'Mapa de rotas',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="git-network-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
