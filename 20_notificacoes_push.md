_# Aula 20: Notificações Push_

## 1. O que são Notificações Push?

Notificações push são mensagens enviadas de um servidor para o dispositivo de um usuário, mesmo quando o aplicativo não está em primeiro plano. Elas são uma ferramenta poderosa para engajar os usuários, informando-os sobre atualizações importantes, novas mensagens, promoções ou outros eventos relevantes.

Existem dois tipos principais de notificações:

-   **Notificações Locais**: Agendadas e disparadas pelo próprio aplicativo no dispositivo, sem a necessidade de um servidor. Úteis para lembretes, alarmes, etc.
-   **Notificações Remotas (Push)**: Enviadas de um servidor de backend (como o Firebase Cloud Messaging) para dispositivos específicos. São a base para aplicativos de mensagens, redes sociais e notícias.

## 2. Configuração com `expo-notifications`

A biblioteca `expo-notifications` fornece uma API completa para lidar com notificações locais e remotas.

### Instalação

```bash
npx expo install expo-notifications
```

### Pedindo Permissões

Assim como a localização, as notificações exigem permissão do usuário no iOS. No Android, a permissão é concedida por padrão, mas é boa prática verificar.

```javascript
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Falha ao obter o token para notificação push!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
}
```

## 3. Notificações Locais

Você pode agendar uma notificação para ser exibida imediatamente ou em um momento futuro.

```javascript
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📬 Você tem uma nova mensagem!",
      body: 'Aqui está o corpo da notificação.',
      data: { data: 'informação adicional' },
    },
    trigger: { seconds: 5 }, // Exibe a notificação após 5 segundos
  });
}
```

## 4. Notificações Remotas com Firebase Cloud Messaging (FCM)

Para enviar notificações de um servidor, usamos um serviço intermediário como o FCM. O fluxo é o seguinte:

1.  O aplicativo obtém um **Expo Push Token** único para o dispositivo.
2.  Este token é enviado e salvo no seu backend (ex: no Firestore, associado a um usuário).
3.  Quando você quer enviar uma notificação para aquele usuário, seu servidor faz uma requisição para a API do Expo, informando o token e o conteúdo da mensagem.
4.  O servidor do Expo se comunica com o FCM (ou APNs para iOS) para entregar a notificação ao dispositivo.

### Obtendo o Token

A função `registerForPushNotificationsAsync` mostrada acima já obtém o Expo Push Token.

### Enviando a Notificação

O envio não é feito do aplicativo, mas sim do seu servidor. No entanto, o Expo fornece uma [ferramenta online (Push Notification Tool)](https://expo.dev/notifications) para testar o envio de notificações facilmente. Basta colar o token do seu dispositivo e a mensagem que deseja enviar.

### Recebendo e Tratando Notificações

É importante configurar *listeners* para tratar as notificações quando elas são recebidas ou quando o usuário interage com elas.

```javascript
import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

// Configura como as notificações devem ser tratadas quando o app está em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({ 
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Listener para quando uma notificação é recebida (app em primeiro plano)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    // Listener para quando o usuário interage com a notificação
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Interação com notificação:', response);
      // Ex: navegar para uma tela específica
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <View />;
};
```

---

### Referências
[1] [Expo Documentation: Notifications](https://docs.expo.dev/push-notifications/overview/)
[2] [Firebase Documentation: Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
