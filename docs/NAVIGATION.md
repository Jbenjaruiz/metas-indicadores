# Flujo de navegación — Plataforma de Metas e Indicadores

---

## Mapa general de pantallas

```
                            ┌─────────────────┐
                            │  P-01 · LOGIN   │
                            │ Selección de rol│
                            └────────┬────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                       │
              ▼                      ▼                       ▼
        [GERENTE]               [JEFE]               [SUPERVISOR]     [COORDINADOR]
              │                      │                       │                │
        ┌─────▼──────┐        ┌──────▼──────┐        ┌──────▼──────┐  ┌───────▼──────┐
        │ P-02       │        │ P-03        │        │ P-04        │  │ P-05         │
        │ Dashboard  │        │ Dashboard   │        │ Dashboard   │  │ Mis          │
        │ Ejecutivo  │        │ de Área     │        │ de Equipo   │  │ Indicadores  │
        └─────┬──────┘        └──────┬──────┘        └──────┬──────┘  └───────┬──────┘
              │                      │                       │                 │
    ┌─────────┼──────┐      ┌────────┼────┐         ┌───────┼──────┐          │
    ▼         ▼      ▼      ▼        ▼    ▼         ▼       ▼      ▼          ▼
  P-06      P-09   P-10   P-06     P-08  P-05     P-06    P-04   P-07       P-06
  Detalle   Alert. Repor. Detalle  Metas Mis Ind. Detalle Equipo Registrar  Detalle
  Indicad.                Indicad.                Indicad.       Avance     Indicad.
    │                       │                       │              │
    └───────────────────────┴───────────────────────┘              │
                            │                                       │
                            ▼                                       ▼
                         P-07                                    P-07
                      Registrar                               Registrar
                       Avance                                  Avance
```

---

## Acceso por rol

| Pantalla | Gerente | Jefe | Supervisor | Coordinador |
|---|:---:|:---:|:---:|:---:|
| P-01 Login | ✓ | ✓ | ✓ | ✓ |
| P-02 Dashboard Ejecutivo | ✓ | — | — | — |
| P-03 Dashboard de Área | ✓ | ✓ | — | — |
| P-04 Dashboard de Equipo | ✓ | ✓ | ✓ | — |
| P-05 Mis Indicadores | ✓ | ✓ | ✓ | ✓ |
| P-06 Detalle de Indicador | ✓ | ✓ | ✓ | ✓ |
| P-07 Registrar Avance | — | — | ✓ | ✓ |
| P-08 Metas y Objetivos | ✓ | ✓ | — | — |
| P-09 Alertas | ✓ | ✓ | ✓ | ✓ |
| P-10 Reportes | ✓ | ✓ | — | — |
| P-11 Configuración | ✓ | — | — | — |

> El menú lateral muestra solo las opciones accesibles para el rol activo.

---

## Pantalla de aterrizaje por rol

| Rol | Pantalla inicial | Motivo |
|---|---|---|
| Gerente | P-02 Dashboard Ejecutivo | Necesita visión global inmediata |
| Jefe | P-03 Dashboard de Área | Su foco es su área y su equipo |
| Supervisor | P-04 Dashboard de Equipo | Necesita ver el estado de su equipo |
| Coordinador | P-05 Mis Indicadores | Solo gestiona sus propias metas |

---

## Flujos principales

### Flujo 1: Gerente revisa el desempeño mensual

```
Login (Gerente)
  → P-02 Dashboard Ejecutivo
    → [Filtro: Perspectiva = Procesos Internos]
      → Tabla se actualiza, detecta 🔴 en "Pérdidas postcosecha"
        → [Clic en fila]
          → P-06 Detalle de Indicador
            → Ve gráfico histórico + tabla mensual + observaciones
              → [← Volver] → P-02
```

### Flujo 2: Coordinador ingresa su avance mensual

```
Login (Coordinador · Diego Morales)
  → P-05 Mis Indicadores
    → [Clic en "✎ Ingresar avance" en "Pérdidas postcosecha"]
      → P-07 Registrar Avance
        → Escribe valor: 11.2%
          → Vista previa muestra 🔴 57% en tiempo real
            → Escribe observación
              → [Enviar para aprobación]
                → Toast: "Avance enviado. Pendiente de aprobación."
                  → Redirige a P-05, el indicador muestra ⏳
```

