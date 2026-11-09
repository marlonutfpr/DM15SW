import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cadastrar, entrar, mensagemDeErro } from '../services/auth';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';

// Rota "/login". Só existe para quem NÃO entrou (Stack.Protected, no layout
// raiz).
//
// Repare que esta tela não navega para lugar nenhum depois do login. Ela só
// chama `entrar`. O onAuthStateChanged percebe a sessão nova, o layout raiz
// troca as rotas protegidas e o Expo Router leva ao cardápio.
export default function Login() {
  // false: entrar; true: criar conta, que pede também o nome
  const [criando, setCriando] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  function trocarModo() {
    setCriando(!criando);
    setErro(null);
  }

  function criarConta() {
    // Valida antes do Firebase: depois do createUser, a conta já existe.
    if (nome.trim().split(/\s+/).length < 2) {
      setErro('Digite o nome completo.');
      return;
    }
    enviar(() => cadastrar(nome.trim(), email.trim(), senha));
  }

  // `acao` é entrar ou cadastrar: mesma tela, mesmos estados.
  async function enviar(acao) {
    setEnviando(true);
    setErro(null);
    try {
      await acao();
    } catch (e) {
      setErro(mensagemDeErro(e));
      setEnviando(false);
    }
    // Sem setEnviando(false) no sucesso: esta tela vai desmontar.
  }

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={estilos.marca}>
        <Ionicons name="cafe" size={48} color="#a4492c" />
        <Text style={estilos.titulo}>Cafeteria UTFPR</Text>
        <Text style={estilos.texto}>Entre para ver o cardápio, favoritar e fazer pedidos.</Text>
      </View>

      {criando && (
        <CampoTexto
          rotulo="Nome completo"
          valor={nome}
          aoMudar={setNome}
          placeholder="Seu nome e sobrenome"
          autoCapitalize="words"
          autoComplete="name"
        />
      )}
      <CampoTexto
        rotulo="E-mail"
        valor={email}
        aoMudar={setEmail}
        placeholder="voce@alunos.utfpr.edu.br"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <CampoTexto
        rotulo="Senha"
        valor={senha}
        aoMudar={setSenha}
        placeholder="Pelo menos 6 caracteres"
        secureTextEntry
        autoComplete="password"
      />

      {erro && <Text style={estilos.erro}>{erro}</Text>}

      <View style={estilos.acoes}>
        <Botao
          titulo={enviando ? 'Aguarde...' : criando ? 'Criar conta' : 'Entrar'}
          icone={criando ? 'person-add-outline' : 'log-in-outline'}
          aoTocar={criando ? criarConta : () => enviar(() => entrar(email.trim(), senha))}
          desabilitado={enviando}
        />
        <Botao
          titulo={criando ? 'Já tenho conta' : 'Criar conta'}
          variante="secundario"
          icone={criando ? 'log-in-outline' : 'person-add-outline'}
          aoTocar={trocarModo}
          desabilitado={enviando}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 14,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  marca: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
  },
  texto: {
    fontSize: 14,
    color: '#6b625c',
    textAlign: 'center',
  },
  erro: {
    fontSize: 14,
    color: '#b3261e',
    fontWeight: '600',
  },
  acoes: {
    gap: 10,
    marginTop: 6,
  },
});
