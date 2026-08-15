# FULGOR IA ANALICER ECONOMIC
> **Plataforma de Inteligencia Económica Avanzada, Inferencia Causal y Gemelo Digital**
> *Ecosistema Fulgor IA — Versión 1.0.0-PRO*

---

## 🏛️ 1. Descripción del Proyecto

**FULGOR IA ANALICER ECONOMIC** es una plataforma tecnológica full-stack de análisis macroeconómico, econometría aplicada y simulación prospectiva diseñada para convertir datos económicos complejos en inteligencia accionable, verificable y con estricto rigor metodológico.

### Principios Fundamentales
- **Medir**: Ingesta y certificación de datos macroeconómicos de fuentes oficiales primarias (INEGI, FRED, Eurostat, OCDE, Banco Mundial, CEPAL).
- **Analizar**: Inferencia causal formal, descomposición sectorial y modelos econométricos robustos.
- **Comprender**: Separación epistémica estricta entre datos observados, estimaciones y proyecciones.
- **Anticipar**: Simulador interactivo de Gemelo Digital (*Digital Twin*) y conos probabilísticos de incertidumbre.
- **Regla de Oro**: *"Datos reales, metodología transparente, conclusiones responsables."*

---

## 🏗️ 2. Arquitectura del Sistema

El proyecto sigue una arquitectura **Full-Stack desacoplada y modular**:

```text
├── server.ts                       # Servidor backend Express con endpoints REST v1/v2, Copilot y Vite SSR/SPA
├── src/
│   ├── main.tsx                    # Punto de entrada de la aplicación React
│   ├── App.tsx                     # Orquestador visual de vistas, navegación y estado global
│   ├── index.css                   # Configuración de estilos globales con Tailwind CSS v4
│   ├── components/                 # Módulos de interfaz de usuario de alta fidelidad
│   │   ├── OverviewView.tsx        # Dashboard ejecutivo macroeconómico
│   │   ├── IndicatorsView.tsx      # Explorador analítico de series temporales
│   │   ├── CausalAnalysisView.tsx  # Laboratorio de inferencia causal (DiD, SynthControl, IV)
│   │   ├── DigitalTwinView.tsx     # Gemelo Digital Macro & simulador de políticas
│   │   ├── PredictiveView.tsx      # Fan charts estocásticos y conos de incertidumbre
│   │   ├── AlertsView.tsx          # Monitor de anomalías y alertas tempranas (Z-score / IsoForest)
│   │   ├── FulgorIndexView.tsx     # Índice FAII (Fulgor AI Impact Index) y ranking
│   │   ├── AiImpactView.tsx        # Matriz de impacto de IA por sector y empleo
│   │   ├── EcosystemView.tsx       # Mapa del ecosistema de productos Fulgor IA
│   │   ├── MacroHeaderTicker.tsx   # Ticker bursátil/macroeconómico en tiempo real
│   │   ├── Navbar.tsx              # Barra de navegación, selector de país y controles de vista
│   │   ├── CopilotDrawer.tsx       # Copiloto económico asistido por IA (Gemini 3.7)
│   │   ├── ApiExplorerModal.tsx    # Explorador interactivo y documentación de la REST API
│   │   ├── ObservabilityModal.tsx  # Telemetría en vivo, latencia, memoria y health checks
│   │   ├── ReportStudioModal.tsx   # Generador y exportador de informes oficiales y auditoría
│   │   ├── DocumentationModal.tsx  # Ficha técnica, glosario y manual metodológico
│   │   ├── TierModal.tsx           # Comparativa de planes (Community, Pro, Enterprise)
│   │   ├── EpistemicBadge.tsx      # Componente de certificación epistémica visual
│   │   └── ProvenanceCard.tsx      # Ficha de trazabilidad y sellos criptográficos SHA-256
│   ├── data/
│   │   └── economicData.ts         # Dataset maestro de indicadores, países, sectores y causalidad
│   ├── engines/                    # 16 Motores analíticos desacoplados y deterministas
│   │   ├── orchestratorEngine.ts   # Orquestador del pipeline de inteligencia económica
│   │   ├── dataEngine.ts           # Motor de ingesta, filtrado y agregación de series
│   │   ├── provenanceEngine.ts     # Generación de huellas criptográficas SHA-256 e integridad
│   │   ├── econometricEngine.ts    # OLS, Pearson R, DiD cuasi-experimental, Granger
│   │   ├── digitalTwinEngine.ts    # Función Cobb-Douglas aumentada y dinámicas de política
│   │   ├── forecastEngine.ts       # Proyecciones estocásticas p10/p50/p90 y fan charts
│   │   ├── faiiEngine.ts           # Cálculo multidimensional del índice de adopción de IA
│   │   ├── anomalyEngine.ts        # Detección estadística de anomalías y desvíos
│   │   ├── aiImpactEngine.ts       # Modelado de sustitución, complementariedad y empleo
│   │   ├── copilotEngine.ts        # Guardarraíles de prompt y análisis epistémico
│   │   ├── reportEngine.ts         # Auditoría cruzada de sistemas y exportación de informes
│   │   ├── systemAuditEngine.ts    # Suite de pruebas unitarias y release gates (G1 a G7)
│   │   ├── apiEngine.ts            # Cliente simulado y contrato OpenAPI
│   │   ├── observabilityEngine.ts  # Métricas de rendimiento, p95, heap y uptime
│   │   ├── telemetryEngine.ts      # Registro de eventos de auditoría y rastreo de usuarios
│   │   └── localizationEngine.ts   # Formateo regional, monedas y paridades de poder de compra
│   └── types/
│       ├── economic.ts             # Definiciones completas de tipos TypeScript del dominio
│       └── localization.ts         # Tipos de internacionalización y formateo
├── package.json                    # Dependencias y scripts de construcción y ejecución
├── tsconfig.json                   # Configuración del compilador TypeScript
├── vite.config.ts                  # Configuración de Vite y plugins de Tailwind/React
├── metadata.json                   # Metadatos del applet para Google AI Studio
└── .env.example                    # Plantilla documentada de variables de entorno
```

