// services/favoritos.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// A chave é um detalhe do serviço. Nenhuma tela sabe que ela existe.
const CHAVE = 'favoritos';

// AsyncStorage guarda SÓ TEXTO: a lista vira texto ao salvar...
export async function salvarFavoritos(lista) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}

// ...e volta a ser lista ao ler. Na primeira abertura não há nada salvo, e
// getItem devolve null: JSON.parse(null) não quebra, mas devolveria null, e
// a tela esperava uma lista.
export async function lerFavoritos() {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : [];
}
