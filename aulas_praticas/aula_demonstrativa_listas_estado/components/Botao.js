import { Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Variantes por props. Com duas variantes, um ternário resolve (como no
// slide). Com três, um objeto indexado pelo nome da variante fica mais
// legível do que ternários encadeados — e a quarta variante é uma linha.
const VARIANTES = {
  primario: { fundo: '#a4492c', borda: '#a4492c', conteudo: '#ffffff' },
  secundario: { fundo: '#ffffff', borda: '#a4492c', conteudo: '#a4492c' },
  perigo: { fundo: '#ffffff', borda: '#b3261e', conteudo: '#b3261e' },
};

export default function Botao({
  titulo,
  aoTocar = () => {}, // padrão em prop de função: sem ele, tocar derruba o app
  variante = 'primario', // 'primario', 'secundario' ou 'perigo'
  desabilitado = false,
  icone = null, // nome de um ícone do Ionicons; sem ele, o botão é só texto
}) {
  // Variante desconhecida cai na primária em vez de quebrar.
  const cores = VARIANTES[variante] ?? VARIANTES.primario;

  return (
    <Pressable
      style={[
        estilos.botao,
        { backgroundColor: cores.fundo, borderColor: cores.borda },
        desabilitado && estilos.desabilitado,
      ]}
      onPress={aoTocar}
      disabled={desabilitado}
    >
      {icone && <Ionicons name={icone} size={18} color={cores.conteudo} />}
      <Text style={[estilos.texto, { color: cores.conteudo }]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  desabilitado: {
    opacity: 0.4,
  },
  texto: {
    fontSize: 15,
    fontWeight: '600',
  },
});
