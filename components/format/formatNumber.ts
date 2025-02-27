class FormatNumber {
  static formatNumber(value: string, mask: string): string {
    let maskedValue = "";
    let valueIndex = 0;
    let maskIndex = 0;
    while (maskIndex < mask.length) {
      if (mask[maskIndex] === "9") {
        if (valueIndex < value.length) {
          maskedValue += value[valueIndex++];
        } else {
          break;
        }
      } else {
        maskedValue += mask[maskIndex];
      }
      maskIndex++;
    }
    return maskedValue;
  }

  static formatPhone(value: string): string {
    return this.formatNumber(value, "(99) 9999-9999");
  }

  static formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    const formattedValue = Number(numericValue) / 100;

    return formattedValue > 0
      ? formattedValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  };

  static formatPhone1 = (value: string) => {
    return (
      value
        .replace(/\D/g, "") // Remove tudo que não for número
        // .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses no DDD
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o hífen
        .slice(0, 15)
    ); // Limita o tamanho
  };
}

export default FormatNumber;
