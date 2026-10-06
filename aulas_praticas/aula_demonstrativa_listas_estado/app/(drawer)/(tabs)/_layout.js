import { Tabs } from 'expo-router';
import { DrawerToggleButton } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFavoritos } from '../../../contexts/FavoritosContext';

// Layout do grupo (tabs). Um layout também é componente: está dentro do
// FavoritosProvider (app/_layout.js) e pode ler o contexto como qualquer
// tela. É assim que o selo da aba Favoritos acompanha o total.
export default function TabsLayout() {
  const { favoritos } = useFavoritos();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#a4492c',
        headerTintColor: '#a4492c',
        headerLeft: () => (
          <DrawerToggleButton tintColor="#a4492c" accessibilityLabel="Abrir menu" />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color, size }) => <Ionicons name="cafe" color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          // Sem favoritos, `undefined` esconde o selo (0 apareceria como "0").
          tabBarBadge: favoritos.length > 0 ? favoritos.length : undefined,
          tabBarBadgeStyle: { backgroundColor: '#a4492c' },
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
