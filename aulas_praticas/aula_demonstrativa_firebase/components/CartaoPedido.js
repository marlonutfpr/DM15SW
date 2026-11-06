import { View, Text, StyleSheet } from 'react-native';
import { formatarPreco } from '../dados/formato';

// Cores por status. O app grava sempre 'aberto'; os outros chegam quando
// alguém muda o status pelo console, e a escuta traz a mudança na hora.
const STATUS = {
  aberto: { rotulo: 'Aberto', fundo: '#fdf3dc', texto: '#8a5a00' },
  preparando: { rotulo: 'Preparando', fundo: '#e3eefc', texto: '#1f4f8a' },
  pronto: { rotulo: 'Pronto', fundo: '#e3f2e5', texto: '#2e7d32' },
};

// "06/11 14:32". criadoEm é um Timestamp do Firestore: toDate() o converte.
function formatarData(criadoEm) {
  if (!criadoEm) return '';
  const d = criadoEm.toDate();
  const doisDigitos = (n) => String(n).padStart(2, '0');
  return `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)} ${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
}

// Um pedido de "Meus pedidos". Tudo o que ele mostra está DENTRO do
// documento: nenhuma leitura extra ao cardápio.
export default function CartaoPedido({ itens, total, status, criadoEm }) {
  const estilo = STATUS[status] ?? { rotulo: status, fundo: '#f3e2d9', texto: '#a4492c' };

  return (
    <View style={estilos.cartao}>
      <View style={estilos.textos}>
        {itens.map((item) => (
          <Text key={item.produtoId} style={estilos.item}>
            {item.quantidade} x {item.nome}
          </Text>
        ))}
        <Text style={estilos.data}>{formatarData(criadoEm)}</Text>
      </View>

      <View style={estilos.direita}>
        <Text style={[estilos.status, { backgroundColor: estilo.fundo, color: estilo.texto }]}>
          {estilo.rotulo}
        </Text>
        <Text style={estilos.total}>{formatarPreco(total)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f6f3ef',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  item: {
    fontSize: 15,
    fontWeight: '600',
  },
  data: {
    fontSize: 12,
    color: '#6b625c',
  },
  direita: {
    alignItems: 'flex-end',
    gap: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  total: {
    fontSize: 15,
    color: '#a4492c',
    fontWeight: '600',
  },
});
