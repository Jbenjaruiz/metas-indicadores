# PRD — Plataforma de Metas e Indicadores

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Estado:** Borrador validado

---

## Contexto general

| Campo | Valor |
|---|---|
| Industria | Agropecuaria (Guatemala) |
| Marco estratégico | Balanced Scorecard (BSC) |
| Periodicidad de revisión | Mensual |
| Áreas cubiertas | Producción Agrícola · Comercialización y Ventas |
| Alcance | Demo interactiva — sin backend, sin autenticación real, datos simulados |
| Stack de visualización | Chart.js |
| Diseño | Moderno, corporativo, responsive, inspirado en Power BI |

---

## 1. Objetivos de negocio

| ID | Objetivo | Descripción |
|---|---|---|
| OB-01 | Visibilidad estratégica | Vista consolidada del cumplimiento de metas en tiempo real para todos los niveles |
| OB-02 | Alerta temprana | Detectar desviaciones antes de que se vuelvan críticas mediante semáforos |
| OB-03 | Alineación organizacional | Conectar objetivos estratégicos con metas operativas de cada área y persona |
| OB-04 | Toma de decisiones | Facilitar decisiones con drill-down desde indicadores globales hasta detalle de área |
| OB-05 | Seguimiento mensual | Registrar y comparar avances mensuales vs. metas anuales con trazabilidad histórica |
| OB-06 | Centralización | Eliminar dependencia de reportes en Excel, unificar datos en una sola plataforma |

### Métricas de éxito del producto

| Métrica | Meta |
|---|---|
| % usuarios que acceden ≥ 1 vez/semana | ≥ 80% |
| % indicadores estratégicos ingresados | 100% |
| % avances ingresados antes del día 5 del mes | ≥ 90% |
| Reducción de tiempo en reuniones de reporte | − 40% |

---

## 2. Roles y permisos

### Descripción de roles

| Rol | Nivel | Descripción |
|---|---|---|
| **Gerente** | 1 | Visión total de la organización. Aprueba objetivos estratégicos y configura el sistema. |
| **Jefe** | 2 | Gestiona su área. Define metas de equipo, revisa y aprueba avances. |
| **Supervisor** | 3 | Supervisa un grupo de coordinadores. Ingresa avances y da seguimiento. |
| **Coordinador** | 4 | Nivel operativo. Ve sus metas e ingresa avances mensuales. |

### Matriz de permisos

| Función | Gerente | Jefe | Supervisor | Coordinador |
|---|:---:|:---:|:---:|:---:|
| **Dashboards** | | | | |
| Ver dashboard ejecutivo global | ✓ | — | — | — |
| Ver dashboard de área | ✓ | ✓ | — | — |
| Ver dashboard de equipo | ✓ | ✓ | ✓ | — |
| Ver mis indicadores | ✓ | ✓ | ✓ | ✓ |
| **Indicadores y metas** | | | | |
| Crear / editar indicadores | ✓ | ✓ | — | — |
| Definir metas del período | ✓ | ✓ | ~ | — |
| Ingresar avances | — | — | ✓ | ✓ |
| Aprobar avances | ✓ | ✓ | — | — |
| Ver historial completo | ✓ | ✓ | ~ | ~ |
| **Reportes y análisis** | | | | |
| Drill-down por perspectiva BSC | ✓ | ✓ | — | — |
| Filtrar por área / período | ✓ | ✓ | ✓ | — |
| Exportar reportes (PDF/Excel) | ✓ | ✓ | — | — |
| **Configuración** | | | | |
| Gestionar usuarios | ✓ | — | — | — |
| Configurar estructura BSC | ✓ | — | — | — |

> ✓ Acceso completo · ~ Acceso parcial (solo su equipo/área) · — Sin acceso

---

## 3. Historias de usuario

### Gerente

