_# Aula 01: Introdução ao Desenvolvimento Móvel_

## 1. História e Evolução das Aplicações Móveis

A história das aplicações móveis é uma jornada fascinante que acompanha a evolução dos próprios dispositivos. No início, os celulares eram limitados a funções básicas como chamadas e SMS. A introdução de tecnologias como WAP (Wireless Application Protocol) no final dos anos 90 permitiu o acesso a versões simplificadas da internet, mas a experiência era rudimentar.

A verdadeira revolução começou com a chegada dos smartphones. O lançamento do iPhone em 2007 e da App Store em 2008 marcou um ponto de virada, criando um ecossistema centralizado para distribuição e monetização de aplicativos. Pouco tempo depois, o Android, com sua natureza de código aberto, impulsionou uma explosão na diversidade de dispositivos e na criatividade dos desenvolvedores.

| Marco | Ano | Impacto |
| :--- | :-: | :--- |
| **Lançamento do WAP** | 1999 | Primeiro acesso à internet em dispositivos móveis. |
| **Lançamento do iPhone** | 2007 | Redefiniu o conceito de smartphone com foco na experiência do usuário. |
| **Lançamento da App Store** | 2008 | Criou um mercado centralizado para aplicativos móveis. |
| **Lançamento do Android** | 2008 | Fomentou a competição e a inovação no mercado de smartphones. |

## 2. Tipos de Dispositivos Móveis

Atualmente, o desenvolvimento móvel foca principalmente em dois tipos de dispositivos:

- **Smartphones**: Dispositivos pessoais, sempre conectados, com uma vasta gama de sensores (GPS, acelerômetro, etc.) que permitem a criação de experiências ricas e contextuais.
- **Tablets**: Com telas maiores, os tablets oferecem uma experiência de uso diferente, ideal para consumo de mídia, leitura e tarefas que se beneficiam de mais espaço de tela.

Além destes, temos os **wearables** (dispositivos vestíveis), como smartwatches, que representam um nicho crescente com desafios e oportunidades únicas para os desenvolvedores.

## 3. Modelos de Desenvolvimento

Existem três abordagens principais para o desenvolvimento de aplicações móveis. A escolha do modelo ideal depende de fatores como orçamento, tempo de desenvolvimento, requisitos de performance e a equipe disponível.

### Desenvolvimento Nativo

O desenvolvimento nativo consiste em criar um aplicativo específico para cada plataforma (iOS e Android) utilizando as linguagens e ferramentas oficiais de cada uma.

- **iOS**: Linguagens Swift ou Objective-C e o ambiente de desenvolvimento Xcode.
- **Android**: Linguagens Kotlin ou Java e o ambiente de desenvolvimento Android Studio.

> **Vantagens**: Máxima performance, acesso total aos recursos do dispositivo e a melhor experiência de usuário possível, pois segue as diretrizes de design de cada plataforma.
> **Desvantagens**: Custo e tempo de desenvolvimento mais elevados, pois exige a manutenção de dois códigos-base separados.

### Desenvolvimento Híbrido

O desenvolvimento híbrido utiliza tecnologias web (HTML, CSS e JavaScript) para criar um aplicativo que é "empacotado" em um contêiner nativo (WebView), permitindo que ele seja executado em ambas as plataformas.

- **Frameworks populares**: Cordova, Ionic.

> **Vantagens**: Código-base único, desenvolvimento mais rápido e custo reduzido.
> **Desvantagens**: Performance inferior à nativa, acesso limitado a alguns recursos do dispositivo e a experiência do usuário pode não ser ideal.

### Desenvolvimento Multiplataforma

O desenvolvimento multiplataforma, como o React Native, busca unir o melhor dos dois mundos. O código é escrito em uma linguagem (neste caso, JavaScript) e compilado para componentes de interface nativos, resultando em uma performance muito próxima à nativa.

- **Frameworks populares**: React Native, Flutter, Xamarin.

> **Vantagens**: Código-base majoritariamente compartilhado, performance excelente e uma experiência de usuário muito próxima da nativa.
> **Desvantagens**: Pode exigir a escrita de código nativo específico para funcionalidades mais complexas e a abstração pode limitar o acesso a certas APIs.

## 4. Visão Geral do Ecossistema Mobile

O mercado de sistemas operacionais móveis é dominado por duas grandes plataformas:

- **iOS (Apple)**: Conhecido por seu ecossistema fechado e controlado, o que garante um alto padrão de qualidade e segurança. A App Store é a única loja oficial de aplicativos, e a Apple impõe diretrizes rigorosas para publicação.

- **Android (Google)**: Com uma natureza de código aberto, o Android está presente em uma vasta gama de dispositivos de diferentes fabricantes. A Google Play Store é a principal loja de aplicativos, mas os usuários também podem instalar apps de outras fontes.

Ambos os ecossistemas oferecem ferramentas robustas para desenvolvedores, documentação extensa e comunidades ativas, tornando o desenvolvimento móvel uma área vibrante e cheia de oportunidades.

--- 

### Referências
[1] [React Native Documentation](https://reactnative.dev/docs/getting-started)
