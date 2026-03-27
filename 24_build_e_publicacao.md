_# Aula 24: Build e Publicação_

## 1. Preparação do App para Produção

Antes de publicar seu aplicativo, é importante garantir que ele esteja pronto para o mundo real. Isso inclui:

-   **Remover logs de desenvolvimento**: Comentários `console.log()` devem ser removidos ou desabilitados em produção.
-   **Otimizar assets**: Comprimir imagens e outros recursos para reduzir o tamanho do aplicativo.
-   **Configurar ícones e splash screen**: Definir o ícone do aplicativo e a tela de carregamento inicial.
-   **Definir informações do aplicativo**: Nome, versão, descrição, etc., no arquivo `app.json` (Expo) ou nos arquivos nativos correspondentes.
-   **Testar em dispositivos reais**: Sempre teste em dispositivos físicos antes de publicar, pois emuladores nem sempre refletem o comportamento real.

## 2. Build com EAS (Expo Application Services)

O **EAS Build** é um serviço de build hospedado fornecido pelo Expo. Ele permite que você crie builds de produção do seu aplicativo para iOS e Android na nuvem, sem precisar configurar o Xcode ou o Android Studio localmente.

### Instalação do EAS CLI

```bash
npm install -g eas-cli
```

### Login na sua conta Expo

```bash
eas login
```

### Configuração do Projeto

```bash
eas build:configure
```

Este comando criará um arquivo `eas.json` no seu projeto com as configurações de build.

### Criando um Build

Para criar um build de produção para Android:

```bash
eas build --platform android
```

Para iOS:

```bash
eas build --platform ios
```

O EAS Build fará o upload do seu código, executará o processo de build na nuvem e fornecerá um link para baixar o arquivo `.apk` (Android) ou `.ipa` (iOS) quando o build estiver completo.

## 3. Publicação na Google Play Store

### Pré-requisitos

-   Uma conta de desenvolvedor do Google Play (taxa única de $25).
-   Um arquivo `.aab` (Android App Bundle) do seu aplicativo, gerado pelo EAS Build.

### Passos

1.  Acesse o [Google Play Console](https://play.google.com/console/).
2.  Crie um novo aplicativo.
3.  Preencha as informações do aplicativo (nome, descrição, categoria, etc.).
4.  Faça o upload de screenshots e ícones.
5.  Na seção "Produção", crie uma nova versão e faça o upload do arquivo `.aab`.
6.  Preencha as informações de versão e envie para revisão.

A revisão pode levar de algumas horas a alguns dias. Após aprovado, seu aplicativo estará disponível na Google Play Store!

## 4. Publicação na Apple App Store

### Pré-requisitos

-   Uma conta de desenvolvedor da Apple (taxa anual de $99).
-   Um Mac com o Xcode instalado (para algumas etapas de configuração).
-   Um arquivo `.ipa` do seu aplicativo, gerado pelo EAS Build.

### Passos

1.  Acesse o [App Store Connect](https://appstoreconnect.apple.com/).
2.  Crie um novo aplicativo.
3.  Preencha as informações do aplicativo (nome, descrição, categoria, etc.).
4.  Faça o upload de screenshots e ícones.
5.  Use o **Transporter** (aplicativo da Apple) ou o **Xcode** para fazer o upload do arquivo `.ipa`.
6.  Após o upload, selecione o build no App Store Connect e envie para revisão.

A revisão da Apple é geralmente mais rigorosa e pode levar de 1 a 7 dias. Após aprovado, seu aplicativo estará disponível na App Store!

## 5. Atualizações Over-The-Air (OTA) com Expo Updates

Uma das grandes vantagens do Expo é a capacidade de enviar atualizações de código JavaScript e assets diretamente para os usuários, sem precisar passar pelo processo de revisão das lojas. Isso é chamado de **atualização OTA (Over-The-Air)**.

```bash
eas update --branch production --message "Correção de bugs"
```

> **Importante**: Atualizações OTA só funcionam para código JavaScript e assets. Mudanças em código nativo exigem um novo build e uma nova submissão às lojas.

---

### Referências
[1] [Expo Documentation: EAS Build](https://docs.expo.dev/build/introduction/)
[2] [Expo Documentation: Submitting to app stores](https://docs.expo.dev/submit/introduction/)
[3] [Google Play Console](https://play.google.com/console/)
[4] [App Store Connect](https://appstoreconnect.apple.com/)
