
const formatPrice = (valor: number) => {
  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  return formatoMoeda;
};

// Uso:
export default formatPrice;