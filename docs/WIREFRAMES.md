# Wireframes — Plataforma de Metas e Indicadores

Wireframes en ASCII para las 11 pantallas del sistema. Cada pantalla incluye layout, componentes clave y notas de comportamiento.

---

## P-01 — Login / Selección de rol

**Roles con acceso:** Todos  
**Ruta:** `/` (raíz)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                         [LOGO + MARCA]                              │
│                   Plataforma de Metas e Indicadores                 │
│                                                                     │
│              ┌───────────────────────────────────────┐              │
│              │  Seleccionar rol de acceso          ▼ │              │
│              │  ○ Carlos Monterroso — Gerente         │              │
│              │  ○ Ana Salguero — Jefe Producción      │              │
│              │  ○ Roberto Chávez — Jefe Ventas        │              │
│              │  ○ María López — Supervisor Campo      │              │
│              │  ○ Diego Morales — Coordinador         │              │
│              └───────────────────────────────────────┘              │
│                                                                     │
│              ┌───────────────────────────────────────┐              │
│              │            Ingresar →                 │              │
│              └───────────────────────────────────────┘              │
│                                                                     │
│              [Solo demo — sin autenticación real]                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Notas:**
- El selector carga la lista completa de usuarios simulados con nombre y rol.
- Al seleccionar e ingresar, el sistema redirige según el rol: Gerente → P-02, Jefe → P-03, Supervisor → P-04, Coordinador → P-05.
- El rol seleccionado persiste en el estado de la aplicación (localStorage o contexto JS).

---

## P-02 — Dashboard Ejecutivo

**Roles con acceso:** Gerente  
**Ruta:** `/dashboard`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Dashboard Ejecutivo             [Jun 2026 ▼] [Área ▼]  │
│──────────│──────────────────────────────────────────────────────────│
│          │  ┌──────────────┐ ┌────────────┐ ┌──────────┐ ┌───────┐ │
│  🏠 Inicio│  │ Cumplimiento │ │Indicadores │ │Indicad.  │ │Indicad│ │
│          │  │   Global     │ │  en Verde  │ │Amarillo  │ │ Rojo  │ │
│  📊 Panel │  │    78%  ↑   │ │    8 🟢    │ │   3 🟡   │ │  2 🔴 │ │
│          │  └──────────────┘ └────────────┘ └──────────┘ └───────┘ │
│  📋 Mis   │──────────────────────────────────────────────────────────│
│    Ind.  │  ┌───────────────────────────┐  ┌────────────────────── ┐│
│          │  │  Radar BSC               │  │  Tendencia Mensual    ││
│  🎯 Metas │  │                          │  │                       ││
│          │  │     Financiera            │  │  ┌──────────────────┐ ││
│  📈 Report│  │    /──────\              │  │  │  ━━━  Meta       │ ││
│          │  │   / Proc.  \             │  │  │  ···  Real       │ ││
│  🔔 Alertas│  │  | Client. |            │  │  │   /\   /\       │ ││
│     (2)  │  │   \ Apr.  /             │  │  │  /  \_/  \      │ ││
│          │  │    \──────/              │  │  └──────────────────┘ ││
│  ⚙ Config │  └───────────────────────────┘  └────────────────────── ┘│
│          │──────────────────────────────────────────────────────────│
│  ─────── │  TABLA DE INDICADORES              [Perspectiva ▼]      │
│  Carlos  │  ┌────────────┬──────────────────┬──────┬──────┬───────┐ │
│  Monterr │  │ Perspectiva│ Indicador        │ Meta │ Real │Estado │ │
│  Gerente │  │ Financiera │ Costo/ha         │4,500 │4,823 │  🔴   │ │
└──────────┘  │ Financiera │ Ingresos Ventas  │ 2.5M │ 2.1M │  🟡   │ │
             │ Procesos   │ Rendimiento/ha   │  4.0 │  4.3 │  🟢   │ │
             │ Procesos   │ Área cosechada   │  90% │  87% │  🟡   │ │
             │ Clientes   │ Clientes activos │   45 │   48 │  🟢   │ │
             └────────────┴──────────────────┴──────┴──────┴───────┘ │
