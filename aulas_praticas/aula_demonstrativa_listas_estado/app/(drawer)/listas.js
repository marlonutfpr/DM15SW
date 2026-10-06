import { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import Botao from '../../components/Botao';
import Painel from '../../components/Painel';

// Rota "/listas". A mesma lista de 1000 linhas, desenhada de dois jeitos.
// Cada linha avisa quando é montada e desmontada, e o botão "Contar" mostra
// quantas existem de fato na memória naquele instante.

const LINHAS = Array.from({ length: 1000 }, (_, indice) => ({ id: indice + 1 }));

// Variável de módulo, e não estado: se cada linha chamasse um setState ao
// montar, seriam 1000 renderizações da tela. Contamos por fora e lemos
// quando o botão pede.
let montadas = 0;

function Linha({ numero }) {
  useEffect(() => {
    montadas += 1;
    return () => {
      montadas -= 1;
    };
  }, []);

  return <Text style={estilos.linha}>Linha {numero}</Text>;
}

export default function ScrollViewVersusFlatList() {
  // Estado local: só esta tela usa.
  const [modo, setModo] = useState('flatlist'); // 'flatlist' ou 'scrollview'
  const [contagem, setContagem] = useState(null);

  function trocarPara(novoModo) {
    setModo(novoModo);
    setContagem(null); // a contagem anterior não vale para o novo modo
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <View style={estilos.linhaBotoes}>
          <View style={estilos.coluna}>
            <Botao
              titulo="FlatList"
              variante={modo === 'flatlist' ? 'primario' : 'secundario'}
              aoTocar={() => trocarPara('flatlist')}
            />
          </View>
          <View style={estilos.coluna}>
            <Botao
              titulo="ScrollView + map"
              variante={modo === 'scrollview' ? 'primario' : 'secundario'}
              aoTocar={() => trocarPara('scrollview')}
            />
          </View>
        </View>

        <Painel titulo="Linhas montadas agora" variante="destaque">
          <Text style={estilos.contagem}>
            {contagem === null ? 'Toque em Contar' : `${contagem} de ${LINHAS.length}`}
          </Text>
          <Botao
            titulo="Contar"
            icone="calculator-outline"
            variante="secundario"
            aoTocar={() => setContagem(montadas)}
          />
        </Painel>
      </View>

      {/* Só um dos dois existe por vez: trocar de modo desmonta o outro. */}
      {modo === 'scrollview' ? (
        <ScrollView style={estilos.lista}>
          {LINHAS.map((item) => (
            <Linha key={item.id} numero={item.id} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          style={estilos.lista}
          data={LINHAS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Linha numero={item.id} />}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topo: {
    padding: 16,
    gap: 12,
  },
  linhaBotoes: {
    flexDirection: 'row',
    gap: 10,
  },
  coluna: {
    flex: 1, // divide a largura em vez de fixar pixels
  },
  contagem: {
    fontSize: 22,
    fontWeight: '600',
    color: '#a4492c',
  },
  lista: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#e8e2dc',
  },
  linha: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe6',
  },
});
