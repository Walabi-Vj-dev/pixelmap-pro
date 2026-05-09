# 📖 Guía de Usuario - PixelMap Pro

## Tabla de Contenidos

1. [Primeros Pasos](#primeros-pasos)
2. [Crear un Proyecto](#crear-un-proyecto)
3. [Editor de Pixelmap](#editor-de-pixelmap)
4. [Configuración de Módulos](#configuración-de-módulos)
5. [Exportar Diseños](#exportar-diseños)
6. [Planes y Suscripciones](#planes-y-suscripciones)
7. [FAQ](#faq)

## Primeros Pasos

### Registro e Inicio de Sesión

1. Ve a [pixelmap-pro.vercel.app](https://pixelmap-pro.vercel.app)
2. Haz click en **"Registrarse"** o **"Iniciar Sesión""
3. Ingresa tu email y contraseña
4. Confirma tu email (revisa tu bandeja de entrada)
5. ¡Listo! Ya estás dentro

### Panel Principal

Después de iniciar sesión, verás:

- **Tus Proyectos**: Lista de mapas creados
- **Crear Nuevo**: Botón para nuevo proyecto
- **Mi Cuenta**: Configuración de perfil
- **Plan Actual**: Tu plan y límites

## Crear un Proyecto

### Paso 1: Nuevo Proyecto

1. Haz click en **"+ Nuevo Proyecto""
2. Ingresa un nombre descriptivo
   - Ejemplo: "Led-Escenario-Festival"
3. Elige las dimensiones:
   - **Ancho (X)**: Número de LEDs horizontales
   - **Alto (Y)**: Número de LEDs verticales
   - Máximo según tu plan (Free: 32x32, Pro: 64x64, etc)
4. Haz click en **"Crear""

### Paso 2: Configuración Inicial

```
Ejemplo: Para una pantalla de 16x8 LEDs
- Ancho (X): 16
- Alto (Y): 8
- Total de LEDs: 128
```

## Editor de Pixelmap

### Interfaz Principal

```
┌─────────────────────────────────────┐
│ HERRAMIENTAS │ CANVAS │ PROPIEDADES │
├─────────────────────────────────────┤
│   • Pincel  │ [16x8 Grid]  │ Color  │
│   • Borrador│              │ Tamaño │
│   • Cubo    │              │ Modo   │
│   • Linea   │              │        │
└─────────────────────────────────────┘
```

### Herramientas

#### 🖌️ Pincel
- Click: Pinta un LED
- Arrastra: Pinta múltiples LEDs
- Selecciona color antes de pintar

#### 🧹 Borrador
- Borra LEDs individuales
- Restaura al color deshabilitado

#### 🪣 Cubo de Pintura
- Click: Rellena área con color
- Rellena zonas del mismo color

#### 📏 Línea
- Click inicial: Punto de inicio
- Arrastra: Visualiza línea
- Click final: Dibuja línea

### Seleccionar Color

1. En el panel derecho, haz click en **"Color""
2. Elige de:
   - **Paleta Predefinida**: Colores comunes
   - **Color Picker**: Selector personalizado
   - **Valores RGB**: Ingresa directamente
   - **Hex**: Código hexadecimal

### Ejemplos de Diseños

#### Patrón Diagonal
```
X X X . . .
. X X X . .
. . X X X .
. . . X X X
```

#### Corazón
```
. X X . X X .
 X X X X X X X
 X X X X X X X
 X X X X X X X
 . X X X X X .
 . . X X X . .
 . . . X . . .
```

## Configuración de Módulos

### Tipo de LEDs Soportados

- **WS2812B (NeoPixel)**: RGB direccionables
- **APA102**: RGB de alto brillo
- **SK6812**: RGBW + blanco
- **Matrices HUB75**: Paneles grandes

### Configuración de Matriz

1. Abre **"Configuración de Módulos""
2. Define:
   - **Tipo de LED**: Elige el tipo
   - **Matriz**: Fila x Columna
   - **Orden de Escaneo**: Serpentín o normal
   - **Dirección**: Inicio del escaneo

### Ejemplo de Configuración

```json
{
  "tipo": "WS2812B",
  "filas": 8,
  "columnas": 16,
  "escaneo": "serpentin",
  "direccion": "arriba-izquierda",
  "velocidad_baudrate": 9600
}
```

## Exportar Diseños

### Formatos Disponibles

1. **PNG**: Imagen visual
   - Perfecto para referencia
   - Alta resolución

2. **SVG**: Gráficos vectoriales
   - Escalable sin pérdida
   - Editable en Illustrator

3. **JSON**: Datos estructurados
   - Para programadores
   - Importar en otros proyectos

4. **C/Arduino**: Código listo para microcontrolador
   - Array de bytes
   - Copiar y pegar

### Pasos para Exportar

1. Abre tu proyecto
2. Haz click en **"Descargar"** o **"Exportar""
3. Elige el formato
4. Configura opciones:
   - Resolución (para PNG/SVG)
   - Escala (para visualización)
5. Haz click en **"Descargar""

### Ejemplo JSON Exportado

```json
{
  "nombre": "Logo Festival",
  "dimensiones": {
    "ancho": 16,
    "alto": 8
  },
  "leds": [
    { "x": 0, "y": 0, "color": "#FF0000" },
    { "x": 1, "y": 0, "color": "#00FF00" },
    { "x": 2, "y": 0, "color": "#0000FF" }
  ]
}
```

## Planes y Suscripciones

### Plan Free
- ✅ Crear hasta 3 proyectos
- ✅ Máximo 32x32 LEDs
- ✅ 5 exportaciones/mes
- ✅ Soporte comunitario

### Plan Pro
- ✅ Hasta 20 proyectos
- ✅ Máximo 64x64 LEDs
- ✅ 100 exportaciones/mes
- ✅ Soporte por email
- 💰 $9.99/mes

### Plan SuperOp
- ✅ Proyectos ilimitados
- ✅ Máximo 128x128+ LEDs
- ✅ Exportaciones ilimitadas
- ✅ Soporte prioritario
- ✅ Acceso a beta
- 💰 $29.99/mes

### Cambiar de Plan

1. Ve a **"Mi Cuenta"**
2. Haz click en **"Cambiar Plan""
3. Elige nuevo plan
4. Completa pago con Mercado Pago
5. ¡Listo! Acceso inmediato

## FAQ

### ¿Cómo importo mis diseños?
Actualmente no está soportado. Te recomendamos:
- Exportar como JSON
- Guardar en un lugar seguro
- Reimportar más adelante (en desarrollo)

### ¿Puedo colaborar con otros usuarios?
Novedoso con Premium. Por ahora es solo individual.

### ¿Funciona sin conexión?
No, requiere conexión a internet para sincronizar con Supabase.

### ¿Qué navegadores soportan?
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### ¿Cómo contacto soporte?
- Email: walabi@pixelmappro.com
- GitHub Issues
- Discussions en el repositorio

### ¿Puedo usar esto comercialmente?
Sí, pero consulta nuestros términos de servicio.

### ¿Hay API pública?
En desarrollo. Próximamente v1.0 de la API.

---

¿Necesitas más ayuda? [Abre una issue](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues) o contáctanos. 🚀
