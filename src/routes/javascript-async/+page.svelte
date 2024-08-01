<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
  import { basicSetup } from 'codemirror';
  import { EditorView } from '@codemirror/view';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { writable } from 'svelte/store';
  import { crearSimuladorTareas, generarTareas } from '$lib/utils/taskSimulator';

  let editorCodigo: EditorView;
  let editorSolucion: EditorView;
  let resultado = writable('');

  const codigoInicial = `/**
 * Tu misión es implementar la función 'gestionarTareas'.
 * Esta función debe manejar múltiples tareas asíncronas con diferentes prioridades y dependencias.
 * 
 * Reglas:
 * 1. Debes usar 'await' para cada llamada a 'ejecutarTarea'.
 * 2. Las tareas de alta prioridad deben ejecutarse primero.
 * 3. Algunas tareas dependen de otras y no pueden iniciarse hasta que sus dependencias se completen.
 * 4. Si una tarea falla, debes reintentar hasta 2 veces antes de pasar a la siguiente.
 * 5. Debes mantener un registro de todas las tareas completadas y fallidas.
 * 
 * @param {function} ejecutarTarea - Función asíncrona que simula la ejecución de una tarea. 
 *                                   Recibe un objeto de tarea y retorna el resultado o lanza un error.
 * @param {Array} tareas - Array de objetos de tarea con propiedades: id, prioridad, dependencias.
 * @return {Promise<Object>} Un objeto con las tareas completadas y fallidas.
 */
async function gestionarTareas(ejecutarTarea, tareas) {
  // Tu código aquí
}

// No modifiques esta parte
export { gestionarTareas };`;

  onMount(() => {
    cargarEditores();
  });

  function cargarEditores() {
    editorCodigo = new EditorView({
      doc: codigoInicial,
      extensions: [basicSetup, javascript(), oneDark],
      parent: document.getElementById('editor-codigo')!,
      editable: false,
    });

    editorSolucion = new EditorView({
      doc: '',
      extensions: [basicSetup, javascript(), oneDark],
      parent: document.getElementById('editor-solucion')!,
    });
  }

  async function ejecutarCodigo() {
    resultado.set('Ejecutando...');
    const codigo = editorSolucion.state.doc.toString();
    
    try {
      const funcionUsuario = new Function(`
        ${codigo}
        return gestionarTareas;
      `)();

      const ejecutarTarea = crearSimuladorTareas();
      const tareas = generarTareas(5);

      const resultadoUsuario = await funcionUsuario(ejecutarTarea, tareas);
      
      const esCorrecta = verificarSolucion(resultadoUsuario, tareas);
      
      if (esCorrecta) {
        resultado.set('¡Solución correcta! ' + JSON.stringify(resultadoUsuario, null, 2));
      } else {
        resultado.set('Solución incorrecta. Revisa las reglas y vuelve a intentarlo.');
      }
    } catch (error) {
      resultado.set(`Error: ${error.message}`);
    }
  }

  function verificarSolucion(resultado: any, tareas: any[]): boolean {
    // Verificar que el resultado tiene las propiedades correctas
    if (!resultado.completadas || !resultado.fallidas) {
      return false;
    }

    // Verificar que todas las tareas están en completadas o fallidas
    const todasLasTareas = new Set(tareas.map(t => t.id));
    const tareasCompletadas = new Set(resultado.completadas.map((t: any) => t.id));
    const tareasFallidas = new Set(resultado.fallidas.map((t: any) => t.id));

    if (tareasCompletadas.size + tareasFallidas.size !== todasLasTareas.size) {
      return false;
    }

    // Verificar que las tareas de alta prioridad se ejecutaron primero
    const tareasAltaPrioridad = tareas.filter(t => t.prioridad === 'alta').map(t => t.id);
    const indicesAltaPrioridad = tareasAltaPrioridad.map(id => resultado.completadas.findIndex((t: any) => t.id === id));
    if (!indicesAltaPrioridad.every((index, i) => index <= i)) {
      return false;
    }

    // Verificar que las dependencias se respetaron
    for (const tarea of resultado.completadas) {
      const tareaOriginal = tareas.find(t => t.id === tarea.id);
      if (tareaOriginal) {
        for (const dependencia of tareaOriginal.dependencias) {
          const indiceDependencia = resultado.completadas.findIndex((t: any) => t.id === dependencia);
          const indiceTarea = resultado.completadas.findIndex((t: any) => t.id === tarea.id);
          if (indiceDependencia === -1 || indiceDependencia > indiceTarea) {
            return false;
          }
        }
      }
    }

    return true;
  }

  function enviarSolucion() {
    // Implementar lógica para enviar y verificar la solución final
    console.log("Enviando solución...");
  }
</script>

<main class="container mx-auto p-4 mt-20 flex">
  <div class="w-1/2 pr-4">
    <Card>
      <CardHeader>
        <CardTitle>Desafío CTF: Laberinto Asíncrono</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4">
          Tu misión, si decides aceptarla, es implementar la función 'gestionarTareas'.
          Esta función debe manejar múltiples tareas asíncronas con diferentes prioridades y dependencias,
          poniendo a prueba tus habilidades avanzadas en asincronía de JavaScript.
        </p>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="rules">
            <AccordionTrigger>Reglas del Desafío</AccordionTrigger>
            <AccordionContent>
              <ol class="list-decimal list-inside">
                <li>Debes usar 'await' para cada llamada a 'ejecutarTarea'.</li>
                <li>Las tareas de alta prioridad deben ejecutarse primero.</li>
                <li>Algunas tareas dependen de otras y no pueden iniciarse hasta que sus dependencias se completen.</li>
                <li>Si una tarea falla, debes reintentar hasta 2 veces antes de pasar a la siguiente.</li>
                <li>Debes mantener un registro de todas las tareas completadas y fallidas.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="example">
            <AccordionTrigger>Ejemplo</AccordionTrigger>
            <AccordionContent>
              <p>Input: Una serie de tareas con prioridades y dependencias</p>
              <p>Output: Un objeto con las tareas completadas y fallidas</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Tabs defaultValue="codigo" class="w-full mt-4">
          <TabsList>
            <TabsTrigger value="codigo">Código Inicial</TabsTrigger>
            <TabsTrigger value="testcases">Casos de Prueba</TabsTrigger>
          </TabsList>
          <TabsContent value="codigo">
            <div id="editor-codigo" class="border border-gray-300 rounded"></div>
          </TabsContent>
          <TabsContent value="testcases">
            <p>Caso 1: 5 tareas, 3 dependencias, 30% probabilidad de error</p>
            <p>Caso 2: 10 tareas, 5 dependencias, 50% probabilidad de error</p>
            <p>Caso 3: 3 tareas, 1 dependencia, 10% probabilidad de error</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>

  <div class="w-1/2 pl-4">
    <Card>
      <CardHeader>
        <CardTitle>Solución</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="editor-solucion" class="border border-gray-300 rounded mb-4"></div>
        <div class="flex justify-between">
          <Button on:click={ejecutarCodigo}>Ejecutar Código</Button>
          <Button on:click={enviarSolucion} variant="default">Enviar</Button>
        </div>
        <div class="mt-4 p-2 bg-gray-100 rounded">
          <p>Resultado: {$resultado}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</main>

<style>
  :global(.cm-editor) {
    height: 300px;
    width: 100%;
  }
</style>