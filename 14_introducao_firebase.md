_# Aula 14: Introdução ao Firebase_

## 1. O que é o Firebase?

O Firebase é uma plataforma de desenvolvimento de aplicativos móveis e da web do Google. Ele oferece um conjunto abrangente de ferramentas e serviços que ajudam os desenvolvedores a construir aplicativos de alta qualidade, escalar sua base de usuários e ganhar dinheiro. É um exemplo de **Backend-as-a-Service (BaaS)**, o que significa que ele fornece toda a infraestrutura de backend, permitindo que você se concentre no desenvolvimento do frontend e na experiência do usuário.

### Principais Serviços

| Categoria | Serviço | Descrição |
| :--- | :--- | :--- |
| **Build** | Authentication | Autenticação de usuários (email, redes sociais, etc.). |
| | Firestore Database | Banco de dados NoSQL, flexível e escalável. |
| | Realtime Database | Banco de dados NoSQL original, sincronizado em tempo real. |
| | Storage | Armazenamento de arquivos gerados pelo usuário (imagens, vídeos). |
| | Hosting | Hospedagem de sites estáticos e dinâmicos. |
| | Functions | Execução de código de backend sem gerenciar servidores (serverless). |
| **Release & Monitor** | Crashlytics | Relatórios de falhas em tempo real. |
| | Performance Monitoring | Insights sobre a performance do seu aplicativo. |
| **Engage** | Cloud Messaging (FCM) | Envio de notificações push. |

## 2. Criação de um Projeto no Firebase Console

Antes de integrar o Firebase ao seu aplicativo, você precisa criar um projeto no Firebase Console.

1.  Acesse o [Firebase Console](https://console.firebase.google.com/).
2.  Clique em **"Adicionar projeto"**.
3.  Dê um nome ao seu projeto (ex: `minha-disciplina-rn`).
4.  (Opcional) Você pode optar por adicionar o Google Analytics ao seu projeto. Para fins de aprendizado, podemos desabilitar esta opção por enquanto.
5.  Clique em **"Criar projeto"** e aguarde a conclusão.

## 3. Configuração do Firebase JS SDK no React Native

Conforme pesquisado, existem duas maneiras de usar o Firebase no React Native: o SDK da Web (JavaScript) e o React Native Firebase (que usa os SDKs nativos). Para começar e para manter a compatibilidade com o Expo Go, usaremos o **Firebase JS SDK**.

### Registrando seu App (Web)

Dentro do seu projeto no Firebase Console, você precisa registrar um aplicativo. Como estamos usando o SDK de JavaScript, vamos registrar um aplicativo da **Web**.

1.  Na página principal do seu projeto, clique no ícone da web (`</>`).
2.  Dê um apelido para o seu aplicativo (ex: `meu-app-react-native`).
3.  Clique em **"Registrar aplicativo"**.
4.  O Firebase exibirá um objeto de configuração `firebaseConfig`. **Copie este objeto**, pois precisaremos dele no nosso código.

### Instalação e Inicialização

1.  **Instale a biblioteca do Firebase** no seu projeto React Native:

    ```bash
    npx expo install firebase
    ```

2.  **Crie um arquivo de configuração**: É uma boa prática criar um arquivo separado para a configuração do Firebase. Crie um arquivo `firebaseConfig.js` na raiz do seu projeto.

3.  **Cole a configuração e inicialize o app**:

    ```javascript
    // firebaseConfig.js

    import { initializeApp } from 'firebase/app';
    // Opcionalmente, importe os serviços que você usará
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';

    // Seu objeto de configuração da web do Firebase
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_PROJETO.firebaseapp.com",
      projectId: "SEU_PROJETO_ID",
      storageBucket: "SEU_PROJETO.appspot.com",
      messagingSenderId: "SEU_SENDER_ID",
      appId: "SEU_APP_ID"
    };

    // Inicialize o Firebase
    const app = initializeApp(firebaseConfig);

    // Exporte os serviços que você deseja usar em outras partes do seu app
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

    > **Segurança**: Nunca exponha suas chaves de API em um repositório público. Use variáveis de ambiente para armazenar essas informações de forma segura. O Expo tem um guia sobre como gerenciar [variáveis de ambiente](https://docs.expo.dev/guides/environment-variables/).

## 4. Estrutura de Dados NoSQL

Os bancos de dados do Firebase (Firestore e Realtime Database) são **NoSQL**. Diferente dos bancos de dados SQL (como MySQL ou PostgreSQL) que usam tabelas, linhas e colunas, os bancos de dados NoSQL usam outras estruturas. O Firestore, que focaremos, usa uma estrutura de **coleções e documentos**.

-   **Coleção**: Um conjunto de documentos. Pense nela como uma pasta.
-   **Documento**: Uma unidade de armazenamento que contém um conjunto de pares chave-valor. Pense nele como um arquivo JSON dentro da pasta.

Essa estrutura é flexível e permite aninhar coleções dentro de documentos, criando hierarquias complexas de dados.

---

### Referências
[1] [Firebase Documentation](https://firebase.google.com/docs)
[2] [Expo Documentation: Using Firebase](https://docs.expo.dev/guides/using-firebase/)
