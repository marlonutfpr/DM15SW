// 18.5 vira "R$ 18,50".
export function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
