import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../services/firebase';
import { sair } from '../../../services/auth';
import Botao from '../../../components/Botao';
import Painel from '../../../components/Painel';

// Rota "/conta". Mostra quem o Authentication diz que você é.
//
// O uid é o que as regras usam em request.auth.uid. É ele que vai no campo
// usuarioId de cada pedido e no caminho usuarios/{uid}/favoritos.
export default function MinhaConta() {
  // Dentro de (app), a rota já está protegida: currentUser não é null.
  const usuario = auth.currentUser;

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Ionicons name="person-circle-outline" size={56} color="#a4492c" />
        <Text style={estilos.email}>{usuario.email}</Text>
      </View>

      <Painel titulo="uid">
        <Text style={estilos.uid} selectable>
          {usuario.uid}
        </Text>
      </Painel>

      <Text style={estilos.aviso}>
        Ao sair, esta tela não navega para o login. O layout raiz percebe que
        a sessão acabou, e o Stack.Protected troca as rotas.
      </Text>

      <View style={estilos.acoes}>
        <Botao titulo="Sair" icone="log-out-outline" variante="perigo" aoTocar={sair} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 14,
    backgroundColor: '#ffffff',
  },
  topo: {
    alignItems: 'center',
    gap: 6,
    marginVertical: 12,
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
  },
  uid: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  aviso: {
    backgroundColor: '#fdf3dc',
    color: '#8a5a00',
    fontSize: 13,
    padding: 10,
    borderRadius: 8,
  },
  acoes: {
    marginTop: 'auto',
  },
});
