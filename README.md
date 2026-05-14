# Global Contact Intranet

Prototipo de intranet corporativa para empleados, construido a partir del estilo del proyecto `mejorar-sitio-web-corporativo.zip` y reorganizado con secciones inspiradas en `global.rar`.

## Vistas incluidas

- **Vista usuario:** navegación por secciones internas, buscador, comunicados y accesos para empleados.
- **Vista administrador:** permite crear, editar y copiar contenido desde la interfaz. En este prototipo los cambios se guardan en `localStorage` del navegador.

## Secciones principales

- Inicio
- Compañía
- Herramientas
- Recursos y materiales
- Capacitación
- Bienestar
- Productos internos

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Publicar en GitHub Pages

El proyecto está configurado con `output: 'export'` en `next.config.mjs`.

```bash
npm install
npm run build
```

El sitio estático se generará en la carpeta `out/`. Esa carpeta puede publicarse en GitHub Pages o mediante GitHub Actions.

## Edición futura

Para una intranet real con usuarios, permisos y contenido persistente, se recomienda conectar la vista administrador a un backend o CMS, por ejemplo Supabase, Firebase, Strapi, Sanity o una API propia.