### Flujo 3: Jefe aprueba un avance

```
Login (Jefe · Ana Salguero)
  → P-03 Dashboard de Área
    → Ve sección "Avances pendientes de aprobación" (2 pendientes)
      → [Clic en avance de Diego Morales]
        → Modal / panel lateral: valor, observación, contexto
          → [✓ Aprobar]
            → El avance cambia a "Aprobado"
              → El semáforo del indicador se actualiza en el dashboard
```

### Flujo 4: Supervisor revisa alertas de su equipo

```
Login (Supervisor · María López)
  → P-04 Dashboard de Equipo
    → Ve 🔴 en "Pérdidas postcosecha" de Diego Morales
      → [Ver indicador]
        → P-06 Detalle
          → Ve historial de 2 meses consecutivos en rojo
            → [← Volver] → P-09 Alertas
              → Ve lista completa de indicadores en riesgo
```

### Flujo 5: Gerente consulta el panel de alertas

```
P-02 Dashboard Ejecutivo
  → [Clic en ícono 🔔 (2) en el header]
    → P-09 Alertas
      → Lista ordenada: 🔴 críticos primero, luego 🟡
        → [Clic en "Ver indicador →"]
          → P-06 Detalle de Indicador
            → [← Volver] → P-09 Alertas
```

---

## Comportamiento del menú lateral

```
Estado: Gerente logueado

┌──────────────────┐
│ 🏠  Inicio       │  → P-02 Dashboard Ejecutivo
│ 📊  Mi Panel     │  → P-03 Dashboard de Área (N/A para Gerente → igual a P-02)
│ 📋  Mis Indicad. │  → P-05 Mis Indicadores
│ 🎯  Metas        │  → P-08 Metas y Objetivos   [visible: Gerente + Jefe]
│ 📈  Reportes     │  → P-10 Reportes            [visible: Gerente + Jefe]
│ 🔔  Alertas (2)  │  → P-09 Alertas             [badge dinámico: n.° indicadores 🔴]
│ ⚙   Config.      │  → P-11 Configuración       [visible: solo Gerente]
└──────────────────┘
```

El badge de alertas muestra solo el conteo de indicadores en estado 🔴 (crítico).

---

## Rutas de la SPA

| Ruta | Pantalla | Parámetros |
|---|---|---|
| `/` | P-01 Login | — |
| `/dashboard` | P-02 Dashboard Ejecutivo | `?area=&perspectiva=&mes=&anio=` |
| `/area/:areaId` | P-03 Dashboard de Área | `areaId: string` |
| `/equipo` | P-04 Dashboard de Equipo | — |
| `/mis-indicadores` | P-05 Mis Indicadores | `?mes=&anio=` |
| `/indicador/:id` | P-06 Detalle de Indicador | `id: string` |
| `/indicador/:id/avance` | P-07 Registrar Avance | `id: string` |
| `/metas` | P-08 Metas y Objetivos | `?perspectiva=&area=` |
| `/alertas` | P-09 Alertas | — |
| `/reportes` | P-10 Reportes | — |
| `/configuracion` | P-11 Configuración | `?tab=usuarios\|areas\|bsc` |

> La SPA puede implementarse con hash routing (`/#/dashboard`) para evitar configuración de servidor.

---

## Breadcrumbs

| Pantalla | Breadcrumb |
|---|---|
| P-02 | Inicio |
| P-03 | Inicio › Producción Agrícola |
| P-06 desde P-02 | Inicio › Pérdidas postcosecha |
| P-06 desde P-05 | Mis Indicadores › Pérdidas postcosecha |
| P-07 | Mis Indicadores › Pérdidas postcosecha › Registrar Avance |
| P-08 | Inicio › Metas y Objetivos |

---

## Transiciones de estado del avance

```
[Sin avance registrado]
        │
        │  Coordinador / Supervisor ingresa valor
        ▼
[Pendiente de aprobación]
        │
        ├──── Jefe aprueba ────────→ [Aprobado]
        │                                │
        └──── Jefe rechaza ────────→ [Rechazado]
                                         │
                              Coordinador corrige valor
                                         │
                                         ▼
                              [Pendiente de aprobación]  (ciclo)
```
