# Guía de Contribución

¡Gracias por tu interés en contribuir a PixelMap Pro! 🎉

Este documento proporciona pautas y instrucciones para contribuir al proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Desarrollo Local](#desarrollo-local)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Commit Messages](#commit-messages)
- [Documentación](#documentación)

## Código de Conducta

Este proyecto adhiere a un Código de Conducta que esperamos que todos los colaboradores sigan.

### Nuestros Estándares

Los ejemplos de comportamiento que contribuyen a crear un ambiente positivo incluyen:

- Usar un lenguaje acogedor e inclusivo
- Ser respetuoso con los puntos de vista y experiencias diferentes
- Aceptar críticas constructivas con gracia
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

Los ejemplos de comportamiento inaceptable incluyen:

- Lenguaje o imágenes sexuales
- Trolling, comentarios insultantes o despectivos
- Acoso público o privado
- Publicar información privada de otros sin permiso
- Otra conducta que pudiera considerarse inapropiada profesionalmente

## ¿Cómo Puedo Contribuir?

### Reportar Bugs

Antes de crear reportes de bugs, por favor verifica la [lista de issues](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues) ya que podrías encontrar que no necesitas crear uno nuevo.

Cuando reportes un bug, incluye:

- **Descripción clara**: ¿Qué esperabas que sucediera?
- **Pasos para reproducir**: Detalla cómo reproducir el problema
- **Comportamiento actual**: ¿Qué sucedió realmente?
- **Comportamiento esperado**: ¿Qué debería haber sucedido?
- **Screenshots**: Si es posible, añade imágenes o GIFs
- **Tu entorno**: SO, navegador, versión de Node, etc.
- **Logs relevantes**: Incluye logs de consola o errores

### Sugerir Mejoras

Las sugerencias de mejora son bienvenidas. Cuando crees una sugerencia, incluye:

- **Descripción clara**: Explica la mejora y casos de uso
- **Ejemplos específicos**: Proporciona ejemplos para ilustrar los pasos
- **Cómo se relaciona**: Explica cómo esto estaría relacionado con el proyecto

### Mejoras de Documentación

La documentación clara es fundamental. Las mejoras son siempre bienvenidas:

- Typos y errores gramaticales
- Ejemplos adicionales
- Aclaraciones confusas
- Documentación faltante

### Código

Contribuciones de código son bienvenidas. Esto puede incluir:

- Nuevas funcionalidades
- Corrección de bugs
- Mejoras de rendimiento
- Refactoring

## Desarrollo Local

### Requisitos

```bash
Node.js >= 16.x
npm >= 8.x
Git
```

### Setup

1. **Fork el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pixelmap-pro.git
   cd pixelmap-pro
   ```

2. **Agrega el repositorio original como upstream**
   ```bash
   git remote add upstream https://github.com/Walabi-Vj-dev/pixelmap-pro.git
   ```

3. **Instala dependencias**
   ```bash
   npm install
   ```

4. **Crea tu rama de feature**
   ```bash
   git checkout -b feature/tu-feature
   ```

5. **Ejecuta en desarrollo**
   ```bash
   npm run dev
   ```

### Estructura de Directorios

```
pixelmap-pro/
├── public/          # Frontend
├── api/             # Backend
├── docs/            # Documentación
└── ...
```

## Proceso de Pull Request

1. **Actualiza tu fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Haz tus cambios**
   - Mantén los commits enfocados
   - Escribe mensajes de commit claros

3. **Prueba tu código**
   ```bash
   npm run dev
   # Prueba manualmente tu funcionalidad
   ```

4. **Push a tu fork**
   ```bash
   git push origin feature/tu-feature
   ```

5. **Abre un Pull Request**
   - Usa un título descriptivo
   - Describe qué cambios realizaste y por qué
   - Linkea cualquier issue relacionado
   - Proporciona screenshots si es relevante

6. **Responde feedback**
   - Sé receptivo a las sugerencias
   - Haz cambios solicitados en nuevos commits
   - Rebase en main si es necesario

## Estándares de Código

### JavaScript/HTML/CSS

- Usa **nombres descriptivos** para variables y funciones
- Comenta código complejo
- Mantén líneas razonablemente cortas
- Usa `const` por defecto, `let` cuando necesites reasignar
- Evita variables globales
- Una responsabilidad por función

### Ejemplo de Código Limpio

```javascript
// ❌ Malo
function calc(a, b) {
  return a + b
}

// ✅ Bueno
function calculateTotal(subtotal, tax) {
  return subtotal + tax
}
```

### Archivos

- Nombres en camelCase para archivos JavaScript
- Nombres en kebab-case para archivos CSS
- Nombres descriptivos, no abreviados

## Commit Messages

Usamos Conventional Commits para mantener un historial claro.

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (sin cambios de lógica)
- **refactor**: Refactorización de código
- **test**: Agregar o actualizar tests
- **chore**: Cambios en configuración, dependencias, etc.

### Ejemplos

```
feat(led-display): add pixelmap generator
fix(api): resolve authentication issue
docs(readme): update installation instructions
refactor(js): simplify color calculation function
```

## Documentación

### Docstrings

Para funciones importantes, incluye comentarios explicativos:

```javascript
/**
 * Calcula el color final para un LED
 * @param {number} r - Valor rojo (0-255)
 * @param {number} g - Valor verde (0-255)
 * @param {number} b - Valor azul (0-255)
 * @returns {string} Color en formato hexadecimal
 */
function rgbToHex(r, g, b) {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}
```

### README

Si agregas una nueva funcionalidad mayor, actualiza el README con:

- Descripción de la funcionalidad
- Cómo usarla
- Ejemplos de código
- Cualquier requisito adicional

## Revisión de Código

Esperamos que el código:

- Siga los estándares del proyecto
- Sea legible y mantenible
- Tenga comentarios donde sea necesario
- No introduzca vulnerabilidades de seguridad
- Sea eficiente

## Preguntas

¿Tienes preguntas? No dudes en:

- Abrir una [Discussion](https://github.com/Walabi-Vj-dev/pixelmap-pro/discussions)
- Crear una [Issue](https://github.com/Walabi-Vj-dev/pixelmap-pro/issues)
- Contactar al autor

---

¡Gracias por contribuir a PixelMap Pro! 🙏
