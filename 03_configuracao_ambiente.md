_# Aula 03: Configuração do Ambiente de Desenvolvimento_

## 1. Visão Geral do Ambiente

Para começar a desenvolver com React Native, precisamos de algumas ferramentas essenciais. A abordagem que utilizaremos nesta disciplina é baseada no **Expo**, um conjunto de ferramentas e serviços construídos em torno do React Native que simplifica muito o processo de desenvolvimento e publicação de aplicativos.

O Expo nos permite começar a codificar sem a necessidade de configurar o ambiente de desenvolvimento nativo (Xcode para iOS e Android Studio para Android) imediatamente. Usaremos o **Expo Go**, um aplicativo cliente que você pode instalar em seu dispositivo físico (ou em um emulador) para visualizar e testar seu aplicativo em tempo real.

## 2. Instalação do Node.js e NPM/Yarn

O React Native é um ambiente de desenvolvimento JavaScript, portanto, o **Node.js** é um pré-requisito. O Node.js inclui o **npm** (Node Package Manager), que usaremos para gerenciar as dependências do nosso projeto.

1.  **Baixe e instale o Node.js**: Acesse o site oficial [nodejs.org](https://nodejs.org/) e baixe a versão LTS (Long Term Support), que é a mais estável.

2.  **Verifique a instalação**: Abra seu terminal (ou prompt de comando) e execute os seguintes comandos para garantir que o Node.js e o npm foram instalados corretamente:

    ```bash
    node -v
    npm -v
    ```

    Você deverá ver as versões de cada ferramenta.

## 3. Instalação do Expo CLI

O Expo CLI (Command Line Interface) é a ferramenta de linha de comando que usaremos para criar, iniciar e gerenciar nossos projetos React Native com Expo.

Para instalá-lo globalmente em sua máquina, execute o seguinte comando no terminal:

```bash
npm install -g expo-cli
```

Após a instalação, você pode verificar se tudo ocorreu bem com o comando:

```bash
expo --version
```

## 4. Criação do Primeiro Projeto

Com o Expo CLI instalado, criar um novo projeto é muito simples. Navegue até o diretório onde você deseja salvar seus projetos e execute:

```bash
expo init meu-primeiro-app
```

O CLI fará algumas perguntas:

1.  **Choose a template**: Selecione a opção `blank`. Isso nos dará um projeto mínimo, ideal para começar do zero.
2.  **Enter a name for your project**: Você pode manter o nome `meu-primeiro-app` ou alterá-lo.

Após a conclusão, o Expo criará um novo diretório com a estrutura inicial do projeto e instalará todas as dependências necessárias.

## 5. Executando o Projeto

1.  **Navegue até o diretório do projeto**:

    ```bash
    cd meu-primeiro-app
    ```

2.  **Inicie o servidor de desenvolvimento**:

    ```bash
    expo start
    ```

    Este comando iniciará o Metro Bundler, o servidor de desenvolvimento do React Native. Ele abrirá uma nova aba no seu navegador com a interface do Expo Dev Tools, que exibe um **QR Code**.

## 6. Visualizando o App

### Em um Dispositivo Físico (Recomendado)

1.  Baixe o aplicativo **Expo Go** na [App Store (iOS)](https://apps.apple.com/us/app/expo-go/id982107779) ou na [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent).
2.  No Android, use o aplicativo Expo Go para escanear o QR Code exibido no terminal ou no navegador.
3.  No iOS, abra o aplicativo Câmera e aponte para o QR Code.

### Em um Emulador

1.  **Instale o Android Studio (para emulador Android)** ou o **Xcode (para emulador iOS, requer macOS)**.
2.  Configure um dispositivo virtual (AVD) no Android Studio ou um simulador no Xcode.
3.  Com o emulador em execução, na interface do Expo Dev Tools no navegador, clique em "Run on Android device/emulator" ou "Run on iOS simulator".

Se tudo estiver configurado corretamente, você verá a tela inicial do seu primeiro aplicativo React Native!

---

### Referências
[1] [Expo Documentation: Installation](https://docs.expo.dev/get-started/installation/)
[2] [React Native Documentation: Setting up the development environment](https://reactnative.dev/docs/environment-setup)
