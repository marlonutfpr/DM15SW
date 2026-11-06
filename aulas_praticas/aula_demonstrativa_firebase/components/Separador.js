import { View } from 'react-native';

// Espaço entre os itens de uma FlatList (ItemSeparatorComponent). A lista
// põe um entre cada par de itens — nem antes do primeiro, nem depois do
// último.
export default function Separador() {
  return <View style={{ height: 10 }} />;
}
