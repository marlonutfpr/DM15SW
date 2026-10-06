import { Stack } from 'expo-router';
import { FavoritosProvider } from '../contexts/FavoritosContext';
import { PedidosProvider } from '../contexts/PedidosContext';

// Quem chega direto em "/produto/3" — por um link de fora do app, ou
// digitando a URL na web — cairia numa pilha só com o detalhe, sem ter para
// onde voltar. A âncora diz qual tela fica sempre na base desta pilha.
export const unstable_settings = {
  anchor: '(drawer)',
};

// Layout raiz: o ponto mais alto do app. Os providers ficam AQUI, por fora
// do Stack, para que TODAS as telas — abas, drawer, detalhe e modal — leiam
// o mesmo estado. Um provider só alcança quem está dentro dele.
export default function Layout() {
  return (
    <FavoritosProvider>
      <PedidosProvider>
        <Stack screenOptions={{ headerTintColor: '#a4492c' }}>
          {/* O grupo (drawer) contém a gaveta e, dentro dela, as abas. O
              título só rotula o botão voltar no iOS. */}
          <Stack.Screen name="(drawer)" options={{ headerShown: false, title: 'Cardápio' }} />

          {/* O detalhe está FORA do grupo de abas: abre por cima delas. */}
          <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes' }} />

          {/* Modal: a tela pedido/[id].js não sabe que é modal. */}
          <Stack.Screen
            name="pedido/[id]"
            options={{ presentation: 'modal', title: 'Fazer pedido' }}
          />

          <Stack.Screen name="+not-found" options={{ title: 'Não encontrado' }} />
        </Stack>
      </PedidosProvider>
    </FavoritosProvider>
  );
}
