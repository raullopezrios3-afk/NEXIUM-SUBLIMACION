# NEXIUM Sublimación — sitio para GitHub Pages

## Archivos que deben subirse

Suba **el contenido de esta carpeta** a la raíz del repositorio o a la rama que utilizará GitHub Pages:

```text
index.html
.nojekyll
css/
js/
imagenes/
video/
README.md
```

No suba la carpeta contenedora como un único archivo ZIP: primero descomprímala. `index.html` debe quedar en la raíz de la fuente publicada.

## Activar GitHub Pages

1. Abra el repositorio en GitHub.
2. Entre en **Settings → Pages**.
3. En **Build and deployment**, seleccione **Deploy from a branch**.
4. Seleccione la rama donde subió los archivos, normalmente `main`.
5. Seleccione la carpeta `/ (root)` y pulse **Save**.
6. Espere a que GitHub muestre la dirección pública del sitio.

Si publica desde la carpeta `docs`, coloque allí todos los archivos y seleccione `/docs` en la configuración de Pages.

## Cómo probar localmente

Abra `index.html` directamente en un navegador. Para una prueba más fiel, inicie un servidor web en esta carpeta, por ejemplo con la extensión Live Server de Visual Studio Code.

Para una prueba local más fiel, inicie un servidor web en esta carpeta (por ejemplo, con la extensión Live Server de Visual Studio Code).

## Cambios realizados

- Se retiraron por completo el visor 360, Design Studio, Mockup Engine, recursos 360 y el prototipo NEXIUM_CORE.
- Se corrigió la estructura HTML y la navegación Inicio / Productos / Galería / Contacto.
- Se estabilizaron el slider, catálogos, visor de imágenes, póster, video, modal de cotización, WhatsApp y modo oscuro.
- Se añadieron controles accesibles, cierre con Escape, navegación del visor con flechas y persistencia del tema.
- Se conservaron la apariencia, los colores y los recursos gráficos originales.
- EmailJS conserva las claves públicas encontradas en el proyecto. Su funcionamiento final depende de que el servicio y la plantilla sigan activos y acepten el dominio publicado.

## Notas de publicación

- Las rutas de recursos son relativas, por lo que funcionan tanto en un dominio de usuario como dentro de la dirección de un repositorio de GitHub Pages.
- No cambie los nombres ni la ubicación de las carpetas.
- La cotización por EmailJS requiere conexión a internet. Las claves públicas encontradas en el proyecto se conservaron; el servicio debe aceptar el dominio público asignado por GitHub Pages.
