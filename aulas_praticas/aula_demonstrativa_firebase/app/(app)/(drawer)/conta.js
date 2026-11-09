import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../services/firebase';
import { sair } from '../../../services/auth';
import { buscarUsuario } from '../../../services/usuarios';
import Botao from '../../../components/Botao';
import Painel from '../../../components/Painel';

// Rota "/conta". Mostra quem o Authentication diz que você é e o documento
// que o Firestore guarda com esse uid.
//
// O uid é o que as regras usam em request.auth.uid. É ele o id do documento
// em usuarios/{uid}, o valor do campo usuarioId de cada pedido e o caminho
// usuarios/{uid}/favoritos.
export default function MinhaConta() {
  // Dentro de (app), a rota já está protegida: currentUser não é null.
  const usuario = auth.currentUser;

  // undefined: carregando; null: conta sem documento
  const [dados, setDados] = useState(undefined);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    buscarUsuario(usuario.uid)
      .then(setDados)
      .catch(() => setErro(true));
  }, [usuario.uid]);

  function textoDoCadastro() {
    if (erro) return 'Não foi possível ler os dados do usuário.';
    if (dados === undefined) return 'Carregando...';
    if (dados === null) return 'Documento ainda não criado. Saia e entre de novo.';
    const data = dados.criadoEm?.toDate().toLocaleDateString('pt-BR');
    return `${dados.nome || 'Nome não informado'}\n${dados.email}\nCadastro em ${data}`;
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Ionicons name="person-circle-outline" size={56} color="#a4492c" />
        {dados?.nome ? <Text style={estilos.nome}>{dados.nome}</Text> : null}
        <Text style={estilos.email}>{usuario.email}</Text>
      </View>

      <Painel titulo="uid">
        <Text style={estilos.uid} selectable>
          {usuario.uid}
        </Text>
      </Painel>

      <Painel titulo="Firestore: usuarios/{uid}">
        <Text style={estilos.cadastro}>{textoDoCadastro()}</Text>
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
  nome: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#6b625c',
  },
  uid: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  cadastro: {
    fontSize: 14,
    lineHeight: 20,
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
