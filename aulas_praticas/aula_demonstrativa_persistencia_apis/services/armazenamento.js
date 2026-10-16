// services/armazenamento.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Só para a tela "Dados salvos": devolve tudo o que está no AsyncStorage,
// SEM JSON.parse, para mostrar que o que fica guardado é texto.
//
// Devolve uma lista de pares [chave, texto].
export async function lerTudoComoTexto() {
  const chaves = await AsyncStorage.getAllKeys();
  const pares = await AsyncStorage.multiGet(chaves);
  // Ordem alfabética: a ordem das chaves muda de plataforma para plataforma.
  return [...pares].sort(([a], [b]) => a.localeCompare(b));
}
