// hooks/useUsuario.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export function useUsuario() {
  // undefined: ainda verificando; null: sem sessão
  const [usuario, setUsuario] = useState(undefined);

  // onAuthStateChanged devolve a função que encerra a escuta, como o
  // onSnapshot. Devolvê-la no useEffect é a limpeza.
  useEffect(() => onAuthStateChanged(auth, setUsuario), []);

  return usuario;
}
