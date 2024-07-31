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
  import { VM } from 'vm2';
  import { analizarCodigo } from './analizar-codigo';

  let editorCodigo: EditorView;
  let editorSolucion: EditorView;
  let resultado = writable('');

  const codigoInicial = `/**
 * Tu misión, si decides aceptarla, es implementar la función 'hackearSistema'.
 * Esta función debe navegar por un laberinto asíncrono de servidores y firewalls.
 * 
 * Reglas:
 * 1. Debes usar 'await' para cada llamada a 'accederServidor' y 'superarFirewall'.
 * 2. Si encuentras un error, debes intentar nuevamente hasta 3 veces antes de pasar al siguiente servidor.
 * 3. Debes mantener un registro de todos los servidores accedidos exitosamente.
 * 4. El último servidor contiene el 'códigoSecreto' que debes retornar.
 * 5. Tienes un límite de tiempo total de 5000ms para completar la misión.
 * 
 * @param {function} accederServidor - Función asíncrona que simula el acceso a un servidor. Retorna el siguiente servidor o lanza un error.
 * @param {function} superarFirewall - Función asíncrona que simula superar un firewall. Retorna true si tiene éxito o lanza un error.
 * @return {Promise<string>} El código secreto obtenido del último servidor.
 */
async function hackearSistema(accederServidor, superarFirewall) {
  // Tu código aquí
}

// No modifiques esta parte
export { hackearSistema };`;

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
      // Crear un entorno sandbox
      const vm = new VM({
        timeout: 5000,
        sandbox: {
          accederServidor: async () => {
            // Simular latencia de red
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
            if (Math.random() < 0.3) throw new Error('Acceso denegado');
            return Math.random().toString(36).substring(7);
          },
          superarFirewall: async () => {
            // Simular firewall
            await new Promise(resolve => setTimeout(resolve, Math.random() * 300));
            if (Math.random() < 0.2) throw new Error('Firewall impenetrable');
            return true;
          }
        }
      });

      // Ejecutar el código del usuario en el sandbox
      const { hackearSistema } = vm.run(`(${codigo})`);

      const inicioTiempo = Date.now();
      const codigoSecreto = await hackearSistema(vm.sandbox.accederServidor, vm.sandbox.superarFirewall);
      const tiempoTotal = Date.now() - inicioTiempo;

      // Evaluar la solución
      if (tiempoTotal > 5000) {
        resultado.set('Tiempo excedido. Misión fallida.');
      } else if (typeof codigoSecreto === 'string' && codigoSecreto.length === 8) {
        resultado.set(`¡Misión cumplida! Código secreto: ${codigoSecreto}. Tiempo: ${tiempoTotal}ms`);
      } else {
        resultado.set('Código secreto inválido. Misión fallida.');
      }

      // Analizar el código estáticamente
      const analisisEstatico = analizarCodigo(codigo);
      console.log('Análisis estático:', analisisEstatico);

    } catch (error) {
      resultado.set(`Error: ${error.message}`);
    }
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
          Tu misión, si decides aceptarla, es implementar la función 'hackearSistema'.
          Esta función debe navegar por un laberinto asíncrono de servidores y firewalls,
          poniendo a prueba tus habilidades avanzadas en asincronía de JavaScript.
        </p>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="rules">
            <AccordionTrigger>Reglas del Desafío</AccordionTrigger>
            <AccordionContent>
              <ol class="list-decimal list-inside">
                <li>Usa 'await' para cada llamada a 'accederServidor' y 'superarFirewall'.</li>
                <li>Si encuentras un error, intenta nuevamente hasta 3 veces antes de pasar al siguiente servidor.</li>
                <li>Mantén un registro de todos los servidores accedidos exitosamente.</li>
                <li>El último servidor contiene el 'códigoSecreto' que debes retornar.</li>
                <li>Tienes un límite de tiempo total de 5000ms para completar la misión.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="example">
            <AccordionTrigger>Ejemplo</AccordionTrigger>
            <AccordionContent>
              <p>Input: Una serie de servidores y firewalls simulados</p>
              <p>Output: "a1b2c3d4" (un código secreto de 8 caracteres)</p>
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
            <p>Caso 1: 5 servidores, 3 firewalls, 30% probabilidad de error</p>
            <p>Caso 2: 10 servidores, 5 firewalls, 50% probabilidad de error</p>
            <p>Caso 3: 3 servidores, 1 firewall, 10% probabilidad de error</p>
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