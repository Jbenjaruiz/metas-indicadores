export function formatValue(valor, unidad) {
  if (valor === null || valor === undefined) return '—';

  switch (unidad) {
    case 'Q/ha':
      return `Q ${Number(valor).toLocaleString('es-GT')}`;
    case 'Q millones':
      return `Q ${Number(valor).toFixed(1)} M`;
    case '%':
      return `${Number(valor).toFixed(1)}%`;
    case 'ton/ha':
      return `${Number(valor).toFixed(1)} ton/ha`;
    case 'N.°':
      return Number(valor).toLocaleString('es-GT');
    case 'h/persona':
      return `${Number(valor).toFixed(1)} h`;
    default:
      return String(valor);
  }
}

export function formatMeta(valor, unidad) {
  const prefix = unidad === 'Q/ha' || unidad === 'Q millones' ? '≤ ' : '≥ ';
  return prefix + formatValue(valor, unidad);
}

export function formatPct(pct) {
  return `${Number(pct).toFixed(1)}%`;
}

export const MESES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

export const MESES_FULL = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
