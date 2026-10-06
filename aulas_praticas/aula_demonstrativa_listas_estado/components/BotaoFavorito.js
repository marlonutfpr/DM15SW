import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// O coração. Responsabilidade única: desenhar cheio ou vazio e avisar o
// toque. NÃO guarda estado e NÃO sabe que existe um contexto de favoritos —
// por isso serve igual no Cardápio (Context) e na tela de elevação (estado
// do pai).
export default function BotaoFavorito({ ativo, aoTocar, tamanho = 24 }) {
  return (
    <Pressable
      onPress={aoTocar}
      hitSlop={8} // área de toque maior que o ícone
      accessibilityRole="button"
      accessibilityLabel={ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Ionicons name={ativo ? 'heart' : 'heart-outline'} size={tamanho} color="#a4492c" />
    </Pressable>
  );
}