```

**Componentes Chart.js:**
- Radar Chart: % cumplimiento por perspectiva BSC (5 ejes).
- Line Chart: tendencia de cumplimiento global mes a mes.

**Filtros disponibles:** Período (mes/año), Área, Perspectiva BSC.

**Interacciones:**
- Clic en fila de tabla → navega a P-06 (Detalle de Indicador).
- Clic en segmento del radar → filtra tabla por perspectiva.
- Las KPI cards muestran variación respecto al mes anterior (↑ ↓).

---

## P-03 — Dashboard de Área

**Roles con acceso:** Gerente, Jefe  
**Ruta:** `/area/:areaId`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Producción Agrícola               [Jun 2026 ▼]         │
│          │  Jefe de Área: Ana Salguero                             │
│          │──────────────────────────────────────────────────────────│
│          │  ┌────────────┐ ┌────────────┐ ┌────────────────────── ┐ │
│          │  │ Indicadores│ │Avances     │ │  Cumplimiento del Área│ │
│          │  │  del área  │ │pendientes  │ │         83%           │ │
│          │  │     4      │ │    2       │ │  ████████████░░░░     │ │
│          │  └────────────┘ └────────────┘ └────────────────────── ┘ │
│          │──────────────────────────────────────────────────────────│
│          │  INDICADORES DEL ÁREA                    [Aprobar todo] │
│          │  ┌────────────────────────┬──────┬──────┬───────┬──────┐ │
│          │  │ Indicador              │ Meta │ Real │  %   │Estado│ │
│          │  │ Rendimiento/ha         │  4.0 │  4.3 │107%  │ 🟢   │ │
│          │  │ % Área cosechada       │  90% │  87% │ 97%  │ 🟡   │ │
│          │  │ Pérdidas postcosecha   │  ≤8% │11.2% │ 57%  │ 🔴   │ │
│          │  │ Eficiencia riego       │  85% │  88% │104%  │ 🟢   │ │
│          │  └────────────────────────┴──────┴──────┴───────┴──────┘ │
│          │──────────────────────────────────────────────────────────│
│          │  AVANCES PENDIENTES DE APROBACIÓN                       │
│          │  ┌──────────────────────────────────────────────────── ┐ │
│          │  │  Juan Pérez · Pérdidas postcosecha                  │ │
│          │  │  Valor: 11.2%  Obs: "Lluvia excesiva en mayo"       │ │
│          │  │                          [Rechazar] [✓ Aprobar]     │ │
│          │  └──────────────────────────────────────────────────── ┘ │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## P-04 — Dashboard de Equipo

**Roles con acceso:** Gerente, Jefe, Supervisor  
**Ruta:** `/equipo`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Mi Equipo — Campo Norte           [Jun 2026 ▼]         │
│          │  Supervisor: María López · 2 coordinadores              │
│          │──────────────────────────────────────────────────────────│
│          │  ┌────────────────────────────────────────────────────┐  │
│          │  │  Diego Morales — Coordinador Almacén               │  │
│          │  │  ┌────────────────────┬──────┬──────┬──────┐       │  │
│          │  │  │ Indicador          │ Meta │ Real │Estado│       │  │
│          │  │  │ Pérdidas postcosech│  ≤8% │11.2% │  🔴  │       │  │
│          │  │  └────────────────────┴──────┴──────┴──────┘       │  │
│          │  └────────────────────────────────────────────────────┘  │
│          │  ┌────────────────────────────────────────────────────┐  │
│          │  │  Sofía Ramírez — Coordinador Riego                 │  │
│          │  │  ┌────────────────────┬──────┬──────┬──────┐       │  │
│          │  │  │ Indicador          │ Meta │ Real │Estado│       │  │
│          │  │  │ Eficiencia riego   │  85% │  88% │  🟢  │       │  │
│          │  │  └────────────────────┴──────┴──────┴──────┘       │  │
│          │  └────────────────────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## P-05 — Mis Indicadores

**Roles con acceso:** Todos  
**Ruta:** `/mis-indicadores`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Mis Indicadores · Diego Morales       Junio 2026        │
│          │──────────────────────────────────────────────────────────│
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🟢  Rendimiento por hectárea                        │ │
│          │  │     Procesos Internos · Supervisora: María López    │ │
│          │  │     Meta: 4.0 ton/ha          Real: 4.3 ton/ha      │ │
│          │  │     ████████████████████████░░░░  107.5%            │ │
│          │  │     Sparkline ╌╌╌╌╌/╌╌\╌╌╌╌╌                       │ │
│          │  │     [Ver detalle]                    [✓ Aprobado]   │ │
│          │  └─────────────────────────────────────────────────────┘ │
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🟡  % Área cosechada en tiempo                      │ │
│          │  │     Procesos Internos · Supervisora: María López    │ │
│          │  │     Meta: 90%                 Real: 87%             │ │
│          │  │     ██████████████████████░░░░░░░   96.7%           │ │
│          │  │     [Ver detalle]          [⏳ Pendiente aprobación] │ │
│          │  └─────────────────────────────────────────────────────┘ │
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🔴  Pérdidas postcosecha                            │ │
│          │  │     Procesos Internos · Supervisora: María López    │ │
│          │  │     Meta: ≤8%                 Real: 11.2%           │ │
│          │  │     █████████████░░░░░░░░░░░░░░░   60.7%           │ │
│          │  │     [Ver detalle]                  [✎ Ingresar avance]│
│          │  └─────────────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────────────┘
```

