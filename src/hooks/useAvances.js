import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { getAvancesFromData } from '../services/indicadoresService';
import { MESES } from '../utils/formatters';

export function useAvancesChart(indicadorId, valorMeta) {
  const { avances } = useData();
  return useMemo(() => {
    const lista = getAvancesFromData(indicadorId, avances);
    const valores = MESES.map((_, i) => {
      const av = lista.find((a) => a.mes === i + 1);
      return av ? av.valorReal : null;
    });
    return { valores, metas: MESES.map(() => valorMeta), labels: MESES };
  }, [indicadorId, valorMeta, avances]);
}

export function useAvancesData(indicadorId) {
  const { avances } = useData();
  return useMemo(
    () => getAvancesFromData(indicadorId, avances),
    [indicadorId, avances]
  );
}
