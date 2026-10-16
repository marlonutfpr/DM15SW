import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Rota "/sobre" só por este arquivo existir. Não há registro de tela em
// lugar nenhum: o caminho do arquivo é o endereço.
//
// Os dados abaixo são fictícios.
const INFORMACOES = [
  { id: 'local', icone: 'location-outline', texto: 'Bloco de convivência, térreo' },
  { id: 'horario', icone: 'time-outline', texto: 'Segunda a sexta, das 7h30 às 22h' },
  { id: 'pagamento', icone: 'card-outline', texto: 'Pix, débito e crédito' },
];

export default function Sobre() {
  return (
    <View style={estilos.container}>
      <Ionicons name="cafe" size={48} color="#a4492c" />
      <Text style={estilos.titulo}>Cafeteria UTFPR</Text>
      <Text style={estilos.texto}>Câmpus Dois Vizinhos</Text>

      <View style={estilos.lista}>
        {INFORMACOES.map((item) => (
          <View key={item.id} style={estilos.linha}>
            <Ionicons name={item.icone} size={20} color="#6b625c" />
            <Text style={estilos.info}>{item.texto}</Text>
          </View>
        ))}
      </View>

      <Text style={estilos.aviso}>
        Repare: a barra de abas sumiu. Esta tela está dentro do grupo (drawer)
        e fora do grupo (tabs).
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 8,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
  },
  texto: {
    fontSize: 15,
    color: '#6b625c',
  },
  lista: {
    alignSelf: 'stretch', // ocupa a largura toda, apesar do alignItems do pai
    gap: 12,
    marginTop: 20,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    padding: 16,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  info: {
    flexShrink: 1, // deixa o texto quebrar em vez de empurrar o ícone
    fontSize: 15,
  },
  aviso: {
    alignSelf: 'stretch',
    marginTop: 12,
    backgroundColor: '#fdf3dc',
    color: '#8a5a00',
    fontSize: 13,
    padding: 10,
    borderRadius: 8,
  },
});
