import { View, StyleSheet } from 'react-native';
import EstadoVazio from './EstadoVazio';
import Botao from './Botao';

// O estado de ERRO de uma requisição: a mensagem para o usuário e um jeito de
// tentar de novo. Sem `aoTentarDeNovo`, o botão não aparece.
//
// É o EstadoVazio da Aula 13 com um botão em `children`.
export default function AvisoDeErro({ mensagem, aoTentarDeNovo }) {
  return (
    <View style={estilos.container}>
      <EstadoVazio
        icone="cloud-offline-outline"
        titulo={mensagem}
        texto="Confira a conexão com a internet e tente de novo."
      >
        {aoTentarDeNovo && (
          <Botao titulo="Tentar de novo" icone="refresh" aoTocar={aoTentarDeNovo} />
        )}
      </EstadoVazio>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
