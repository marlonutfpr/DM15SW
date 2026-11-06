// services/firebase.js
import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// O objeto completo, copiado do console: Configurações do projeto, Seus
// apps, app Web. Não é segredo (slide 6): identifica o projeto, e quem
// protege os dados são as regras de segurança.
const firebaseConfig = {
  apiKey: 'AIzaSyCX1DjZ2u2zXzU8Uy5kKItoVVvCJb_COJ4',
  authDomain: 'pd26s-928fa.firebaseapp.com',
  databaseURL: 'https://pd26s-928fa-default-rtdb.firebaseio.com',
  projectId: 'pd26s-928fa',
  storageBucket: 'pd26s-928fa.firebasestorage.app',
  messagingSenderId: '940925124785',
  appId: '1:940925124785:web:32a63769449c1418e8e290',
};

// Um único ponto de inicialização, importado pelos serviços. `app` também é
// exportado: o Firebase AI Logic da Aula 21 usa o mesmo.
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// A sessão fica salva no aparelho e sobrevive ao fechamento do app.
//
// Além do slide 18: getReactNativePersistence só existe no build React
// Native do SDK. No navegador ela não é exportada, e o getAuth já guarda a
// sessão sozinho, no IndexedDB. Sem este desvio, `npx expo start --web`
// quebra.
export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
