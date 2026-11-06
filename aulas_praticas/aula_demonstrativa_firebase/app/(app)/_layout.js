import { Stack } from 'expo-router';
import { FavoritosProvider } from '../../contexts/FavoritosContext';
import { ProdutosProvider } from '../../contexts/ProdutosContext';

// Quem chega direto em "/produto/p3" cairia numa pilha só com o detalhe. A
// âncora diz qual tela fica sempre na base desta pilha.
export const unstable_settings = {
  anchor: '(drawer)',
};

// Layout do grupo (app): tudo o que só existe para quem entrou.
//
// Os providers saíram do layout raiz e vieram para cá. O FavoritosProvider
// escuta os favoritos DO USUÁRIO, e por isso só pode montar depois do login.
// Ao sair, este grupo inteiro desmonta, e as escutas do Firestore são
// encerradas pela limpeza dos useEffect.
export default function AppLayout() {
  return (
    <ProdutosProvider>
      <FavoritosProvider>
        <Stack screenOptions={{ headerTintColor: '#a4492c' }}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false, title: 'Cardápio' }} />
          <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes' }} />
          <Stack.Screen
            name="pedido/[id]"
            options={{ presentation: 'modal', title: 'Fazer pedido' }}
          />
        </Stack>
      </FavoritosProvider>
    </ProdutosProvider>
  );
}
