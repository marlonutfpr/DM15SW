_# Aula 02: Introdução ao React Native_

## 1. O que é React Native e sua Arquitetura

React Native é um framework de código aberto criado pelo Facebook (atual Meta) que permite o desenvolvimento de aplicações móveis para iOS e Android utilizando JavaScript e a biblioteca React. A principal proposta de valor do React Native é a capacidade de escrever um código-base que funciona em ambas as plataformas, sem sacrificar a experiência do usuário ou a performance.

A "mágica" por trás do React Native reside em sua arquitetura, que utiliza uma "ponte" (bridge) para comunicar o código JavaScript com a API nativa do dispositivo. Quando você escreve um componente em React Native, ele é traduzido em tempo de execução para o componente de interface de usuário (UI) nativo correspondente. Isso significa que um `<Button>` no seu código se torna um `UIButton` no iOS e um `android.widget.Button` no Android.

```mermaid
graph TD
    A[Código JavaScript] -->|Comandos JSON| B(Bridge);
    B --> C{Threads Nativas};
    C --> D[UI Nativa (iOS/Android)];
    D --> C;
```

> **The Bridge**: A ponte é o coração da arquitetura do React Native. Ela é assíncrona e serializa os dados que trafegam entre o mundo JavaScript e o mundo nativo. Embora poderosa, a ponte pode se tornar um gargalo de performance se muitas informações forem passadas por ela em um curto período.

## 2. Diferenças entre React Native e Desenvolvimento Nativo

A principal diferença reside na linguagem e no paradigma de desenvolvimento. Enquanto o desenvolvimento nativo exige o uso de linguagens específicas para cada plataforma (Swift/Kotlin), o React Native permite que desenvolvedores com conhecimento em JavaScript e React criem aplicações móveis.

| Característica | Desenvolvimento Nativo | React Native |
| :--- | :--- | :--- |
| **Linguagem** | Swift/Objective-C (iOS), Kotlin/Java (Android) | JavaScript/TypeScript |
| **Performance** | Máxima possível | Muito próxima da nativa, mas pode haver gargalos | 
| **Código-base** | Separado para cada plataforma | Único para ambas as plataformas (em sua maioria) |
| **Acesso a APIs** | Acesso total e imediato a novas APIs | Acesso depende da abstração ou de módulos nativos |
| **Iteração** | Ciclos de compilação mais lentos | Fast Refresh permite ver alterações quase instantaneamente |

## 3. Vantagens e Desvantagens do React Native

### Vantagens

- **Reutilização de Código**: A maior parte do código pode ser compartilhada entre iOS e Android, economizando tempo e recursos.
- **Fast Refresh**: Permite que você veja as alterações no código refletidas no aplicativo quase em tempo real, agilizando o desenvolvimento.
- **Grande Comunidade**: Uma comunidade vasta e ativa significa uma abundância de bibliotecas, ferramentas e suporte.
- **Equipe de Desenvolvimento Unificada**: Uma equipe de desenvolvedores JavaScript pode criar aplicativos para ambas as plataformas.

### Desvantagens

- **Performance**: Embora excelente, pode não ser adequada para aplicativos com uso intensivo de gráficos ou animações complexas.
- **Dependência de Módulos Nativos**: Para acessar funcionalidades nativas específicas que não são cobertas pelo framework, é necessário criar ou usar módulos nativos.
- **Atualizações**: Manter o aplicativo atualizado com as últimas versões do React Native pode, por vezes, ser um processo complexo.

## 4. Casos de Uso e Empresas que Utilizam React Native

React Native é uma escolha sólida para uma ampla variedade de aplicativos, especialmente aqueles focados em conteúdo, redes sociais, e-commerce e serviços. Muitas empresas de tecnologia de ponta confiam no React Native para seus aplicativos móveis, provando sua viabilidade e robustez em produção.

- **Facebook**: O próprio criador utiliza o React Native em partes de seu aplicativo principal e no aplicativo do Facebook Ads.
- **Instagram**: Utilizou o React Native para implementar várias funcionalidades, como as notificações push.
- **Shopify**: A plataforma de e-commerce utiliza o React Native para seus aplicativos móveis, permitindo que os lojistas gerenciem seus negócios de qualquer lugar.
- **Tesla**: O aplicativo que controla os veículos da Tesla é construído com React Native.
- **Discord**: A popular plataforma de comunicação utiliza React Native para seu aplicativo iOS.

Esses exemplos demonstram que o React Native não é apenas para projetos pequenos, mas também uma tecnologia confiável para aplicações complexas e de grande escala.

---

### Referências
[1] [React Native Documentation](https://reactnative.dev/docs/getting-started)
[2] [React Native Showcase](https://reactnative.dev/showcase)
