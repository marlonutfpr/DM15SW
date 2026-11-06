// services/cep.js
export async function buscarCep(cep) {
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  // fetch só falha em erro de REDE. Um 400 ou 500 chega aqui normalmente, e
  // sem este if o erro passaria despercebido. Experimente "123": o ViaCEP
  // responde 400.
  if (!resposta.ok) {
    throw new Error(`Falha na requisição: ${resposta.status}`);
  }

  const dados = await resposta.json();

  // Além do slide: um CEP com formato válido que não existe (99999999) volta
  // com status 200 e o corpo { "erro": "true" }. resposta.ok é true, e a tela
  // mostraria um endereço em branco. Cada API tem o seu jeito de dizer "não
  // achei"; tratar isso é trabalho do serviço, não da tela.
  if (dados.erro) {
    throw new Error('CEP não encontrado');
  }

  return dados;
}
