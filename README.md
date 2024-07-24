# OneMetaCoders CTF: Desafíos de Programación

## Descripción

OneMetaCoders CTF es una plataforma de Capture The Flag (CTF) diseñada específicamente para programadores. El proyecto presenta una serie de desafíos basados en diferentes tópicos de programación, donde los participantes deben utilizar sus habilidades de codificación para descubrir y capturar "banderas" ocultas.

Actualmente, el proyecto incluye un desafío basado en Tailwind CSS, con planes de expandirse a más tópicos en el futuro.

## Desafío Actual: TailwindMaze

El primer desafío, TailwindMaze, pone a prueba el conocimiento de los participantes sobre Tailwind CSS. Los jugadores deben navegar por un "laberinto" de clases CSS para revelar un mensaje secreto.

### Características del Desafío TailwindMaze

- Panel de control interactivo con módulos visuales
- Botón secreto con clases CSS personalizables
- Editor de código en tiempo real para modificar clases CSS
- Mensaje oculto que se revela al aplicar las clases correctas

## Tecnologías Utilizadas

- Svelte
- TypeScript
- Tailwind CSS
- CodeMirror (para el editor de código en tiempo real)

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/code-ctf.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd code-ctf
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

5. Abre tu navegador y visita `http://localhost:5000` (o el puerto indicado en la consola).

## Cómo Jugar

1. Accede al desafío TailwindMaze desde la página principal.
2. Explora el panel de control y sus módulos.
3. Utiliza el editor de código para modificar las clases CSS del botón secreto.
4. Intenta descubrir la combinación correcta de clases para revelar el mensaje oculto.
5. Una vez revelado el mensaje, habrás capturado la "bandera" y completado el desafío.

## Estructura del Proyecto

- `src/routes/tailwind-maze/+page.svelte`: Componente principal del desafío TailwindMaze
- `linear/src/routes/tailwind-maze/+page.svelte.yml`: Archivo de descripción del componente (para desarrollo)

## Contribuir

Las contribuciones son bienvenidas, especialmente para añadir nuevos desafíos basados en diferentes tópicos de programación. Por favor, abre un issue para discutir nuevas ideas o cambios mayores antes de crear un pull request.

## Próximos Pasos

- Implementar un sistema de puntuación y seguimiento de progreso.
- Añadir más desafíos basados en otros frameworks y lenguajes de programación.
- Crear una interfaz de usuario para seleccionar entre múltiples desafíos.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)