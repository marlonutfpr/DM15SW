import { Stack } from 'expo-router';

// Quem chega direto em "/produto/3" — por um link de fora do app, ou
// digitando a URL na web — cairia numa pilha só com o detalhe, sem ter para
// onde voltar. A âncora diz qual tela fica sempre na base desta pilha.
export const unstable_settings = {
  anchor: '(drawer)',
};

// Layout raiz: NÃO é rota. É quem organiza as telas do app inteiro.
// Stack.Screen não cria rotas: só configura as que já existem como arquivos.
// O `name` é o caminho do arquivo, sem a extensão.
export default function Layout() {
  return (
    <Stack screenOptions={{ headerTintColor: '#a4492c' }}>
      {/* O grupo (drawer) contém a gaveta e, dentro dela, as abas. Para esta
          pilha ele é UMA tela. O cabeçalho fica escondido porque quem está
          dentro tem o próprio; o título só rotula o botão voltar no iOS. */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false, title: 'Cardápio' }} />

      {/* O detalhe está FORA do grupo de abas: abre por cima delas e esconde
          a barra de abas. Cabeçalho e botão de voltar vêm prontos. */}
      <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes' }} />

      {/* MODAL: é uma rota como qualquer outra — o que muda é só a
          apresentação. A tela pedido/[id].js não sabe que é modal. */}
      <Stack.Screen
        name="pedido/[id]"
        options={{ presentation: 'modal', title: 'Fazer pedido' }}
      />

      <Stack.Screen name="+not-found" options={{ title: 'Não encontrado' }} />
    </Stack>
  );
}