| ID | Historia |
|---|---|
| HU-G01 | Como Gerente, quiero ver el dashboard ejecutivo con todos los KPIs consolidados, para tener una visión global del desempeño estratégico en segundos. |
| HU-G02 | Como Gerente, quiero filtrar indicadores por perspectiva BSC, área y período, para enfocar el análisis en la dimensión que me interesa. |
| HU-G03 | Como Gerente, quiero ver qué indicadores están en rojo, amarillo o verde, para priorizar atención en los problemas más críticos. |
| HU-G04 | Como Gerente, quiero hacer drill-down desde un KPI global hasta el dato por área, para entender la causa raíz sin pedir reportes. |
| HU-G05 | Como Gerente, quiero comparar el desempeño acumulado del año vs. meta anual, para proyectar si se alcanzarán los objetivos al cierre. |

### Jefe de Área

| ID | Historia |
|---|---|
| HU-J01 | Como Jefe de Producción, quiero ver el tablero de mi área con todos mis indicadores, para dar seguimiento al desempeño de mi equipo en un solo lugar. |
| HU-J02 | Como Jefe, quiero revisar y aprobar los avances ingresados por mis supervisores, para validarlos antes del cierre del período. |
| HU-J03 | Como Jefe de Producción, quiero ver el histórico mensual en un gráfico de línea, para detectar tendencias y estacionalidades. |
| HU-J04 | Como Jefe, quiero definir las metas mensuales de mi equipo, para alinear esfuerzos con el plan anual. |

### Supervisor

| ID | Historia |
|---|---|
| HU-S01 | Como Supervisor, quiero ingresar el avance mensual de cada indicador bajo mi cargo, para mantener actualizada la información del sistema. |
| HU-S02 | Como Supervisor, quiero ver qué indicadores están en riesgo, para tomar acciones correctivas antes del cierre. |
| HU-S03 | Como Supervisor, quiero ver el estado de cumplimiento por coordinador, para identificar a quién apoyar para cerrar el mes. |
| HU-S04 | Como Supervisor, quiero agregar una observación al registrar un avance, para explicar el contexto de una desviación (clima, plagas, etc.). |

### Coordinador

| ID | Historia |
|---|---|
| HU-C01 | Como Coordinador, quiero ver mis metas del mes en una vista clara, para saber exactamente qué se espera de mí. |
| HU-C02 | Como Coordinador, quiero ingresar mi avance y ver el semáforo en tiempo real, para auto-evaluar mi desempeño sin esperar reuniones. |
| HU-C03 | Como Coordinador, quiero ver mi historial de cumplimiento de los últimos 6 meses, para comparar mis resultados anteriores. |

---

## 4. Casos de uso

| ID | Caso de uso | Actor principal | Resumen |
|---|---|---|---|
| UC-01 | Ver Dashboard Ejecutivo | Gerente | Accede a Home → sistema muestra KPIs + gráficos BSC + semáforo global. |
| UC-02 | Registrar Avance | Coordinador / Supervisor | Selecciona indicador → ingresa valor real + observación → sistema actualiza semáforo. |
| UC-03 | Aprobar / Rechazar Avance | Jefe | Revisa avance pendiente → aprueba o rechaza con comentario. |
| UC-04 | Drill-Down de Indicador | Gerente / Jefe | Clic en indicador → ve detalle con gráfico histórico, tabla mensual, responsable. |
| UC-05 | Filtrar por Perspectiva / Período | Gerente / Jefe | Selecciona filtros → dashboard se actualiza dinámicamente. |
| UC-06 | Ver Alertas | Todos | Panel de indicadores en riesgo → clic navega al detalle del indicador. |
| UC-07 | Definir Meta del Período | Jefe / Gerente | Selecciona indicador → asigna valor meta para el período → guarda. |
| UC-08 | Seleccionar Rol en Login | Todos | Selecciona rol → sistema carga dashboard y permisos correspondientes. |

---

## 5. Modelo de datos conceptual

```
PERSPECTIVA_BSC
  id · nombre · descripcion · color
    │ 1:n
OBJETIVO_ESTRATEGICO
  id · perspectiva_id · nombre · descripcion
    │ 1:n
INDICADOR
  id · objetivo_id · nombre · unidad · formula
  frecuencia · responsable
  semaforo_verde · semaforo_amarillo · semaforo_rojo
    │
    ├─1:n─ META_PERIODO
    │        id · indicador_id · anio · mes · valor_meta
    │
    └─1:n─ AVANCE
             id · indicador_id · usuario_id
             mes · anio · valor_real
             observacion · estado · fecha

USUARIO
  id · nombre · rol · area_id · avatar

AREA
  id · nombre · descripcion · color · responsable_id
```

