import { useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { buscarCep } from '../../services/cep';
import CampoTexto from '../../components/CampoTexto';
import Botao from '../../components/Botao';
import Filtro from '../../components/Filtro';
import Painel from '../../components/Painel';

// Rota "/entrega". O código dos slides 9 e 10, em tela: os três estados de
// uma requisição, mais o vazio.
//
// A tela não conhece a URL do ViaCEP. Ela chama buscarCep e pronto.

// Atalhos para a demonstração: um CEP que existe, um com formato inválido
// (o ViaCEP responde 400) e um com formato válido que não existe (responde
// 200, com { "erro": "true" } no corpo).
const EXEMPLOS = [
  { cep: '85660-000', rotulo: '85660-000' },
  { cep: '123', rotulo: '123 (inválido)' },
  { cep: '99999-999', rotulo: '99999-999 (não existe)' },
];

export default function Entrega() {
  const [cep, setCep] = useState('');

  // Os três estados de uma requisição.
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const consultar = async () => {
    setCarregando(true);
    setErro(null);
    try {
      // "85660-000" e "85660000" valem o mesmo: fica só o que é dígito.
      setDados(await buscarCep(cep.replace(/\D/g, '')));
    } catch (e) {
      setErro('Não foi possível consultar o CEP.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled" // o toque no botão não só fecha o teclado
    >
      <Text style={estilos.texto}>
        A cafeteria entrega no câmpus e arredores. Consulte o endereço pelo CEP.
      </Text>

      <CampoTexto
        rotulo="CEP"
        valor={cep}
        aoMudar={setCep}
        placeholder="00000-000"
        keyboardType="number-pad"
        maxLength={9}
      />

      <View style={estilos.exemplos}>
        {EXEMPLOS.map((exemplo) => (
          <Filtro
            key={exemplo.cep}
            titulo={exemplo.rotulo}
            ativo={cep === exemplo.cep}
            aoTocar={() => setCep(exemplo.cep)}
          />
        ))}
      </View>

      {/* Desabilitado durante a busca: dois toques não viram duas
          requisições. */}
      <Botao
        titulo="Consultar"
        icone="search"
        aoTocar={consultar}
        desabilitado={carregando || cep.trim() === ''}
      />

      <Painel titulo="Resultado">
        <Resultado carregando={carregando} erro={erro} dados={dados} />
      </Painel>
    </ScrollView>
  );
}

// Exibindo cada estado (slide 10). Um `if` por estado, na ordem: carregando,
// erro, vazio e, por último, os dados.
function Resultado({ carregando, erro, dados }) {
  if (carregando) return <ActivityIndicator color="#a4492c" />;
  if (erro) return <Text style={estilos.erro}>{erro}</Text>;

  // O VAZIO não é erro: é a tela antes da primeira busca.
  if (!dados) return <Text style={estilos.vazio}>Digite um CEP para consultar.</Text>;

  // Cidades de CEP único, como Dois Vizinhos, voltam com logradouro e bairro
  // em branco. O filter tira as partes vazias para não sobrar ", , ".
  const endereco = [dados.logradouro, dados.bairro, `${dados.localidade} - ${dados.uf}`]
    .filter(Boolean)
    .join(', ');

  return (
    <View style={estilos.endereco}>
      <Text style={estilos.linha}>{endereco}</Text>
      <Text style={estilos.cep}>CEP {dados.cep}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    padding: 16,
    gap: 14,
  },
  texto: {
    fontSize: 15,
  },
  exemplos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  erro: {
    fontSize: 15,
    color: '#b3261e',
    fontWeight: '600',
  },
  vazio: {
    fontSize: 15,
    color: '#6b625c',
  },
  endereco: {
    gap: 4,
  },
  linha: {
    fontSize: 16,
    fontWeight: '600',
  },
  cep: {
    fontSize: 13,
    color: '#6b625c',
  },
});
