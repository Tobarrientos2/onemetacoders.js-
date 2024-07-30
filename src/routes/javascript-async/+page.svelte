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

  let editorCodigo: EditorView;
  let editorSolucion: EditorView;

  const codigoInicial = `class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Tu código aquí
};`;

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

  function ejecutarCodigo() {
    // Lógica para ejecutar el código
    console.log("Ejecutando código...");
  }

  function enviarSolucion() {
    // Lógica para enviar la solución
    console.log("Enviando solución...");
  }
</script>

<main class="container mx-auto p-4 flex">
  <div class="w-1/2 pr-4">
    <Card>
      <CardHeader>
        <CardTitle>21. Merge Two Sorted Lists</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4">You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.</p>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="example">
            <AccordionTrigger>Example</AccordionTrigger>
            <AccordionContent>
              <img src="path_to_example_image.png" alt="Example" class="w-full"/>
              <p>Input: list1 = [1,2,4], list2 = [1,3,4]</p>
              <p>Output: [1,1,2,3,4,4]</p>
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
            <p>Caso 1: list1 = [1,2,4], list2 = [1,3,4]</p>
            <p>Caso 2: list1 = [], list2 = []</p>
            <p>Caso 3: list1 = [], list2 = [0]</p>
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