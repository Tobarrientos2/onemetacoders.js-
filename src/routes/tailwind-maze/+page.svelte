<script lang="ts">
  import { onMount } from 'svelte';
  import { basicSetup } from 'codemirror';
  import { EditorView } from '@codemirror/view';
  import { css } from '@codemirror/lang-css';
  import { oneDark } from '@codemirror/theme-one-dark';

  let secretoVisible = false;
  let clasesSecretas = 'mt-8 CLASES-SECRETAS';
  let clasesBoton = 'CLASES-BOTON';
  let editorCargado = false;
  let editorClasesSecretas: EditorView;
  let editorClasesBoton: EditorView;

  onMount(() => {
    cargarCodeMirror();
  });

  async function cargarCodeMirror() {
    editorClasesSecretas = new EditorView({
      doc: clasesSecretas,
      extensions: [basicSetup, css(), oneDark],
      parent: document.getElementById('editor-clases-secretas')!,
    });

    editorClasesBoton = new EditorView({
      doc: clasesBoton,
      extensions: [basicSetup, css(), oneDark],
      parent: document.getElementById('editor-clases-boton')!,
    });

    editorCargado = true;
  }

  function toggleSecreto() {
    const button = document.getElementById('boton-secreto')!.querySelector('button');
    const expectedClasses = 'bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300';
    
    if (button!.className === expectedClasses) {
      secretoVisible = !secretoVisible;
    } else {
      alert('El botón no tiene las clases correctas.');
    }
  }

  function resetClasses() {
    clasesSecretas = 'mt-8 CLASES-SECRETAS';
    clasesBoton = 'CLASES-BOTON';
    editorClasesSecretas.dispatch({
      changes: { from: 0, to: editorClasesSecretas.state.doc.length, insert: clasesSecretas }
    });
    editorClasesBoton.dispatch({
      changes: { from: 0, to: editorClasesBoton.state.doc.length, insert: clasesBoton }
    });
  }

  function actualizarClases() {
    clasesSecretas = editorClasesSecretas.state.doc.toString();
    clasesBoton = editorClasesBoton.state.doc.toString();
  }
</script>

<main class="container mx-auto p-4 bg-gray-100 min-h-screen">
  <h1 class="text-2xl font-bold mb-4 text-center">Panel de Control Secreto</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-blue-200 p-4 rounded shadow">Módulo 1</div>
    <div class="bg-green-200 p-4 rounded shadow">Módulo 2</div>
    <div class="bg-red-200 p-4 rounded shadow">Módulo 3</div>
  </div>
  <div id="boton-secreto" class={clasesSecretas}>
    <button 
      on:click={toggleSecreto}
      class={clasesBoton}
    >
      {secretoVisible ? 'Ocultar Secreto' : 'Mostrar Secreto'}
    </button>
  </div>
  {#if secretoVisible}
    <div class="mt-4 p-4 bg-yellow-100 rounded text-center">
      ¡Has descubierto el secreto!
    </div>
  {/if}

  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Editor de Clases</h2>
    <div class="mb-4">
      <label for="editor-clases-secretas" class="block text-sm font-medium text-gray-700">Clases Secretas</label>
      <div id="editor-clases-secretas" class="border border-gray-300 rounded"></div>
    </div>
    <div class="mb-4">
      <label for="editor-clases-boton" class="block text-sm font-medium text-gray-700">Clases del Botón</label>
      <div id="editor-clases-boton" class="border border-gray-300 rounded"></div>
    </div>
    <div class="flex space-x-4">
      <button on:click={actualizarClases} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Aplicar Cambios
      </button>
      <button on:click={resetClasses} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Restablecer Clases
      </button>
    </div>
  </div>
</main>

<style>
  :global(.cm-editor) {
    height: 200px;
    width: 100%;
  }
</style>