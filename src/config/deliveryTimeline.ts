export interface DeliveryEstimate {
  minDays: number | null;
  maxDays: number | null;
}

/**
 * Preencher minDays/maxDays quando o prazo comercial oficial estiver definido.
 * Enquanto nulo, o componente exibe apenas o texto genérico aprovado.
 */
export const deliveryEstimate: DeliveryEstimate = {
  minDays: null,
  maxDays: null,
};
