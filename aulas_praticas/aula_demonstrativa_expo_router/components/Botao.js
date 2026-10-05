import { Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Botao({
  titulo,
  aoTocar = () => {}, // padrão em prop de função: sem ele, tocar derruba o app
  variante = 'primario', // 'primario' ou 'secundario'
  desabilitado = false,
  icone = null, // nome de um ícone do Ionicons; sem ele, o botão é só texto
}) {
  const secundario = variante === 'secundario';
  const corDoConteudo = secundario ? '#a4492c' : '#ffffff';

  return (
    <Pressable
      style={[
        estilos.botao,
        secundario && estilos.secundario,
        desabilitado && estilos.desabilitado,
      ]}
      onPress={aoTocar}
      disabled={desabilitado}
    >
      {icone && <Ionicons name={icone} size={18} color={corDoConteudo} />}
      <Text style={[estilos.texto, { color: corDoConteudo }]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#a4492c',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  secundario: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#a4492c',
  },
  desabilitado: {
    opacity: 0.4,
  },
  texto: {
    fontSize: 15,
    fontWeight: '600',
  },
});
