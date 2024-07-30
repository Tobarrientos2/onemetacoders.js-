# El Laberinto de Tailwind

## Descripción del Desafío

Has descubierto una página web secreta que contiene información crucial. Sin embargo, la página está protegida por un sistema de seguridad basado en Tailwind CSS. Para acceder a la información, debes descifrar el código Tailwind correcto que revela un botón oculto.

## Código HTML Interceptado

```html
<div id="boton-secreto" class="CLASES-SECRETAS">
  <button class="CLASES-BOTON">
    Botón Secreto
  </button>
</div>
```

## Tu Tarea

Debes determinar las clases correctas de Tailwind para reemplazar "CLASES-SECRETAS" y "CLASES-BOTON" que harán visible y funcional el botón secreto. Las clases deben cumplir con los siguientes requisitos:

### Requisitos para el div con id "boton-secreto"

* Estar oculto por defecto
* Aparecer como flex cuando se active
* Estar centrado horizontal y verticalmente
* Tener un fondo amarillo suave
* Tener bordes redondeados
* Tener un padding vertical de 2 y horizontal de 4

### Requisitos para el botón dentro del div

* Tener texto blanco
* Tener fondo azul que se oscurece al hacer hover
* Tener bordes redondeados
* Tener padding vertical de 2 y horizontal de 4
* Tener una transición suave para el efecto hover

## Pista

Utiliza la documentación oficial de Tailwind CSS para encontrar las clases de utilidad correctas. Recuerda que algunas clases pueden tener múltiples efectos.

## Formato de la Bandera

La bandera consistirá en las clases correctas para "CLASES-SECRETAS" y "CLASES-BOTON" separadas por un pipe (|). Por ejemplo:
```
FLAG{clase1 clase2 clase3|clase4 clase5 clase6}
```
¡Buena suerte, agente Tailwind! La información crucial depende de tu dominio de las clases de utilidad.