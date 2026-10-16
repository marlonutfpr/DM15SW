// services/pedidos.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// O mesmo molde de services/favoritos.js, com outra chave. Cada assunto tem a
// sua: apagar os pedidos não mexe nos favoritos.
const CHAVE = 'pedidos';

export async function salvarPedidos(lista) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}

export async function lerPedidos() {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : [];
}
