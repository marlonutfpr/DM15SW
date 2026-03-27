_# Aula 21: Câmera e Galeria de Imagens_

## 1. Expo ImagePicker

O `expo-image-picker` é uma biblioteca que fornece acesso à câmera e à galeria de fotos do dispositivo. É uma solução simples e eficaz para permitir que os usuários capturem ou selecionem imagens para usar no seu aplicativo.

### Instalação

```bash
npx expo install expo-image-picker
```

## 2. Permissões de Câmera e Galeria

Assim como outras funcionalidades sensíveis, o acesso à câmera e à galeria requer permissão do usuário. O `expo-image-picker` facilita esse processo.

```javascript
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, View } from 'react-native';

const SelecionadorDeImagem = () => {
  const [imagem, setImagem] = useState(null);

  const pedirPermissaoGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar a galeria!');
    }
  };

  const pedirPermissaoCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar a câmera!');
    }
  };

  return (
    <View>
      <Button title="Pedir Permissão da Galeria" onPress={pedirPermissaoGaleria} />
      <Button title="Pedir Permissão da Câmera" onPress={pedirPermissaoCamera} />
    </View>
  );
};
```

## 3. Selecionando uma Imagem da Galeria

A função `launchImageLibraryAsync` abre a galeria de fotos do dispositivo e permite que o usuário selecione uma imagem.

```javascript
const selecionarImagem = async () => {
  // Pede permissão (se ainda não tiver)
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão negada!');
    return;
  }

  // Abre a galeria
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Permite que o usuário edite a imagem (recortar)
    aspect: [4, 3],
    quality: 1, // Qualidade da imagem (0 a 1)
  });

  if (!result.canceled) {
    setImagem(result.assets[0].uri);
  }
};

// ... no JSX
<Button title="Escolher da Galeria" onPress={selecionarImagem} />
{imagem && <Image source={{ uri: imagem }} style={{ width: 200, height: 200 }} />}
```

## 4. Capturando uma Foto com a Câmera

De forma similar, a função `launchCameraAsync` abre a câmera do dispositivo para capturar uma nova foto.

```javascript
const tirarFoto = async () => {
  // Pede permissão (se ainda não tiver)
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão negada!');
    return;
  }

  // Abre a câmera
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImagem(result.assets[0].uri);
  }
};

// ... no JSX
<Button title="Tirar Foto" onPress={tirarFoto} />
```

## 5. Manipulação de Imagens

Após obter a URI da imagem, você pode:

-   **Exibi-la**: Usando o componente `<Image>`.
-   **Fazer upload**: Enviar a imagem para um servidor ou para o Firebase Storage (como visto na Aula 18).
-   **Manipular**: Usar bibliotecas como `expo-image-manipulator` para redimensionar, recortar ou aplicar filtros na imagem antes de usá-la.

### Exemplo: Redimensionando uma Imagem

```bash
npx expo install expo-image-manipulator
```

```javascript
import * as ImageManipulator from 'expo-image-manipulator';

const redimensionarImagem = async (uri) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 300 } }], // Redimensiona para 300px de largura, mantendo a proporção
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Comprime a imagem
  );
  return manipResult.uri;
};
```

---

### Referências
[1] [Expo Documentation: ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
[2] [Expo Documentation: ImageManipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)
