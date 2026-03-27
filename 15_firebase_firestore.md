_# Aula 15: Firebase Firestore_

## 1. Estrutura de Coleções e Documentos

Como introduzido na aula anterior, o Cloud Firestore é um banco de dados NoSQL que armazena dados em **documentos**, que por sua vez são organizados em **coleções**. 

- **Coleções**: Contêm apenas documentos. Você não pode armazenar dados diretamente em uma coleção.
- **Documentos**: Contêm os dados como pares de chave-valor. Os valores podem ser de vários tipos, incluindo strings, números, booleanos, arrays, objetos (chamados de `maps`) e até mesmo outras coleções (subcoleções).

Exemplo de estrutura para uma coleção de `usuarios`:

```
usuarios (coleção)
  └── doc_id_1 (documento)
      ├── nome: "Ana Silva"
      ├── email: "ana@example.com"
      └── idade: 28
  └── doc_id_2 (documento)
      ├── nome: "Carlos Souza"
      ├── email: "carlos@example.com"
      └── idade: 35
```

## 2. Operações CRUD (Create, Read, Update, Delete)

Para interagir com o Firestore, importamos as funções necessárias do SDK do Firebase e a instância `db` que configuramos anteriormente.

```javascript
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from './firebaseConfig'; // Importe sua configuração
```

### Create: Adicionando um Documento (`addDoc`)

A função `addDoc` adiciona um novo documento a uma coleção com um ID gerado automaticamente.

```javascript
const adicionarUsuario = async () => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      nome: "Beatriz Costa",
      email: "bia@example.com",
      idade: 22
    });
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
};
```

### Read: Lendo Documentos (`getDocs`)

A função `getDocs` busca todos os documentos de uma coleção.

```javascript
const lerUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  querySnapshot.forEach((doc) => {
    // doc.id é o ID do documento
    // doc.data() é o objeto com os dados
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
};
```

### Update: Atualizando um Documento (`updateDoc`)

Para atualizar um documento, você precisa da referência a ele, que é obtida com a função `doc()`.

```javascript
const atualizarUsuario = async (id) => {
  const usuarioRef = doc(db, "usuarios", id);

  // Atualiza apenas os campos especificados
  await updateDoc(usuarioRef, {
    idade: 23
  });
  console.log("Usuário atualizado!");
};
```

### Delete: Deletando um Documento (`deleteDoc`)

Similar à atualização, a deleção também requer a referência do documento.

```javascript
const deletarUsuario = async (id) => {
  await deleteDoc(doc(db, "usuarios", id));
  console.log("Usuário deletado!");
};
```

## 3. Consultas e Filtros

O Firestore permite realizar consultas complexas para filtrar e ordenar os dados. Para isso, usamos a função `query` e cláusulas como `where` e `orderBy`.

```javascript
import { query, where, orderBy } from "firebase/firestore";

const consultarUsuarios = async () => {
  // Cria uma consulta para usuários com mais de 30 anos, ordenados por nome
  const q = query(
    collection(db, "usuarios"), 
    where("idade", ">", 30), 
    orderBy("nome")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};
```

## 4. Listeners em Tempo Real

Uma das funcionalidades mais poderosas do Firestore é a capacidade de "ouvir" as alterações nos dados em tempo real. Em vez de buscar os dados uma vez, você pode configurar um *listener* que será notificado sempre que os dados mudarem.

```javascript
import { onSnapshot } from "firebase/firestore";

const ouvirUsuarios = () => {
  const q = query(collection(db, "usuarios"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usuarios = [];
    querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
    });
    console.log("Usuários atuais: ", usuarios);
    // Aqui você atualizaria o estado do seu componente React com os novos dados
  });

  // Para parar de ouvir, chame a função unsubscribe()
  return unsubscribe;
};
```

---

### Referências
[1] [Firebase Documentation: Cloud Firestore](https://firebase.google.com/docs/firestore)
[2] [Firebase Documentation: Add and manage data](https://firebase.google.com/docs/firestore/manage-data/add-data)