**Comportamiento del botón de acción:**
- Si el avance ya fue aprobado: muestra "✓ Aprobado" (deshabilitado).
- Si el avance está pendiente de aprobación: muestra "⏳ Pendiente".
- Si no hay avance registrado: muestra "✎ Ingresar avance" → abre P-07.

---

## P-06 — Detalle de Indicador (Drill-Down)

**Roles con acceso:** Todos (con permiso de visualización)  
**Ruta:** `/indicador/:id`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  ← Volver al Dashboard                                  │
│          │  Pérdidas postcosecha                                   │
│          │  Perspectiva: Procesos Internos · Área: Producción      │
│          │──────────────────────────────────────────────────────────│
│          │  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│          │  │ Acumulado    │  │ Mejor mes    │  │ Tendencia     │  │
│          │  │ año: 7.1%🟢  │  │ Feb: 5.8%   │  │ ↗ Mejorando  │  │
│          │  │ Meta: ≤8%    │  │              │  │               │  │
│          │  └──────────────┘  └──────────────┘  └───────────────┘  │
│          │──────────────────────────────────────────────────────────│
│          │  Gráfico Meta vs. Real — 2026                           │
│          │  ┌──────────────────────────────────────────────────── ┐ │
│          │  │ 12%│                                                 │ │
│          │  │    │           ████                                  │ │
│          │  │  8%│  ░░░░ ░░░░ ░░░░ ░░░░ ░░░░ ░░░░ ░░░░ ░░░░      │ │
│          │  │    │  ████ ████      ████ ████ ████ ████ ████      │ │
│          │  │  4%│                                                  │ │
│          │  │    └─────────────────────────────────────────────── │ │
│          │  │      Ene  Feb  Mar  Abr  May  Jun  Jul  Ago  Sep   │ │
│          │  │      ░ Meta real  █ Valor real                     │ │
│          │  └──────────────────────────────────────────────────── ┘ │
│          │──────────────────────────────────────────────────────────│
│          │  Historial de avances                                   │
│          │  ┌──────┬──────┬────────┬───────┬─────────────────────┐ │
│          │  │ Mes  │ Meta │  Real  │   %   │ Observación         │ │
│          │  │ Jun  │  8%  │ 11.2%  │ 57% 🔴│ Lluvia excesiva    │ │
│          │  │ May  │  8%  │ 11.2%  │ 57% 🔴│ Problemas almacén  │ │
│          │  │ Abr  │  8%  │  8.9%  │ 89% 🟡│ Temporada seca     │ │
│          │  │ Mar  │  8%  │  7.1%  │100% 🟢│ —                  │ │
│          │  └──────┴──────┴────────┴───────┴─────────────────────┘ │
│          │  Responsable: Diego Morales — Coordinador Almacén       │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## P-07 — Registrar Avance

