import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { lerTudoComoTexto } from '../../services/armazenamento';
import EstadoVazio from '../../components/EstadoVazio';
import Painel from '../../components/Painel';

// Rota "/armazenamento". Mostra o AsyncStorage por dentro, sem JSON.parse:
// o que está lá é TEXTO. Os colchetes e as aspas são do JSON.stringify.
export default function DadosSalvos() {
  const [pares, setPares] = useState([]);

  // As telas do drawer não desmontam ao trocar de tela, então um useEffect
  // com [] leria uma vez só. useFocusEffect roda TODA vez que a tela ganha o
  // foco: favorite um produto, volte aqui, e o texto já mudou.
  //
  // O useCallback é exigência do useFocusEffect: sem ele, a função seria
  // nova a cada renderização e o efeito rodaria a cada renderização.
  useFocusEffect(
    useCallback(() => {
      lerTudoComoTexto().then(setPares);
    }, [])
  );

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.regra}>
        Chave e valor, e o valor é sempre texto. Nada aqui é segredo: quem
        instala o app consegue ler.
      </Text>

      {pares.length === 0 && (
        <EstadoVazio
          icone="file-tray-outline"
          titulo="Nada salvo ainda"
          texto="Favorite um produto ou faça um pedido e volte aqui."
        />
      )}

      {pares.map(([chave, texto]) => (
        <Painel key={chave} titulo={`Chave: ${chave}`}>
          <Text style={estilos.valor}>{texto}</Text>
          <Text style={estilos.tamanho}>
            {typeof texto} · {texto?.length ?? 0} caracteres
          </Text>
        </Painel>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    padding: 16,
    gap: 10,
  },
  regra: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  valor: {
    // Fonte de largura fixa, para o texto parecer o que é: texto cru.
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 13,
  },
  tamanho: {
    fontSize: 12,
    color: '#6b625c',
  },
});