---

## ⚡ 3. Requisitos y Dependencias

- **Node.js**: v18.0.0 o superior (recomendado v20+ o v22+)
- **npm** (v9+), **pnpm** (v8+) o **yarn** (v1.22+)

### Dependencias Principales
- `react` & `react-dom` (v19.x) — Framework de interfaz de usuario
- `express` (v4.x) — Servidor backend HTTP y proxy de API
- `@google/genai` (v2.x) — SDK oficial de Google GenAI para el Copiloto Macroeconómico
- `recharts` (v3.x) — Motor de renderizado de gráficos estadísticos y de dispersión
- `motion` (v12.x) — Animaciones fluidas y transiciones de estados
- `lucide-react` — Iconografía técnica consistente
- `tailwindcss` & `@tailwindcss/vite` (v4.x) — Motor de diseño utility-first
- `tsx` & `esbuild` — Compilación y ejecución nativa de TypeScript en backend

---

## 🚀 4. Instalación y Ejecución Local

### Paso 1: Clonar o extraer el proyecto
```bash
# Si exportaste el repositorio:
git clone <URL_DEL_REPOSITORIO>
cd fulgor-ia-analicer-economic

# O si descargaste el archivo ZIP:
unzip fulgor-ia-analicer-economic.zip
cd fulgor-ia-analicer-economic
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Configurar variables de entorno
Crea un archivo `.env` a partir de la plantilla `.env.example`:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
# Clave opcional para activar el Copiloto con el modelo Gemini 3.7 Flash en vivo.
# Si no se define, el Copiloto opera en modo analítico offline determinista.
GEMINI_API_KEY="tu_api_key_aqui"

# URL base para resolución de enlaces locales o en producción
APP_URL="http://localhost:3000"
```

### Paso 4: Iniciar en Modo de Desarrollo
```bash
npm run dev
```
La aplicación iniciará en `http://localhost:3000` con el servidor Express y el middleware de Vite habilitados.

### Paso 5: Construcción para Producción
```bash
# Compila el frontend estático a /dist y el backend a /dist/server.cjs
npm run build

# Ejecuta el servidor de producción
npm start
```

### Paso 6: Verificación de Tipos y Pruebas
```bash
# Ejecuta la validación estricta de TypeScript
npm run lint
```

---

