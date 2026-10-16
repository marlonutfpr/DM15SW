import { View, Text, TextInput, StyleSheet } from 'react-native';

// Campo de texto com rótulo. Componente CONTROLADO: o valor mora no estado da
// tela, que o recebe de volta a cada tecla por `aoMudar`.
//
// As demais props (keyboardType, maxLength, placeholder...) passam direto
// para o TextInput com `...resto`.
export default function CampoTexto({ rotulo, valor, aoMudar, ...resto }) {
  return (
    <View style={estilos.container}>
      {rotulo && <Text style={estilos.rotulo}>{rotulo}</Text>}
      <TextInput
        style={estilos.campo}
        value={valor}
        onChangeText={aoMudar}
        placeholderTextColor="#9a918a"
        {...resto}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: 6,
  },
  rotulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b625c',
    textTransform: 'uppercase',
  },
  campo: {
    borderWidth: 1,
    borderColor: '#d8cfc7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
});