### Estados del avance

```
Borrador → Pendiente → Aprobado
                  ↓
              Rechazado → Corregido → Pendiente
```

---

## 6. Lógica del semáforo

| Color | Condición | Acción sugerida |
|---|---|---|
| 🟢 Verde | Cumplimiento ≥ 90% | Monitoreo rutinario |
| 🟡 Amarillo | Cumplimiento ≥ 70% y < 90% | Plan de acción preventivo |
| 🔴 Rojo | Cumplimiento < 70% | Intervención inmediata |

> Para indicadores inversos (ej. pérdidas postcosecha donde menor es mejor), la lógica se invierte: valor_real ≤ meta → verde.

---

## 7. Pantallas del sistema

| ID | Pantalla | Roles | Descripción |
|---|---|---|---|
| P-01 | Login / Selección de rol | Todos | Selector de rol + botón "Ingresar". Sin contraseña. |
| P-02 | Dashboard Ejecutivo | Gerente | KPIs globales, radar BSC, tabla con semáforo, filtros. |
| P-03 | Dashboard de Área | Gerente, Jefe | KPIs del área, indicadores del equipo, estado de aprobaciones. |
| P-04 | Dashboard de Equipo | Gerente, Jefe, Supervisor | Vista de coordinadores del equipo con estado por indicador. |
| P-05 | Mis Indicadores | Todos | Lista personal con semáforo y botón de registro. |
| P-06 | Detalle de Indicador | Todos (con permiso) | Drill-down: gráfico 12 meses, tabla de avances, observaciones. |
| P-07 | Registrar Avance | Supervisor, Coordinador | Formulario con valor real, observación y vista previa del semáforo. |
| P-08 | Metas y Objetivos | Gerente, Jefe | CRUD de indicadores, metas mensuales, alineación BSC. |
| P-09 | Alertas | Todos | Panel de indicadores en riesgo ordenados por severidad. |
| P-10 | Reportes | Gerente, Jefe | Generación de reportes por período, área, perspectiva. |
| P-11 | Configuración | Gerente | Gestión de usuarios, áreas, estructura BSC. |

---

## 8. Indicadores BSC — Catálogo

### Perspectiva Financiera

| ID | Indicador | Unidad | Fórmula | Meta mensual | Responsable |
|---|---|---|---|---|---|
| IND-F01 | Costo por hectárea | Q/ha | Costo operativo total / Hectáreas trabajadas | ≤ 4,500 | Jefe Producción |
| IND-F02 | Ingresos por ventas | Q millones | Suma total de ventas del período | ≥ 2.5 M | Jefe Ventas |
| IND-F03 | Rentabilidad neta | % | (Ingresos − Costos totales) / Ingresos × 100 | ≥ 35% | Gerente |
| IND-F04 | Ejecución presupuestaria | % | Gasto ejecutado / Presupuesto asignado × 100 | ≥ 90% ≤ 100% | Jefe Admón. |

### Perspectiva Clientes

| ID | Indicador | Unidad | Fórmula | Meta | Responsable |
|---|---|---|---|---|---|
| IND-C01 | Clientes activos | N.° | Clientes con ≥ 1 compra en el período | ≥ 45 | Jefe Ventas |
| IND-C02 | Satisfacción del cliente | % | Promedio encuesta (1–5) × 20 | ≥ 85% | Jefe Ventas |
| IND-C03 | Nuevos contratos | N.° | Contratos firmados en el mes | ≥ 3 | Supervisor Ventas |

### Perspectiva Procesos Internos

| ID | Indicador | Unidad | Fórmula | Meta | Responsable |
|---|---|---|---|---|---|
| IND-P01 | Rendimiento por hectárea | ton/ha | Producción total / Hectáreas cosechadas | ≥ 4.0 | Supervisor Campo |
| IND-P02 | % Área cosechada en tiempo | % | Ha cosechadas en fecha / Total planificadas × 100 | ≥ 90% | Supervisor Campo |
| IND-P03 | Pérdidas postcosecha | % | Pérdidas (ton) / Producción total × 100 *(inverso)* | ≤ 8% | Coordinador Almacén |
| IND-P04 | Eficiencia del riego | % | Agua utilizada por planta / Agua aplicada × 100 | ≥ 85% | Coordinador Riego |

