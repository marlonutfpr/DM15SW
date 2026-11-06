import { Stack } from 'expo-router';
import { useUsuario } from '../hooks/useUsuario';

// Layout raiz: decide o que existe para quem está ou não está logado.
//
// Com guard falso, a rota deixa de existir: quem não entrou não chega ao
// cardápio nem digitando "/produto/p3" na barra de endereço, e o Expo Router
// leva para a primeira rota disponível, o login. Ao entrar, o contrário.
//
// Isso protege a NAVEGAÇÃO, não o dado. Com o id do projeto, qualquer um
// chama o Firestore sem passar por estas telas. Quem protege o dado são as
// regras (firestore.rules).
export default function RootLayout() {
  const usuario = useUsuario();

  // Verificando a sessão salva. Sem este retorno, quem já entrou veria o
  // login por um instante.
  if (usuario === undefined) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!usuario}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!usuario}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Screen
        name="+not-found"
        options={{ headerShown: true, title: 'Não encontrado', headerTintColor: '#a4492c' }}
      />
    </Stack>
  );
}
