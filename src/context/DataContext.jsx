import { createContext, useContext, useState } from 'react';
import metasData from '../data/metas.json';
import avancesData from '../data/avances.json';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [metas, setMetas] = useState(metasData.metas);
  const [avances, setAvances] = useState(avancesData.avances);

  function actualizarMeta(indicadorId, valorMeta) {
    setMetas((prev) =>
      prev.map((m) =>
        m.indicadorId === indicadorId ? { ...m, valorMeta: Number(valorMeta) } : m
      )
    );
  }

  function actualizarAvance(indicadorId, mes, anio, valorReal, observacion) {
    setAvances((prev) => {
      const idx = prev.findIndex(
        (a) => a.indicadorId === indicadorId && a.mes === mes && a.anio === anio
      );
      const registro = {
        indicadorId,
        mes,
        anio,
        valorReal: Number(valorReal),
        observacion: observacion || '',
        estado: 'Pendiente',
      };
      if (idx >= 0) {
        return prev.map((a, i) => (i === idx ? { ...a, ...registro } : a));
      }
      return [...prev, registro];
    });
  }

  return (
    <DataContext.Provider value={{ metas, avances, actualizarMeta, actualizarAvance }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData debe usarse dentro de DataProvider');
  return ctx;
}
