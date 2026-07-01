/**
 * Calcula el color del semáforo según el cumplimiento.
 * Para indicadores inversos (menor es mejor), tipo = 'menor'.
 */
export function calcularCumplimiento(valorReal, valorMeta, tipo = 'mayor') {
  if (!valorMeta || valorMeta === 0) return 0;
  if (tipo === 'menor') {
    // Verde si real <= meta, peor si real >> meta
    return (valorMeta / valorReal) * 100;
  }
  return (valorReal / valorMeta) * 100;
}

export function calcularSemaforo(valorReal, valorMeta, tipo = 'mayor') {
  const pct = calcularCumplimiento(valorReal, valorMeta, tipo);
  if (pct >= 100) return 'verde';
  if (pct >= 85) return 'amarillo';
  return 'rojo';
}

export const SEMAFORO_COLORS = {
  verde: '#107C10',
  amarillo: '#FFB900',
  rojo: '#D13438',
};

export const SEMAFORO_BG = {
  verde: '#E7F3E7',
  amarillo: '#FFF8E1',
  rojo: '#FDEEEE',
};

export const SEMAFORO_LABEL = {
  verde: 'En línea',
  amarillo: 'Riesgo',
  rojo: 'Desviado',
};
