import { Tabs } from 'expo-router';
import { DrawerToggleButton } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Layout do grupo (tabs): as abas. A estrutura é a mesma do Stack: um
// componente de layout e uma Screen por arquivo.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#a4492c',
        headerTintColor: '#a4492c',
        // Botão que abre o drawer. As abas estão DENTRO dele, então o botão
        // encontra o navegador de fora sozinho.
        headerLeft: () => (
          <DrawerToggleButton tintColor="#a4492c" accessibilityLabel="Abrir menu" />
        ),
      }}
    >
      {/* `tabBarIcon` recebe a cor e o tamanho já calculados pela barra: a
          aba ativa chega com a cor de `tabBarActiveTintColor`. */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
