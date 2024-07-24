# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest# Panel de Control Secreto - TailwindMaze

## Descripción

Este proyecto es una aplicación web interactiva desarrollada con Svelte y Tailwind CSS. Presenta un "Panel de Control Secreto" que incluye un juego de descubrimiento y un editor de clases CSS en tiempo real.

## Características principales

- Panel de control con tres módulos visuales
- Botón secreto con clases CSS personalizables
- Mensaje secreto que se revela al activar correctamente el botón
- Editor de código en tiempo real para modificar las clases CSS del botón y su contenedor
- Diseño responsivo utilizando Tailwind CSS

## Tecnologías utilizadas

- Svelte
- TypeScript
- Tailwind CSS
- CodeMirror (para el editor de código)

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/tailwind-maze.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd tailwind-maze
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

5. Abre tu navegador y visita `http://localhost:5000` (o el puerto que te indique la consola).

## Uso

1. Explora los tres módulos en el panel de control.
2. Intenta descubrir el secreto haciendo clic en el botón.
3. Utiliza el editor de código para modificar las clases CSS del botón y su contenedor.
4. Aplica los cambios para ver cómo afectan al estilo del botón.
5. Utiliza el botón "Restablecer Clases" para volver a los estilos por defecto.

## Estructura del proyecto

- `src/routes/tailwind-maze/+page.svelte`: Componente principal de la aplicación
- `linear/src/routes/tailwind-maze/+page.svelte.yml`: Archivo de descripción del componente (para desarrollo)

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
