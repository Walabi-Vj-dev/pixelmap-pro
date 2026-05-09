# 🚀 Guía de Desarrollo - PixelMap Pro

## Tabla de Contenidos

1. [Environment Setup](#environment-setup)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Desarrollo Frontend](#desarrollo-frontend)
4. [Desarrollo Backend](#desarrollo-backend)
5. [Testing](#testing)
6. [Debugging](#debugging)
7. [Deployment](#deployment)

## Environment Setup

### Requisitos

```bash
Node.js >= 16.x
npm >= 8.x
Git
Cuenta en Supabase
Cuenta en Vercel
```

### Instalación Inicial

```bash
# Clonar repositorio
git clone https://github.com/Walabi-Vj-dev/pixelmap-pro.git
cd pixelmap-pro

# Instalar dependencias
npm install

# Crear archivo .env.local
cp .env.example .env.local

# Editar variables de entorno
nano .env.local
```

### Variables de Entorno

**Archivo: `.env.local`**

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_SERVICE_KEY=your-service-key

# Mercado Pago
VITE_MP_PUBLIC_KEY=your-public-key
MP_ACCESS_TOKEN=your-access-token

# URLs
VITE_API_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173

# Otros
NODE_ENV=development
```

## Estructura de Carpetas

```
pixelmap-pro/
├── public/                      # Frontend estático
│   ├── index.html              # Página principal
│   ├── css/
│   │   ├── main.css            # Estilos principales
│   │   ├── editor.css          # Estilos del editor
│   │   └── responsive.css      # Media queries
│   ├── js/
│   │   ├── app.js              # App principal
│   │   ├── editor.js           # Lógica del editor
│   │   ├── supabase.js         # Config de Supabase
│   │   ├── api.js              # Llamadas a API
│   │   └── utils.js            # Funciones auxiliares
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── api/                         # Backend serverless
│   ├── auth.js                 # Autenticación
│   ├── create-payment.js       # Pagos
│   ├── webhook-mp.js           # Webhooks MP
│   └── utils/
│       ├── supabase.js         # Cliente Supabase
│       └── validators.js       # Validaciones
│
├── docs/                        # Documentación
│   ├── USER_GUIDE.md
│   ├── TECHNICAL.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   └── PRICING.md
│
├── .github/
│   └── workflows/              # GitHub Actions
│       ├── test.yml
│       └── deploy.yml
│
├── supabase-schema.sql         # Schema de BD
├── vercel.json                 # Config Vercel
├── package.json                # Dependencias
├── .gitignore                  # Archivos ignorados
├── LICENSE                     # MIT License
├── README.md                   # Documentación
└── CONTRIBUTING.md             # Guía de contribución
```

## Desarrollo Frontend

### Estructura de Módulos JS

```javascript
// Cada archivo es un módulo independiente

// app.js - Inicialización principal
export const initApp = async () => {
  await initSupabase()
  await loadUserData()
  setupEventListeners()
}

// editor.js - Lógica del editor
export const Editor = {
  canvas: null,
  pixels: [],
  
  init(canvasElement) {
    this.canvas = canvasElement
    this.setupCanvas()
  },
  
  drawPixel(x, y, color) {
    // Lógica de dibujo
  }
}

// api.js - Llamadas HTTP
export const createProject = async (projectData) => {
  const response = await fetch('/api/create-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  })
  return response.json()
}
```

### Desarrollo Local

```bash
# Ejecutar servidor de desarrollo
npm run dev

# Resultado
# Local: http://localhost:5173
```

### Estructura CSS

```css
/* main.css - Estilos globales */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --transition-speed: 200ms;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  color: var(--color-text);
  background: var(--color-bg);
}

/* editor.css - Componentes específicos */
.pixel-grid {
  display: grid;
  gap: 2px;
  padding: var(--spacing-unit);
}

.pixel {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.pixel.active {
  border-color: #000;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
```

### Hot Module Replacement

Durante desarrollo, los cambios se reflejan automáticamente sin recargar.

```javascript
// Soportar HMR en módulos
if (import.meta.hot) {
  import.meta.hot.accept()
}
```

## Desarrollo Backend

### Estructura de API Functions

```javascript
// api/example.js - Función serverless

export default async function handler(req, res) {
  // Validar método HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    // Validar entrada
    const { email, plan } = req.body
    if (!email || !plan) {
      return res.status(400).json({ error: 'Missing fields' })
    }
    
    // Verificar token JWT
    const token = req.headers.authorization?.split(' ')[1]
    const user = await verifyToken(token)
    
    // Lógica principal
    const result = await processData(user, email, plan)
    
    // Respuesta exitosa
    return res.status(200).json(result)
  } catch (error) {
    // Error handling
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
```

### Conexión a Supabase desde API

```javascript
// api/utils/supabase.js

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export const getUser = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const updateUserPlan = async (userId, plan) => {
  const { error } = await supabase
    .from('profiles')
    .update({ plan, plan_updated_at: new Date() })
    .eq('id', userId)
  
  if (error) throw error
}
```

### Testing de API

```bash
# Usar curl para probar endpoints
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# O usar Postman
# Importar la colección de requests
```

## Testing

### Testing Manual

```javascript
// Testing en consola del navegador

// Probar módulo de editor
const { Editor } = await import('./js/editor.js')
Editor.init(document.querySelector('#canvas'))
Editor.drawPixel(0, 0, '#FF0000')

// Probar API
const response = await fetch('/api/auth', {
  method: 'POST',
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
})
const data = await response.json()
console.log(data)
```

### Crear Tests Automatizados

```javascript
// test/editor.test.js

describe('Editor Module', () => {
  let editor
  
  beforeEach(() => {
    editor = new Editor()
  })
  
  test('Debería dibujar un píxel', () => {
    editor.drawPixel(0, 0, '#FF0000')
    expect(editor.pixels[0]).toBe('#FF0000')
  })
  
  test('Debería exportar como JSON', () => {
    editor.drawPixel(0, 0, '#FF0000')
    const json = editor.exportJSON()
    expect(json).toContain('FF0000')
  })
})
```

## Debugging

### Console Logging

```javascript
// Logging estructurado
const log = {
  info: (...args) => console.log('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  debug: (...args) => console.debug('[DEBUG]', ...args)
}

log.info('App iniciado')
log.error('Error al cargar proyecto:', error)
```

### DevTools del Navegador

```javascript
// Pausar ejecución
debugger

// Condicional
if (someCondition) debugger

// Breakpoints en DevTools
// F12 -> Sources -> Click en número de línea
```

### Debugging en Vercel

```bash
# Ver logs en tiempo real
vercel logs

# Ver logs de función específica
vercel logs api/auth.js

# Con filtro
vercel logs --follow
```

## Deployment

### Deployment a Vercel

```bash
# Opción 1: Con CLI
vercel deploy

# Opción 2: Desde GitHub
# 1. Push a main
# 2. Vercel detecta cambios automáticamente
# 3. Verifica el build
# 4. Deploy automático
```

### Pre-Deploy Checklist

```bash
# ✅ Tests pasando
npm test

# ✅ Build sin errores
npm run build

# ✅ Linting sin problemas
npm run lint

# ✅ Variables de entorno configuradas
echo $VITE_SUPABASE_URL

# ✅ Base de datos sincronizada
# - Verificar schema en Supabase
# - Migraciones ejecutadas

# ✅ Pagos en modo producción
# - Mercado Pago con keys reales
```

---

¿Preguntas sobre desarrollo? Abre un [Discussion](https://github.com/Walabi-Vj-dev/pixelmap-pro/discussions). 💪
