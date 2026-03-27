_# Aula 18: Firebase Storage_

## 1. O que é o Firebase Storage?

O Cloud Storage for Firebase é um serviço projetado para armazenar e gerenciar conteúdo gerado pelo usuário, como fotos, vídeos e outros arquivos. Ele é robusto, seguro e escalável, permitindo que você armazene gigabytes ou até petabytes de dados com facilidade.

### Principais Características

-   **Segurança**: As operações são protegidas por regras de segurança do Firebase, permitindo um controle de acesso granular.
-   **Escalabilidade**: Utiliza a mesma infraestrutura do Google Cloud Storage, garantindo alta disponibilidade e escalabilidade.
-   **Resiliência**: Os uploads e downloads são robustos, reiniciando de onde pararam em caso de falha na conexão de rede.

## 2. Configuração

O Firebase Storage faz parte do SDK do Firebase que já instalamos. No entanto, precisamos obter a referência do serviço no nosso arquivo de configuração.

```javascript
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// ... outras importações

const firebaseConfig = { ... };

const app = initializeApp(firebaseConfig);

// ... outros serviços
export const storage = getStorage(app);
```

### Regras de Segurança

Por padrão, o Firebase Storage bloqueia todo o acesso não autenticado. Para começar, você pode configurar regras mais permissivas para desenvolvimento no Firebase Console, na aba **Storage -> Rules**.

```
// Permite leitura e escrita para qualquer usuário autenticado
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 3. Upload de Arquivos

O processo de upload geralmente envolve:

1.  Obter o arquivo do dispositivo do usuário (usando uma biblioteca como `expo-image-picker`).
2.  Converter o arquivo para um formato que o Firebase entenda (Blob).
3.  Criar uma referência de armazenamento.
4.  Fazer o upload do arquivo.

```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

const uploadImagem = async (uri) => {
  try {
    // 1. Converte a URI do arquivo para um Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // 2. Cria uma referência única para o arquivo
    const nomeArquivo = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `imagens/${nomeArquivo}`);

    // 3. Faz o upload do Blob
    const snapshot = await uploadBytes(storageRef, blob);
    console.log('Imagem enviada com sucesso!');

    // 4. (Opcional) Obtém a URL de download
    const url = await getDownloadURL(snapshot.ref);
    console.log('URL de download:', url);
    return url;

  } catch (error) {
    console.error('Erro no upload:', error);
  }
};
```

## 4. Download e Exibição de Mídia

Uma vez que o arquivo está no Storage, você pode obter uma URL de download pública para exibi-lo em seu aplicativo, por exemplo, em um componente `<Image>`.

A função `getDownloadURL` retorna uma `Promise` com a URL do arquivo. Você pode armazenar essa URL no Firestore, associada a um documento, para facilitar o acesso posterior.

```javascript
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

const ImagemDoStorage = ({ caminhoDaImagem }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getDownloadURL(ref(storage, caminhoDaImagem))
      .then((downloadUrl) => {
        setUrl(downloadUrl);
      })
      .catch((error) => {
        console.error('Erro ao obter URL de download:', error);
      });
  }, [caminhoDaImagem]);

  if (!url) {
    return <ActivityIndicator />;
  }

  return <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />;
};
```

---

### Referências
[1] [Firebase Documentation: Cloud Storage](https://firebase.google.com/docs/storage)
[2] [Firebase Documentation: Upload Files on Web](https://firebase.google.com/docs/storage/web/upload-files)
