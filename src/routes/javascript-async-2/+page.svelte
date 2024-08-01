<script lang="ts">
	import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
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
  import { crearSimuladorTareas } from '$lib/utils/taskSimulator';
  import { casosPrueba } from '$lib/utils/testCases';
  import { auth } from '$lib/stores/auth';
  import { API_URL } from '$lib/config';
  import { toast } from '@zerodevx/svelte-toast';

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

  let editorCodigo: EditorView;
  let editorSolucion: EditorView;
  let resultado = writable('');

  let isLoading = true;

  onMount(async () => {
    if (browser) {
      await checkAuth();
    }
    cargarEditores();
  });

  async function checkAuth() {
    if (!$auth.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/verify-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            auth.login(token, userData);
          } else {
            auth.logout();
            goto('/auth/login');
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          auth.logout();
          goto('/auth/login');
        }
      } else {
        goto('/auth/login');
      }
    }
    isLoading = false;
  }

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

      let resultadosDetallados = [];

      for (const caso of casosPrueba) {
        const ejecutarTarea = crearSimuladorTareas(caso.probabilidadError);
        const resultadoUsuario = await funcionUsuario(ejecutarTarea, caso.tareas);
        const esCorrecta = verificarSolucion(resultadoUsuario, caso.tareas);
        
        resultadosDetallados.push({
          nombre: caso.nombre,
          correcto: esCorrecta,
          resultado: resultadoUsuario
        });
      }

      const todosCorrectos = resultadosDetallados.every(r => r.correcto);
      
      const puntuacionTotal = resultadosDetallados.reduce((sum, r) => r.correcto ? sum + 50 : sum, 0);

      if (todosCorrectos) {
        resultado.set('¡Felicidades! Has completado todos los casos de prueba correctamente.');
        await guardarProgreso(true, puntuacionTotal);
      } else {
        resultado.set('Algunos casos de prueba fallaron. Revisa los detalles y vuelve a intentarlo.');
        await guardarProgreso(false, puntuacionTotal);
      }

      console.log('Resultados detallados:', resultadosDetallados);
      
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

  async function guardarProgreso(completado: boolean, puntuacion: number) {
  const codigo = editorSolucion.state.doc.toString();
  try {
    const response = await fetch(`${API_URL}/save-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$auth.token}`
      },
      body: JSON.stringify({
        desafioId: 'javascript-async-2',
        codigo,
        completado,
        puntuacion
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Progreso guardado exitosamente');
      if (data.newAchievements && data.newAchievements.length > 0) {
        data.newAchievements.forEach((achievement: any) => {
          toast.push(`¡Nuevo logro desbloqueado: ${achievement.name}!`, {
            theme: {
              '--toastBackground': '#48BB78',
              '--toastBarBackground': '#2F855A'
            }
          });
        });
      }
    } else {
      console.error('Error al guardar el progreso');
    }
  } catch (error) {
    console.error('Error al guardar el progreso:', error);
  }
}

  function enviarSolucion() {
    ejecutarCodigo();
  }
</script>

{#if !isLoading && $auth.isAuthenticated}
  <main class="container mx-auto p-4 mt-20 flex">
    <div class="w-1/2 pr-4">
      <Card>
        <CardHeader>
          <CardTitle>Desafío CTF: Gestión de Tareas Asíncronas</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="mb-4">
            Tu misión es implementar la función 'gestionarTareas'.
            Esta función debe manejar múltiples tareas asíncronas
            con diferentes prioridades y dependencias, poniendo a prueba tus habilidades avanzadas en
            programación asíncrona de JavaScript.
          </p>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="rules">
              <AccordionTrigger>Reglas del Desafío</AccordionTrigger>
              <AccordionContent>
                <ol class="list-decimal list-inside">
                  <li>Usa 'await' para cada llamada a 'ejecutarTarea'.</li>
                  <li>Las tareas de alta prioridad deben ejecutarse primero.</li>
                  <li>Algunas tareas dependen de otras y no pueden iniciarse hasta que sus dependencias se completen.</li>
                  <li>Si una tarea falla, debes reintentar hasta 2 veces antes de pasar a la siguiente.</li>
                  <li>Mantén un registro de todas las tareas completadas y fallidas.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="example">
              <AccordionTrigger>Ejemplo</AccordionTrigger>
              <AccordionContent>
                <p>Input: Un array de tareas con sus prioridades y dependencias</p>
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
              {#each casosPrueba as caso}
                <p>{caso.nombre}: {caso.tareas.length} tareas, {caso.tareas.filter(t => t.prioridad === 'alta').length} de alta prioridad, probabilidad de error {caso.probabilidadError * 100}%</p>
              {/each}
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
            <Button on:click={() => guardarProgreso(false)}>Guardar Progreso</Button>
            <Button on:click={enviarSolucion} variant="default">Enviar</Button>
          </div>
          <div class="mt-4 p-2 bg-gray-100 text-black rounded">
            <p>Resultado: {$resultado}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
{/if}

<style>
  :global(.cm-editor) {
    height: 300px;
    width: 100%;
  }
</style>