**Roles con acceso:** Supervisor, Coordinador  
**Ruta:** `/indicador/:id/avance`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  ← Volver  ·  Registrar Avance                          │
│          │  Pérdidas postcosecha · Junio 2026                      │
│          │──────────────────────────────────────────────────────────│
│          │  Meta del período:  ≤ 8%                                │
│          │                                                          │
│          │  Valor real *                                            │
│          │  ┌──────────────────────────┐                            │
│          │  │  11.2                    │  %                         │
│          │  └──────────────────────────┘                            │
│          │                                                          │
│          │  Vista previa del semáforo:                              │
│          │  11.2% vs. meta ≤ 8%  →  Cumplimiento: 57%  🔴          │
│          │  ████████████░░░░░░░░░░░░░░░░░░  57%                    │
│          │                                                          │
│          │  Observación (opcional)                                  │
│          │  ┌────────────────────────────────────────────────────┐  │
│          │  │ Lluvia excesiva en el período provocó humedades    │  │
│          │  │ en el área de almacenamiento.                      │  │
│          │  └────────────────────────────────────────────────────┘  │
│          │                                                          │
│          │  [Cancelar]              [Enviar para aprobación →]     │
└──────────┴──────────────────────────────────────────────────────────┘
```

**Comportamiento:**
- El semáforo se actualiza en tiempo real conforme el usuario escribe el valor.
- Para indicadores inversos (donde menor es mejor), la lógica del cumplimiento se invierte.
- Al enviar, el avance queda en estado "Pendiente de aprobación".

---

## P-08 — Metas y Objetivos

**Roles con acceso:** Gerente, Jefe  
**Ruta:** `/metas`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Metas y Objetivos — Estructura BSC        [+ Nuevo]    │
│          │  [Perspectiva ▼] [Área ▼] [Año: 2026]                  │
│          │──────────────────────────────────────────────────────────│
│          │  ▼ FINANCIERA                                            │
│          │    └─ Maximizar rentabilidad de la operación             │
│          │         ├── Costo por hectárea      ≤ Q4,500/ha [✎][🗑] │
│          │         ├── Ingresos por ventas     ≥ Q2.5M/mes [✎][🗑] │
│          │         └── Rentabilidad neta       ≥ 35%       [✎][🗑] │
│          │                                                          │
│          │  ▼ CLIENTES                                              │
│          │    └─ Fidelizar y ampliar cartera                        │
│          │         ├── Clientes activos         ≥ 45        [✎][🗑] │
│          │         └── Satisfacción del cliente ≥ 85%       [✎][🗑] │
│          │                                                          │
│          │  ▼ PROCESOS INTERNOS                                     │
│          │    └─ Optimizar producción agrícola                      │
│          │         ├── Rendimiento/hectárea      ≥ 4.0 t/ha [✎][🗑] │
│          │         ├── % Área cosechada en tiempo ≥ 90%     [✎][🗑] │
│          │         └── Pérdidas postcosecha       ≤ 8%      [✎][🗑] │
│          │                                                          │
│          │  ▶ APRENDIZAJE Y CRECIMIENTO [colapsado]                │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## P-09 — Alertas

**Roles con acceso:** Todos  
**Ruta:** `/alertas`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Alertas activas                                Junio 2026│
│          │──────────────────────────────────────────────────────────│
│          │  🔴 CRÍTICO (2 indicadores)                              │
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🔴  Pérdidas postcosecha            Producción      │ │
│          │  │     Real: 11.2%  Meta: ≤8%  Cumplimiento: 57%      │ │
│          │  │     Responsable: Diego Morales                      │ │
│          │  │                               [Ver indicador →]    │ │
│          │  └─────────────────────────────────────────────────────┘ │
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🔴  Costo por hectárea              Producción      │ │
│          │  │     Real: Q4,823  Meta: ≤Q4,500  Cumplimiento: 60%  │ │
│          │  │     Responsable: Ana Salguero                       │ │
│          │  │                               [Ver indicador →]    │ │
│          │  └─────────────────────────────────────────────────────┘ │
│          │                                                          │
│          │  🟡 EN RIESGO (3 indicadores)                           │
│          │  ┌─────────────────────────────────────────────────────┐ │
│          │  │ 🟡  Ingresos por ventas              Ventas         │ │
│          │  │     Real: Q2.1M  Meta: ≥Q2.5M  Cumplimiento: 84%   │ │
│          │  │                               [Ver indicador →]    │ │
│          │  └─────────────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## P-10 — Reportes

**Roles con acceso:** Gerente, Jefe  
**Ruta:** `/reportes`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Reportes                                               │
│          │──────────────────────────────────────────────────────────│
│          │  ┌─────────────────────────┐  ┌───────────────────────┐  │
│          │  │  Reporte Ejecutivo BSC  │  │  Reporte por Área     │  │
│          │  │                         │  │                       │  │
│          │  │  Cumplimiento global    │  │  Producción Agrícola  │  │
│          │  │  por perspectiva BSC    │  │  Comercialización     │  │
│          │  │                         │  │                       │  │
│          │  │  Período: [mes ▼] [año] │  │  Período: [mes ▼]    │  │
│          │  │                         │  │                       │  │
│          │  │  [Vista previa]         │  │  [Vista previa]       │  │
│          │  │  [Exportar PDF]         │  │  [Exportar Excel]     │  │
│          │  └─────────────────────────┘  └───────────────────────┘  │
│          │                                                          │
│          │  Vista previa del reporte                               │
│          │  ┌──────────────────────────────────────────────────── ┐ │
│          │  │  REPORTE EJECUTIVO BSC — JUNIO 2026                 │ │
│          │  │  ─────────────────────────────────────────────────  │ │
│          │  │  Perspectiva     │ Meta global │ Cumplimiento        │ │
│          │  │  Financiera      │     100%    │     72% 🟡          │ │
│          │  │  Clientes        │     100%    │     91% 🟢          │ │
│          │  │  Procesos Int.   │     100%    │     83% 🟡          │ │
│          │  │  Aprendizaje     │     100%    │     74% 🟡          │ │
│          │  └──────────────────────────────────────────────────── ┘ │
└──────────┴──────────────────────────────────────────────────────────┘
```

