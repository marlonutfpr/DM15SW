_# Aula 13: Armazenamento Local com AsyncStorage_

## 1. Conceitos de Armazenamento Local

Nem todos os dados de um aplicativo precisam vir de um servidor. Muitas vezes, precisamos armazenar informações diretamente no dispositivo do usuário. Isso é útil para:

-   **Preferências do usuário**: Como tema (claro/escuro), idioma, ou configurações de notificação.
-   **Dados de sessão**: Manter um usuário logado entre os usos do aplicativo.
-   **Cache de dados**: Armazenar dados de API localmente para que o aplicativo possa ser usado offline ou para carregar mais rápido.

## 2. O que é o AsyncStorage?

O AsyncStorage é uma API de armazenamento de dados **assíncrona**, **não criptografada** e **persistente** de chave-valor. Pense nele como o `localStorage` da web, mas para o React Native.

-   **Assíncrona**: Todas as operações (salvar, ler, remover) retornam uma `Promise`. Isso significa que você deve usar `.then()` ou `async/await` para interagir com ele.
-   **Chave-Valor**: Os dados são sempre armazenados como um par de strings: uma chave única e seu valor correspondente.
-   **Persistente**: Os dados salvos com o AsyncStorage permanecem no dispositivo mesmo que o aplicativo seja fechado e reaberto.

> **Importante**: O AsyncStorage foi movido do core do React Native para uma biblioteca da comunidade. A instalação é necessária.

### Instalação

```bash
npx expo install @react-native-async-storage/async-storage
```

## 3. Operações Básicas: Salvar, Ler e Remover

### Salvando Dados (`setItem`)

Como o AsyncStorage só armazena strings, se você quiser salvar um objeto ou um array, primeiro precisa convertê-lo para uma string JSON usando `JSON.stringify()`.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarUsuario = async (usuario) => {
  try {
    const usuarioString = JSON.stringify(usuario);
    await AsyncStorage.setItem('@MeuApp:usuario', usuarioString);
    console.log('Usuário salvo com sucesso!');
  } catch (e) {
    console.error('Erro ao salvar usuário:', e);
  }
};
```

### Lendo Dados (`getItem`)

Ao ler os dados, você receberá uma string. Se você salvou um objeto, precisará convertê-lo de volta usando `JSON.parse()`.

```javascript
const lerUsuario = async () => {
  try {
    const usuarioString = await AsyncStorage.getItem('@MeuApp:usuario');
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      console.log('Usuário lido:', usuario);
      return usuario;
    }
  } catch (e) {
    console.error('Erro ao ler usuário:', e);
  }
  return null;
};
```

### Removendo Dados (`removeItem`)

Para remover um item específico, use `removeItem`.

```javascript
const removerUsuario = async () => {
  try {
    await AsyncStorage.removeItem('@MeuApp:usuario');
    console.log('Usuário removido.');
  } catch (e) {
    console.error('Erro ao remover usuário:', e);
  }
};
```

## 4. Boas Práticas e Limitações

-   **Use prefixos nas chaves**: Usar um prefixo como `@NomeDoSeuApp:` ajuda a evitar colisões de chaves com outras bibliotecas ou aplicativos.
-   **Não armazene dados sensíveis**: O AsyncStorage não é criptografado. Nunca armazene informações sensíveis como senhas, tokens de API de longa duração ou informações de cartão de crédito. Para isso, use soluções mais seguras como o `expo-secure-store`.
-   **Gerencie o tamanho**: Embora o limite de armazenamento seja geralmente grande (vários megabytes), evite armazenar grandes quantidades de dados desnecessários.
-   **Crie um wrapper**: É uma boa prática criar um módulo ou classe "wrapper" que lida com todas as interações com o AsyncStorage. Isso centraliza a lógica de `stringify`/`parse` e o tratamento de erros.

---

### Referências
[1] [React Native AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
