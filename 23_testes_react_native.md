_# Aula 23: Testes em React Native_

## 1. Por que Testar?

Testes automatizados são uma parte essencial do desenvolvimento de software moderno. Eles garantem que seu código funcione como esperado, facilitam a refatoração e ajudam a prevenir regressões (bugs que reaparecem após serem corrigidos). Em um aplicativo móvel, onde a variedade de dispositivos e sistemas operacionais é grande, os testes são ainda mais importantes.

## 2. Tipos de Testes

Existem três tipos principais de testes, cada um com um propósito diferente:

-   **Testes Unitários**: Testam unidades individuais de código (funções, métodos, componentes) de forma isolada. São rápidos de executar e devem formar a base da sua pirâmide de testes.
-   **Testes de Integração**: Testam como diferentes partes do sistema funcionam juntas. Por exemplo, testar se um componente interage corretamente com uma API.
-   **Testes End-to-End (E2E)**: Testam o aplicativo como um todo, simulando o comportamento de um usuário real. São mais lentos, mas oferecem a maior confiança de que o aplicativo funciona corretamente.

## 3. Jest para Testes Unitários

**Jest** é o framework de testes mais popular no ecossistema JavaScript e vem pré-configurado em projetos React Native criados com o Expo ou React Native CLI.

### Escrevendo um Teste Simples

Vamos testar uma função simples que soma dois números.

```javascript
// soma.js
export function soma(a, b) {
  return a + b;
}
```

```javascript
// soma.test.js
import { soma } from './soma';

test('soma 1 + 2 para ser igual a 3', () => {
  expect(soma(1, 2)).toBe(3);
});
```

Para executar os testes, use o comando:

```bash
npm test
```

### Testando Componentes

Para testar componentes React, usamos a **React Native Testing Library**, que fornece utilitários para renderizar componentes e interagir com eles de uma forma que simula o comportamento do usuário.

```bash
npm install --save-dev @testing-library/react-native
```

```javascript
// Botao.js
import React from 'react';
import { Button } from 'react-native';

const MeuBotao = ({ onPress, title }) => {
  return <Button onPress={onPress} title={title} />;
};

export default MeuBotao;
```

```javascript
// Botao.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MeuBotao from './Botao';

test('chama a função onPress quando o botão é pressionado', () => {
  const mockOnPress = jest.fn(); // Cria uma função mock
  const { getByText } = render(<MeuBotao onPress={mockOnPress} title="Clique aqui" />);

  const botao = getByText('Clique aqui');
  fireEvent.press(botao);

  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
```

## 4. Testes End-to-End com Detox

**Detox** é um framework de testes E2E para aplicativos React Native. Ele executa o aplicativo em um simulador ou emulador e permite que você escreva testes que interagem com o aplicativo como um usuário real faria.

A configuração do Detox é mais complexa e está fora do escopo desta aula introdutória, mas é uma ferramenta valiosa para garantir a qualidade de aplicativos em produção.

## 5. Estratégias de Teste

-   **Pirâmide de Testes**: Tenha muitos testes unitários (rápidos e baratos), um número moderado de testes de integração e poucos testes E2E (lentos e caros).
-   **Teste o Comportamento, Não a Implementação**: Seus testes devem focar no que o usuário vê e faz, não nos detalhes internos de como o código funciona.
-   **Cobertura de Código**: Use ferramentas como o Jest Coverage para medir a porcentagem do seu código que é coberta por testes. Embora 100% de cobertura não seja sempre necessário ou prático, é um bom indicador.

---

### Referências
[1] [Jest Documentation](https://jestjs.io/)
[2] [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
[3] [Detox Documentation](https://wix.github.io/Detox/)