### Perspectiva Aprendizaje y Crecimiento

| ID | Indicador | Unidad | Fórmula | Meta | Responsable |
|---|---|---|---|---|---|
| IND-A01 | % Personal capacitado | % | Personal con capacitación completada / Total × 100 | ≥ 80% | Supervisor RRHH |
| IND-A02 | Horas de capacitación | h/persona | Total horas / Total colaboradores | ≥ 6 h/mes | Supervisor RRHH |

---

## 9. Datos simulados — Valores 2026

> Semáforo calculado dinámicamente: verde ≥ 90%, amarillo ≥ 70%, rojo < 70% del cumplimiento.

### IND-P01 — Rendimiento/ha (meta: ≥ 4.0 ton/ha)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 3.7 🟡 | 4.1 🟢 | 4.4 🟢 | 4.2 🟢 | 3.9 🟡 | 4.3 🟢 | 4.5 🟢 | 4.6 🟢 | 3.8 🟡 | 4.0 🟢 | 4.2 🟢 | 3.6 🟡 |

### IND-F01 — Costo/ha (meta: ≤ Q4,500)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 4,210 🟢 | 4,380 🟢 | 4,620 🟡 | 4,450 🟢 | 5,100 🔴 | 4,823 🔴 | 4,680 🟡 | 4,290 🟢 | 4,180 🟢 | 4,590 🟡 | 4,320 🟢 | 5,200 🔴 |

### IND-F02 — Ingresos ventas (meta: ≥ Q2.5 M)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 2.1 M 🟡 | 2.3 M 🟡 | 2.7 M 🟢 | 2.9 M 🟢 | 2.2 M 🟡 | 2.1 M 🟡 | 2.6 M 🟢 | 3.1 M 🟢 | 2.8 M 🟢 | 3.0 M 🟢 | 2.4 M 🟡 | 3.4 M 🟢 |

### IND-P03 — Pérdidas postcosecha (meta: ≤ 8%)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 6.2% 🟢 | 5.8% 🟢 | 7.1% 🟢 | 8.9% 🟡 | 11.2% 🔴 | 11.2% 🔴 | 9.0% 🟡 | 7.5% 🟢 | 6.8% 🟢 | 7.2% 🟢 | 8.5% 🟡 | 6.1% 🟢 |

### IND-C01 — Clientes activos (meta: ≥ 45)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 38 🟡 | 41 🟡 | 46 🟢 | 49 🟢 | 52 🟢 | 48 🟢 | 50 🟢 | 55 🟢 | 43 🟡 | 47 🟢 | 51 🟢 | 58 🟢 |

### IND-A01 — % Personal capacitado (meta: ≥ 80%)

| Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 72% 🟡 | 81% 🟢 | 85% 🟢 | 78% 🟡 | 60% 🔴 | 74% 🟡 | 83% 🟢 | 88% 🟢 | 90% 🟢 | 86% 🟢 | 77% 🟡 | 92% 🟢 |

---

## 10. Usuarios simulados

| Nombre | Rol | Área | Indicadores asignados |
|---|---|---|---|
| Carlos Monterroso | Gerente | Dirección General | Visibilidad global |
| Ana Salguero | Jefe | Producción Agrícola | IND-P01, IND-P02, IND-P03, IND-P04 |
| Roberto Chávez | Jefe | Comercialización | IND-C01, IND-C02, IND-C03, IND-F02 |
| María López | Supervisor | Campo Norte | IND-P01, IND-P02 |
| Juan Pérez | Supervisor | Campo Sur | IND-P03, IND-P04 |
| Lucía Cifuentes | Supervisor | Ventas Región Central | IND-C01, IND-C03 |
| Diego Morales | Coordinador | Almacén / Postcosecha | IND-P03 |
| Sofía Ramírez | Coordinador | Sistema de Riego | IND-P04 |
| Andrés Gómez | Coordinador | Ventas | IND-C03 |
