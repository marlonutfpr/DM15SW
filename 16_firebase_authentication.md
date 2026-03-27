_# Aula 16: Firebase Authentication_

## 1. O que é o Firebase Authentication?

O Firebase Authentication fornece serviços de backend, SDKs fáceis de usar e bibliotecas de UI prontas para autenticar usuários em seu aplicativo. Ele oferece suporte à autenticação usando senhas, números de telefone, provedores de identidade federados populares como Google, Facebook e Twitter, e muito mais.

## 2. Métodos de Autenticação

O Firebase Authentication suporta vários métodos de autenticação. Os mais comuns para aplicativos móveis são:

-   **Email e Senha**: O método mais tradicional.
-   **Provedores Sociais**: Login com contas do Google, Facebook, Apple, etc.
-   **Anônimo**: Para criar contas temporárias para usuários que ainda não se inscreveram.

### Habilitando Métodos no Console

Antes de usar qualquer método de autenticação, você precisa habilitá-lo no Firebase Console:

1.  Vá para a seção **Authentication**.
2.  Clique na aba **"Sign-in method"**.
3.  Selecione o provedor que deseja usar (por exemplo, "Email/Senha") e habilite-o.

## 3. Criação e Gerenciamento de Usuários

Para interagir com o serviço de autenticação, importamos a instância `auth` que configuramos anteriormente e as funções necessárias.

```javascript
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebaseConfig'; // Importe sua configuração
```

### Criando um Novo Usuário (Email e Senha)

```javascript
const criarUsuario = async (email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    // Usuário criado e logado
    const user = userCredential.user;
    console.log('Usuário criado:', user.uid);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Erro ao criar usuário:', errorCode, errorMessage);
  }
};
```

### Realizando Login

```javascript
const fazerLogin = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    // Usuário logado
    const user = userCredential.user;
    console.log('Usuário logado:', user.uid);
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
  }
};
```

### Realizando Logout

```javascript
const fazerLogout = async () => {
  try {
    await signOut(auth);
    console.log('Usuário deslogado.');
  } catch (error) {
    console.error('Erro ao fazer logout:', error.message);
  }
};
```

## 4. Persistência de Sessão e `onAuthStateChanged`

Por padrão, o Firebase Authentication persiste o estado de autenticação do usuário no dispositivo. Isso significa que, se um usuário fechar e reabrir o aplicativo, ele continuará logado. O `AsyncStorage` é usado por baixo dos panos para isso.

Para "ouvir" as mudanças no estado de autenticação (login, logout), usamos o listener `onAuthStateChanged`. Este é o local central para gerenciar a navegação do seu aplicativo, por exemplo, mostrando telas de login ou a tela principal.

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const GerenciadorDeSessao = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado
        console.log('Usuário logado:', user.uid);
        setUsuario(user);
      } else {
        // Usuário está deslogado
        console.log('Nenhum usuário logado.');
        setUsuario(null);
      }
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {usuario ? <Text>Bem-vindo, {usuario.email}!</Text> : <Text>Por favor, faça login.</Text>}
    </View>
  );
};
```

---

### Referências
[1] [Firebase Documentation: Authentication](https://firebase.google.com/docs/auth)
[2] [Firebase Documentation: Get Started with Firebase Authentication on Websites](https://firebase.google.com/docs/auth/web/start)
