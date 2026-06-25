import indicadoresData from '../data/indicadores.json';
import metasData from '../data/metas.json';
import avancesData from '../data/avances.json';
import bscData from '../data/bsc.json';
import { calcularSemaforo, calcularCumplimiento } from '../utils/semaforo';

export function getIndicadores() {
  return indicadoresData.indicadores;
}

export function getIndicadoresByIds(ids) {
  if (!ids || ids.length === 0) return indicadoresData.indicadores;
  return indicadoresData.indicadores.filter((ind) => ids.includes(ind.id));
}

export function getIndicadorById(id) {
  return indicadoresData.indicadores.find((ind) => ind.id === id) || null;
}

export function getIndicadoresByPerspectiva(perspectivaId) {
  return indicadoresData.indicadores.filter((ind) => ind.perspectivaId === perspectivaId);
}

export function getMeta(indicadorId) {
  return metasData.metas.find((m) => m.indicadorId === indicadorId) || null;
}

export function getAvances(indicadorId) {
  return avancesData.avances.filter((a) => a.indicadorId === indicadorId);
}

export function getAvanceDelMes(indicadorId, mes, anio = 2026) {
  return avancesData.avances.find(
    (a) => a.indicadorId === indicadorId && a.mes === mes && a.anio === anio
  ) || null;
}

export function getUltimoAvance(indicadorId) {
  const avances = avancesData.avances
    .filter((a) => a.indicadorId === indicadorId)
    .sort((a, b) => b.mes - a.mes);
  return avances[0] || null;
}

export function getPerspectivas() {
  return bscData.perspectivas;
}

export function getObjetivos() {
  return bscData.objetivos;
}

/** Devuelve un indicador enriquecido con su meta, último avance y semáforo. */
export function getIndicadorConEstado(indicadorId) {
  const indicador = getIndicadorById(indicadorId);
  if (!indicador) return null;
  const meta = getMeta(indicadorId);
  const ultimoAvance = getUltimoAvance(indicadorId);
  const semaforo = ultimoAvance && meta
    ? calcularSemaforo(ultimoAvance.valorReal, meta.valorMeta, indicador.tipo)
    : null;
  const cumplimiento = ultimoAvance && meta
    ? calcularCumplimiento(ultimoAvance.valorReal, meta.valorMeta, indicador.tipo)
    : null;
  return { ...indicador, meta, ultimoAvance, semaforo, cumplimiento };
}

/** Resumen ejecutivo: total indicadores, semáforos, avances pendientes. */
export function getResumenEjecutivo() {
  const todos = indicadoresData.indicadores.map((ind) => getIndicadorConEstado(ind.id));
  const verde = todos.filter((i) => i.semaforo === 'verde').length;
  const amarillo = todos.filter((i) => i.semaforo === 'amarillo').length;
  const rojo = todos.filter((i) => i.semaforo === 'rojo').length;
  const pendientes = avancesData.avances.filter((a) => a.estado === 'Pendiente').length;
  return { total: todos.length, verde, amarillo, rojo, pendientes, indicadores: todos };
}

// ── Variantes que aceptan el estado mutable del DataContext ──────────────────

export function getMetaFromData(indicadorId, metas) {
  return metas.find((m) => m.indicadorId === indicadorId) || null;
}

export function getAvancesFromData(indicadorId, avances) {
  return avances.filter((a) => a.indicadorId === indicadorId);
}

export function getUltimoAvanceFromData(indicadorId, avances) {
  return avances
    .filter((a) => a.indicadorId === indicadorId)
    .sort((a, b) => b.mes - a.mes)[0] || null;
}

export function getIndicadorConEstadoFromData(indicadorId, metas, avances) {
  const indicador = getIndicadorById(indicadorId);
  if (!indicador) return null;
  const meta = getMetaFromData(indicadorId, metas);
  const ultimoAvance = getUltimoAvanceFromData(indicadorId, avances);
  const semaforo = ultimoAvance && meta
    ? calcularSemaforo(ultimoAvance.valorReal, meta.valorMeta, indicador.tipo)
    : null;
  const cumplimiento = ultimoAvance && meta
    ? calcularCumplimiento(ultimoAvance.valorReal, meta.valorMeta, indicador.tipo)
    : null;
  return { ...indicador, meta, ultimoAvance, semaforo, cumplimiento };
}

export function getResumenEjecutivoFromData(metas, avances) {
  const todos = indicadoresData.indicadores.map((ind) =>
    getIndicadorConEstadoFromData(ind.id, metas, avances)
  );
  const verde = todos.filter((i) => i.semaforo === 'verde').length;
  const amarillo = todos.filter((i) => i.semaforo === 'amarillo').length;
  const rojo = todos.filter((i) => i.semaforo === 'rojo').length;
  const pendientes = avances.filter((a) => a.estado === 'Pendiente').length;
  return { total: todos.length, verde, amarillo, rojo, pendientes, indicadores: todos };
}
