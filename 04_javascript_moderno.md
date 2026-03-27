_# Aula 04: Fundamentos de JavaScript Moderno (ES6+)_ 

## 1. Introdução ao ES6+

ES6 (ECMAScript 2015) foi uma das atualizações mais significativas para o JavaScript, introduzindo uma série de novas funcionalidades que tornam o código mais limpo, conciso e poderoso. Para o desenvolvimento com React e React Native, o domínio dessas funcionalidades é essencial. 

## 2. `let` e `const`

Antes do ES6, a única forma de declarar variáveis era com `var`. O ES6 introduziu `let` e `const`, que possuem escopo de bloco e ajudam a evitar bugs comuns.

- **`const`**: Para declarar constantes, ou seja, variáveis cujo valor não será reatribuído. É a forma preferencial de declaração.
- **`let`**: Para declarar variáveis que podem ter seu valor reatribuído.

```javascript
const nome = "React Native";
// nome = "Flutter"; // Isso geraria um erro: Assignment to constant variable.

let contador = 0;
contador = 1; // Válido
```

## 3. Arrow Functions

Arrow functions oferecem uma sintaxe mais curta para escrever funções e se comportam de maneira diferente em relação ao `this`.

```javascript
// Função tradicional
function soma(a, b) {
  return a + b;
}

// Arrow function
const soma = (a, b) => a + b;

// Arrow function com corpo
const saudacao = (nome) => {
  const mensagem = `Olá, ${nome}!`;
  return mensagem;
};
```

## 4. Destructuring (Desestruturação)

A desestruturação permite extrair valores de arrays ou propriedades de objetos em variáveis distintas.

```javascript
// Em objetos
const aluno = { nome: "João", idade: 20 };
const { nome, idade } = aluno;
console.log(nome); // "João"
console.log(idade); // 20

// Em arrays
const coordenadas = [10, 20];
const [x, y] = coordenadas;
console.log(x); // 10
console.log(y); // 20
```

## 5. Spread Operator (`...`)

O spread operator permite que um iterável (como um array ou objeto) seja expandido.

```javascript
// Em arrays
const parte1 = [1, 2, 3];
const parte2 = [4, 5, 6];
const completo = [...parte1, ...parte2]; // [1, 2, 3, 4, 5, 6]

// Em objetos
const configBase = { cor: "azul", tamanho: "médio" };
const configAvancada = { ...configBase, peso: "leve" };
// { cor: "azul", tamanho: "médio", peso: "leve" }
```

## 6. Promises e `async/await`

Promises são objetos que representam a eventual conclusão (ou falha) de uma operação assíncrona. `async/await` é uma sintaxe que nos permite trabalhar com Promises de uma forma que parece síncrona.

```javascript
// Exemplo com Fetch API

// Usando .then()
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));

// Usando async/await
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

---

### Referências
[1] [MDN Web Docs: JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