## 🌐 5. Endpoints de la API REST

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor y confirmación de disponibilidad del modelo GenAI |
| `POST` | `/api/copilot/chat` | Consulta al Copiloto Macroeconómico con análisis epistémico clasificado |
| `POST` | `/api/digital-twin/simulate` | Simulación del Gemelo Digital Macro (Cobb-Douglas + Adopción IA) |
| `POST` | `/api/causal/did-analysis` | Cálculo formal de Difference-in-Differences y pruebas de significancia |
| `GET` | `/api/v1/health` | Verificación de estado de la API v1 con métricas de uptime |
| `GET` | `/api/v1/indicators` | Catálogo de indicadores macroeconómicos certificados |
| `GET` | `/api/v1/countries` | Perfiles económicos y puntajes de adopción de IA por país |
| `POST` | `/api/v1/simulate` | Endpoint programático para simulaciones de gemelo digital |
| `POST` | `/api/v1/correlation` | Cálculo de regresión OLS, $R^2$, Pearson $r$ y advertencia de causalidad |
| `POST` | `/api/v1/did` | Análisis cuasi-experimental formal 2x2 |
| `GET` | `/api/v1/forecasts` | Generación de conos de predicción estocástica p10, p50, p90 |
| `GET` | `/api/v1/anomalies` | Detección de valores atípicos mediante Z-Score e Isolation Forest |
| `GET` | `/api/v1/faii` | Ranking y desglose de pilares del Fulgor AI Impact Index |
| `GET` | `/api/v1/system-audit` | Diagnóstico de los 7 Release Gates y cumplimiento de la Regla de Oro |
| `GET` | `/api/v1/observability` | Métricas de latencia de red, uso de memoria heap y conexiones activas |

---

## 🔒 6. Cumplimiento de la "Regla de Oro" (Epistemic Rule of Gold)

La plataforma aplica 7 directivas epistemológicas verificadas por el motor `SystemAuditEngine`:
1. **ROG-01 (Separación Epistémica)**: Toda variable y gráfico categoriza su naturaleza: `DATO_OBSERVADO`, `ESTIMACION_MODELO`, `INFERENCIA_CAUSAL`, `PRONOSTICO_PROBABILISTICO`.
2. **ROG-02 (Trazabilidad y Criptografía)**: Cada dato oficial incluye `sourceName`, `seriesCode`, `frequency`, `lastUpdated` y hash criptográfico SHA-256.
3. **ROG-03 (Inferencia Causal Formal)**: Los análisis causales declaran explícitamente supuestos, contrafactuales y tests de tendencias paralelas.
4. **ROG-04 (Transparencia de Incertidumbre)**: Toda proyección muestra intervalos de confianza ($p_{10}, p_{50}, p_{90}$) y supuestos de riesgo.
5. **ROG-05 (FAII Index Integral)**: Pondera capacidad técnica, preparación laboral y balance de absorción económica.
6. **ROG-06 (Detección Estadística de Desvíos)**: Anomalías categorizadas por magnitud de desvío y nivel de severidad.
7. **ROG-07 (Guardarraíles de IA)**: Copiloto protegido contra alucinaciones y derivación causal no fundamentada.

---

## 📦 7. Instrucciones para Exportación del Proyecto

### Opción A: Descarga Directa como archivo ZIP desde Google AI Studio
1. En la esquina superior derecha de la interfaz de **Google AI Studio**, haz clic en el menú de opciones o **Ajustes** (icono de engranaje o tres puntos `⋮` / `Share`).
2. Selecciona la opción **Export** o **Download as ZIP** (Descargar como ZIP).
3. El navegador descargará un archivo `.zip` que contendrá el árbol de directorios completo, incluyendo todos los motores, componentes, configuraciones y dependencias listadas en `package.json`.

### Opción B: Exportar mediante GitHub desde Google AI Studio
1. En la barra superior de la interfaz de AI Studio, haz clic en el botón **Export** o en el menú de ajustes de la aplicación.
2. Selecciona **Export to GitHub** (Exportar a GitHub).
3. Autoriza tu cuenta de GitHub si es la primera vez.
4. Elige si deseas crear un **nuevo repositorio público o privado** (por ejemplo: `fulgor-ia-analicer-economic`).
5. Confirma la exportación; todos los archivos y commits se sincronizarán directamente en tu repositorio de GitHub.

---

## 🧪 8. Verificación Técnica Externa

Para auditorías técnicas independientes:
1. Ejecuta `npm run lint` para comprobar que no existan errores de tipado o imports rotos.
2. Ejecuta `npm run build` para comprobar que tanto el paquete de frontend Vite como el bundle de servidor Express en `dist/server.cjs` compilen sin errores.
3. Inicia la aplicación con `npm start` y accede al modal de **Auditoría del Sistema** desde el pie de página o la barra superior para ejecutar los 11 tests automatizados de integración de la plataforma.
