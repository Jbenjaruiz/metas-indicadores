# Tareas pendientes — Plataforma de Metas e Indicadores

Estado actual: **PRD completo. Sin código generado.**

---

## Fase 1 — Validación del PRD

Revisar y confirmar el PRD antes de escribir una sola línea de código.

- [ ] Revisar indicadores del catálogo BSC (`docs/PRD.md` §8) — agregar, quitar o ajustar metas.
- [ ] Confirmar los usuarios simulados (nombres, roles, áreas).
- [ ] Revisar los datos simulados de 12 meses — ajustar valores si algún escenario no representa bien la realidad.
- [ ] Validar la lógica del semáforo (umbrales verde/amarillo/rojo).
- [ ] Confirmar las pantallas del inventario — ¿falta alguna? ¿sobra alguna?
- [ ] Revisar wireframes en `docs/WIREFRAMES.md` — confirmar layout antes de diseñar.

---

## Fase 2 — Estructura del proyecto

Configurar la base técnica antes de implementar pantallas.

- [ ] Decidir si la app es **SPA vanilla** (HTML + JS + Chart.js, sin framework) o usa un framework ligero (Vue 3, React).
- [ ] Crear `index.html` con estructura base, estilos globales y router hash.
- [ ] Crear `data/` con los archivos JSON de datos simulados:
  - `data/usuarios.json`
  - `data/perspectivas.json`
  - `data/indicadores.json`
  - `data/metas.json`
  - `data/avances.json`
- [ ] Crear `js/state.js` — estado global de la app (usuario activo, filtros activos, período).
- [ ] Crear `js/router.js` — enrutador hash para navegar entre pantallas.
- [ ] Crear `js/semaforo.js` — función de cálculo de cumplimiento y color de semáforo.
- [ ] Definir paleta de colores, tipografía y estilos globales en `css/main.css`.

---

## Fase 3 — Implementación de pantallas

Orden sugerido: de lo más simple a lo más complejo.

- [ ] **P-01 Login** — selector de usuarios + botón ingresar + redirección por rol.
- [ ] **Menú lateral** — componente compartido, links dinámicos por rol, badge de alertas.
- [ ] **P-05 Mis Indicadores** — lista de indicadores con semáforo, barra de progreso y botón de acción contextual.
- [ ] **P-07 Registrar Avance** — formulario con vista previa del semáforo en tiempo real.
- [ ] **P-06 Detalle de Indicador** — gráfico Chart.js Meta vs. Real (barras) + tabla de historial.
- [ ] **P-09 Alertas** — lista de indicadores en 🔴 y 🟡, ordenados por severidad.
- [ ] **P-02 Dashboard Ejecutivo** — KPI cards + Radar BSC + Line Chart tendencia + tabla con filtros.
- [ ] **P-03 Dashboard de Área** — resumen del área + tabla de indicadores + panel de aprobación.
- [ ] **P-04 Dashboard de Equipo** — cards por coordinador con sus indicadores.
- [ ] **P-08 Metas y Objetivos** — árbol BSC con perspectivas, objetivos e indicadores.
- [ ] **P-10 Reportes** — selector de tipo de reporte + vista previa + exportación simulada.
- [ ] **P-11 Configuración** — tabla de usuarios simulada (sin persistencia real).

---

## Fase 4 — Interactividad y pulido

- [ ] Filtros dinámicos en P-02: perspectiva BSC, área, período (mes/año).
- [ ] Drill-down: clic en indicador de cualquier tabla → navega a P-06.
- [ ] Flujo de aprobación: botones Aprobar / Rechazar en P-03, actualiza estado en memoria.
- [ ] Badge dinámico de alertas en el menú (conteo de indicadores en 🔴).
- [ ] Animaciones de entrada de KPI cards (contador animado al cargar).
- [ ] Tooltips en gráficos Chart.js con valor exacto + % cumplimiento.
- [ ] Responsive: verificar en móvil (tablet y smartphone).
- [ ] Toast / notificaciones al registrar avance, aprobar, rechazar.

---

## Fase 5 — QA y demo

- [ ] Probar todos los flujos principales descritos en `docs/NAVIGATION.md`.
- [ ] Verificar que cada rol solo ve las opciones de menú que le corresponden.
- [ ] Verificar lógica del semáforo para indicadores inversos (ej. pérdidas postcosecha).
- [ ] Verificar que el radar BSC muestra correctamente los 4 ejes.
- [ ] Verificar responsividad en viewport móvil.
- [ ] Preparar guión de demo: flujo Gerente → Jefe → Coordinador → Supervisor.

---

## Deuda técnica / mejoras futuras (fuera del alcance de la demo)

> Estas tareas están documentadas para referencia pero **no se implementan en el prototipo**.

- Backend real (Node.js / Python) con base de datos PostgreSQL.
- Autenticación con JWT o SSO corporativo.
- Notificaciones por correo al abrir período o al rechazar avance.
- API REST para integración con sistemas ERP agrícolas.
- Módulo de planificación anual (definición de metas para el año siguiente).
- Exportación real a PDF/Excel con `jsPDF` o `SheetJS`.
- Modo oscuro / claro configurable por usuario.

---

## Decisiones pendientes antes de codificar

| Decisión | Opciones | Impacto |
|---|---|---|
| Framework JS | Vanilla · Vue 3 · React | Arquitectura de componentes |
| Routing | Hash router (`#/`) · History API | Configuración de servidor |
| Persistencia en demo | Solo memoria (sin localStorage) · localStorage | ¿Los avances sobreviven al reload? |
| Gráficos adicionales | Solo Chart.js · + D3 para radar personalizado | Complejidad de implementación |
| Estilos | CSS puro · Tailwind CDN · CSS modules | Velocidad de desarrollo |