**Nota:** La exportación en la demo es simulada (muestra un toast/mensaje de confirmación).

---

## P-11 — Configuración

**Roles con acceso:** Gerente  
**Ruta:** `/configuracion`

```
┌──────────┬──────────────────────────────────────────────────────────┐
│  MENÚ    │  Configuración                                          │
│          │──────────────────────────────────────────────────────────│
│          │  [Usuarios]  [Áreas]  [Estructura BSC]                  │
│          │──────────────────────────────────────────────────────────│
│          │  USUARIOS DEL SISTEMA                      [+ Nuevo]   │
│          │  ┌──────────────────┬───────────────┬──────┬──────────┐  │
│          │  │ Nombre           │ Área          │ Rol  │ Acciones │  │
│          │  │ Carlos Monterroso│ Dir. General  │ Ger. │ [✎] [🗑] │  │
│          │  │ Ana Salguero     │ Producción    │ Jefe │ [✎] [🗑] │  │
│          │  │ Roberto Chávez   │ Ventas        │ Jefe │ [✎] [🗑] │  │
│          │  │ María López      │ Campo Norte   │ Sup. │ [✎] [🗑] │  │
│          │  │ Diego Morales    │ Almacén       │ Coor.│ [✎] [🗑] │  │
│          │  └──────────────────┴───────────────┴──────┴──────────┘  │
│          │                                                          │
│          │  [Solo demo — cambios no persisten al recargar]         │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## Componentes compartidos

### Barra lateral de navegación

```
┌──────────────────┐
│ [Logo] Metas &   │
│        Indicad.  │
│──────────────────│
│ 🏠  Inicio       │  ← activo: borde izquierdo azul
│ 📊  Mi Panel     │
│ 📋  Mis Indicad. │
│ 🎯  Metas        │  ← solo Gerente y Jefe
│ 📈  Reportes     │  ← solo Gerente y Jefe
│ 🔔  Alertas (2)  │  ← badge con contador de alertas rojas
│ ⚙   Config.      │  ← solo Gerente
│──────────────────│
│ [Avatar]         │
│ Nombre usuario   │
│ Rol              │
│ [Cerrar sesión]  │
└──────────────────┘
```

### Header de pantalla

```
┌──────────────────────────────────────────────────────────────────┐
│  Título de la pantalla          [🔔 2]  [Avatar]  Carlos M. ▼   │
└──────────────────────────────────────────────────────────────────┘
```

### Card de KPI

```
┌──────────────────────┐
│ Indicador            │
│──────────────────────│
│  Q 4,823 / ha    🔴  │
│  Meta: Q 4,500       │
│  ↑ 7.2% vs. mes ant. │
│  ████░░░░░░  60%     │
└──────────────────────┘
```
