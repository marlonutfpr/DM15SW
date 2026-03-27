_# Aula 19: Geolocalização e Mapas_

## 1. Geolocalização com Expo Location

A capacidade de obter a localização do usuário é uma funcionalidade poderosa para muitos aplicativos, permitindo desde a personalização de conteúdo até a navegação ponto a ponto. O Expo simplifica o acesso à localização do dispositivo através da biblioteca `expo-location`.

### Instalação

```bash
npx expo install expo-location
```

## 2. Pedindo Permissões

Antes de poder acessar a localização do usuário, seu aplicativo deve solicitar permissão explicitamente. É uma boa prática solicitar a permissão apenas quando a funcionalidade for ser utilizada, e não na inicialização do aplicativo.

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const PermissaoLocalizacao = () => {
  const [status, setStatus] = useState(null);

  const pedirPermissao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
    if (status !== 'granted') {
      alert('Permissão de localização negada.');
      return;
    }
  };

  return (
    <View>
      <Button title="Pedir Permissão de Localização" onPress={pedirPermissao} />
      {status && <Text>Status da Permissão: {status}</Text>}
    </View>
  );
};
```

## 3. Obtendo a Localização Atual

Uma vez que a permissão foi concedida, você pode usar `getCurrentPositionAsync` para obter as coordenadas atuais do usuário.

```javascript
const [localizacao, setLocalizacao] = useState(null);

const obterLocalizacao = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão negada');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocalizacao(location);
};

// ... no JSX
{localizacao && (
  <Text>
    Latitude: {localizacao.coords.latitude}, Longitude: {localizacao.coords.longitude}
  </Text>
)}
```

## 4. Integração com Mapas (`react-native-maps`)

Exibir a localização em um mapa é o próximo passo lógico. A biblioteca `react-native-maps` é a solução mais popular para isso, oferecendo componentes de mapa para iOS (Apple Maps) e Android (Google Maps).

### Instalação

```bash
npx expo install react-native-maps
```

### Exibindo um Mapa e Marcadores

O componente `<MapView>` é o contêiner principal do mapa. Você pode configurá-lo com uma região inicial e adicionar componentes filhos, como `<Marker>`, para indicar pontos de interesse.

```javascript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapaExemplo = () => {
  const [regiao, setRegiao] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={regiao}
        onRegionChangeComplete={setRegiao} // Atualiza a região quando o usuário move o mapa
      >
        <Marker
          coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
          title={"São Paulo"}
          description={"O coração financeiro do Brasil."}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

export default MapaExemplo;
```

> **Configuração para Google Maps no Android**: Para usar o Google Maps no Android em um aplicativo de produção, você precisará de uma chave de API do Google Maps Platform e configurá-la no seu arquivo `app.json`.

---

### Referências
[1] [Expo Documentation: Location](https://docs.expo.dev/versions/latest/sdk/location/)
[2] [react-native-maps Repository](https://github.com/react-native-maps/react-native-maps)
