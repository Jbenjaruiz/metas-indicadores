import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  getIndicadores,
  getIndicadoresByIds,
  getIndicadorConEstadoFromData,
  getResumenEjecutivoFromData,
} from '../services/indicadoresService';

export function useIndicadores() {
  const { usuario } = useAuth();
  const { metas, avances } = useData();

  return useMemo(() => {
    if (!usuario) return [];
    const ids =
      usuario.rol === 'Gerente'
        ? getIndicadores().map((ind) => ind.id)
        : usuario.indicadores;
    return getIndicadoresByIds(ids).map((ind) =>
      getIndicadorConEstadoFromData(ind.id, metas, avances)
    );
  }, [usuario, metas, avances]);
}

export function useResumenEjecutivo() {
  const { metas, avances } = useData();
  return useMemo(() => getResumenEjecutivoFromData(metas, avances), [metas, avances]);
}

export function useIndicadorConEstado(id) {
  const { metas, avances } = useData();
  return useMemo(
    () => getIndicadorConEstadoFromData(id, metas, avances),
    [id, metas, avances]
  );
}
