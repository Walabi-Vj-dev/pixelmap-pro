# 🎨 PixelMap Pro

> **Generador profesional de Pixelmaps para eventos con pantallas LED** 🌟

[![Vercel Deploy](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://pixelmap-pro.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Walabi-Vj-dev/pixelmap-pro?style=social)](https://github.com/Walabi-Vj-dev/pixelmap-pro)
[![Topics](https://img.shields.io/badge/Topics-pixelmap%20%7C%20led--display%20%7C%20vj-blue)](#topics)

## 📋 Tabla de Contenidos

- [Características](#características)
- [Demo en Vivo](#demo-en-vivo)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Documentación](#documentación)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## 🚀 Características

### 🎯 Core Features
- ✅ **Generador de Pixelmaps**: Crea diseños personalizados para pantallas LED
- ✅ **Configuración de Módulos**: Personaliza matrices LED con diferentes configuraciones
- ✅ **Control VJ**: Herramienta profesional para visualistas y DJs
- ✅ **Sistema de Planes**: Free, Pro y SuperOp con diferentes límites
- ✅ **Exportación de Diseños**: Descarga tus proyectos en múltiples formatos
- ✅ **Base de Datos en la Nube**: Sincronización en tiempo real con Supabase
- ✅ **Pagos Integrados**: Sistema de suscripción con Mercado Pago
- ✅ **Autenticación Segura**: Login con Supabase Auth

### 💡 Para Usuarios
- 🎨 Editor visual intuitivo
- 📱 Interfaz responsive
- 🌙 Soporte para tema oscuro
- ⚡ Carga rápida y rendimiento optimizado
- 🔒 Datos privados y seguros

### 🛠️ Para Desarrolladores
- 📚 API REST bien documentada
- 🔌 Fácil integración con hardware
- 🚀 Deploy automático en Vercel
- 🐛 Sistema de logs detallado
- 📦 Componentes reutilizables

## 🌐 Demo en Vivo

**[Prueba PixelMap Pro Aquí →](https://pixelmap-pro.vercel.app)**

## 📦 Instalación

### Requisitos Previos

```bash
Node.js >= 16.x
npm >= 8.x o yarn >= 3.x
Cuenta en Supabase (gratuita)
Cuenta en Vercel (gratuita)
Cuenta en Mercado Pago (para pagos)
```

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Walabi-Vj-dev/pixelmap-pro.git
cd pixelmap-pro
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Mercado Pago
VITE_MP_PUBLIC_KEY=your-public-key

# API Base URL
VITE_API_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
```

### 4. Configurar Base de Datos

- Ve a [Supabase Console](https://supabase.com/dashboard)
- Abre el SQL Editor
- Copia y ejecuta el contenido de `supabase-schema.sql`

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## ⚙️ Configuración

### Variables de Entorno Completas

```env
# ============= FRONTEND =============
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_MP_PUBLIC_KEY=
VITE_API_URL=
VITE_APP_URL=

# ============= BACKEND =============
SUPABASE_JWT_SECRET=
SUPABASE_SERVICE_KEY=
MP_ACCESS_TOKEN=
NODE_ENV=production
```

### Configuración de Vercel

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1.js" },
    { "src": "/(.*)", "dest": "/public/$1" }
  ]
}
```

## 📚 Documentación

Para documentación detallada, consulta:

- 📖 **[Guía de Usuario](./docs/USER_GUIDE.md)** - Cómo usar PixelMap Pro
- 🔧 **[Documentación Técnica](./docs/TECHNICAL.md)** - Arquitectura y APIs
- 🎨 **[Guía de Desarrollo](./docs/DEVELOPMENT.md)** - Setup de desarrollo
- 💰 **[Sistema de Planes](./docs/PRICING.md)** - Planes y suscripciones
- 🚀 **[Deployment](./docs/DEPLOYMENT.md)** - Guía de despliegue

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados (variables CSS, Grid, Flexbox)
- **JavaScript Vanilla** - Sin frameworks pesados
- **Supabase JS** - Cliente de autenticación y BD

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** (implícito en Vercel) - Manejo de rutas
- **Supabase PostgreSQL** - Base de datos relacional
- **Vercel Functions** - Funciones serverless

### Infraestructura
- **Supabase** - Auth + Database + Real-time
- **Vercel** - Hosting y CI/CD
- **Mercado Pago** - Procesamiento de pagos

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto
- **npm/yarn** - Gestor de dependencias

## 📁 Estructura del Proyecto

```
pixelmap-pro/
├── public/                    # Frontend estático
│   ├── index.html            # Página principal
│   ├── css/                  # Estilos
│   ├── js/                   # Scripts
│   ├── assets/               # Imágenes y recursos
│   └── ...
├── api/                       # Backend serverless
│   ├── auth.js               # Autenticación
│   ├── create-payment.js     # Pagos
│   ├── webhook-mp.js         # Webhooks Mercado Pago
│   └── ...
├── docs/                      # Documentación
│   ├── USER_GUIDE.md
│   ├── TECHNICAL.md
│   ├── DEVELOPMENT.md
│   ├── PRICING.md
│   └── DEPLOYMENT.md
├── supabase-schema.sql       # Schema de BD
├── vercel.json               # Config de Vercel
├── package.json              # Dependencias
├── .gitignore                # Archivos ignorados
├── LICENSE                   # MIT License
├── README.md                 # Este archivo
└── CONTRIBUTING.md           # Guía de contribución
```

## 🎯 Planes y Suscripciones

| Característica | Free | Pro | SuperOp |
|---|---|---|---|
| Proyectos | 3 | 20 | Ilimitados |
| Exportaciones | 5/mes | 100/mes | Ilimitadas |
| Tamaño máximo | 32x32 | 64x64 | 128x128+ |
| APIs | ✅ | ✅ | ✅ |
| Soporte | Comunidad | Email | Prioritario |
| Precio | Gratis | $9.99/mes | $29.99/mes |

## 🚀 Despliegue

### Deploy en Vercel (Recomendado)

1. Push a tu repositorio de GitHub
2. Conecta en [vercel.com](https://vercel.com)
3. Vercel detectará automáticamente la configuración
4. Agrega variables de entorno en Vercel Dashboard
5. ¡Listo! Tu app está en vivo

```bash
# O con CLI
vercel
```

### Deploy Manual

```bash
# Build para producción
npm run build

# Deployar a tu servidor
vercel deploy --prod
```

## 🤝 Contribuciones

¡Nos encantaría tu ayuda! Para contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

## 🐛 Reportar Problemas

¿Encontraste un bug? [Abre una issue](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues/new?template=bug_report.md)

## 💡 Solicitar Funcionalidades

¿Tienes una idea? [Sugiere una funcionalidad](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues/new?template=feature_request.md)

## 📊 Roadmap

- [ ] App móvil (React Native)
- [ ] Integración con OBS Studio
- [ ] Generación automática con IA
- [ ] Librería de plantillas
- [ ] Colaboración en tiempo real
- [ ] Exportación a formatos adicionales (JSON, XML, etc)
- [ ] API pública v1.0
- [ ] Marketplace de extensiones

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](./LICENSE) para detalles.

## 👨‍💻 Autor

**Walabi VJ** - [@Walabi-Vj-dev](https://github.com/Walabi-Vj-dev)

## 🙏 Agradecimientos

- Supabase por el excelente BaaS
- Vercel por el hosting
- Mercado Pago por los pagos
- La comunidad de desarrolladores LED

## 📞 Contacto

- **Email**: walabi@pixelmappro.com
- **Web**: https://pixelmap-pro.vercel.app
- **GitHub Issues**: [Abre una issue](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Walabi-Vj-dev/pixelmap-pro/discussions)

---

<div align="center">

### ⭐ Si este proyecto te fue útil, por favor dale una estrella

[⬆ Volver arriba](#pixelmap-pro)

</div>
