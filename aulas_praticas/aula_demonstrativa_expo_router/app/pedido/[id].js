import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { produtos, formatarPreco } from '../../dados/produtos';
import Botao from '../../components/Botao';

// Rota "/pedido/<id>", apresentada como MODAL (ver app/_layout.js).
//
// Modal serve para uma tarefa curta que interrompe o fluxo e devolve o
// usuário exatamente aonde ele estava. Fechar é voltar: `router.back()`.
export default function FazerPedido() {
  const { id } = useLocalSearchParams();
  const produto = produtos.find((p) => p.id === Number(id));

  const [quantidade, setQuantidade] = useState(1);
  const [confirmado, setConfirmado] = useState(false);

  // Derivado: sai da quantidade e do preço, não precisa de outro estado.
  const total = produto.preco * quantidade;

  if (confirmado) {
    return (
      <View style={estilos.centro}>
        <Ionicons name="checkmark-circle" size={56} color="#2e7d32" />
        <Text style={estilos.titulo}>Pedido confirmado</Text>
        <Text style={estilos.aviso}>
          {quantidade} x {produto.nome} · {formatarPreco(total)}
        </Text>
        <Text style={estilos.aviso}>
          Nesta versão o pedido não é guardado em lugar nenhum: isso exige
          estado compartilhado, que é a Aula 13.
        </Text>
        <Botao titulo="Fechar" aoTocar={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{produto.nome}</Text>
      <Text style={estilos.aviso}>{formatarPreco(produto.preco)} cada</Text>

      <View style={estilos.quantidade}>
        {/* Forma com função: o novo valor depende do anterior. */}
        <Pressable
          style={[estilos.passo, quantidade === 1 && estilos.passoDesabilitado]}
          disabled={quantidade === 1}
          onPress={() => setQuantidade((anterior) => anterior - 1)}
        >
          <Ionicons name="remove" size={22} color="#a4492c" />
        </Pressable>

        <Text style={estilos.numero}>{quantidade}</Text>

        <Pressable
          style={[estilos.passo, quantidade === 9 && estilos.passoDesabilitado]}
          disabled={quantidade === 9}
          onPress={() => setQuantidade((anterior) => anterior + 1)}
        >
          <Ionicons name="add" size={22} color="#a4492c" />
        </Pressable>
      </View>

      <Text style={estilos.total}>Total: {formatarPreco(total)}</Text>

      <View style={estilos.acoes}>
        <Botao
          titulo="Confirmar pedido"
          icone="checkmark-circle"
          aoTocar={() => setConfirmado(true)}
        />
        {/* Cancelar e Fechar fazem a mesma coisa: voltar. O modal sai da
            pilha e a tela de baixo reaparece como estava. */}
        <Botao titulo="Cancelar" variante="secundario" aoTocar={() => router.back()} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
  },
  aviso: {
    fontSize: 14,
    color: '#6b625c',
    textAlign: 'center',
  },
  quantidade: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  passo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#a4492c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passoDesabilitado: {
    opacity: 0.3,
  },
  numero: {
    fontSize: 28,
    fontWeight: '600',
    minWidth: 32,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a4492c',
    textAlign: 'center',
  },
  acoes: {
    marginTop: 'auto', // empurra os botões para o fim da tela
    gap: 10,
  },
});
