<script lang="ts">
    import '../app.css'
    import { ModeWatcher } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";
    import Navigation from '$lib/components/Navigation.svelte';
    import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";
    import { Menu } from "lucide-svelte";
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { navigating } from '$app/stores';
    import { SvelteToast } from '@zerodevx/svelte-toast';

    const ctfList = [
        {name: 'Javascript Async', link:'/javascript-async'},
        { name: "Registro", link: "/auth/register" },
        { name: "Iniciar Sesión", link: "/auth/login" },
        { name: "JavaScript Async 2", link: "/javascript-async-2" },
    ];

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    onMount(() => {
        auth.initialize();
    });
</script>

<ModeWatcher />

{#if $navigating}
  <!-- Aquí puedes añadir un indicador de carga si lo deseas -->
{/if}

<div class="grid h-screen w-screen grid-cols-1 md-custom:grid-cols-[auto,1fr]">
    <Navigation />

    <!-- Menú para móviles (hasta 767px) -->
    <Sheet bind:open={isOpen}>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" class="fixed top-4 left-4 z-40 md-custom:hidden" on:click={toggleMenu}>
                <Menu class="h-4 w-4" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-[300px] sm:w-[400px]">
            <nav class="flex flex-col space-y-4">
                {#each ctfList as item}
                    <a href={item.link} class="text-lg hover:underline" on:click={toggleMenu}>{item.name}</a>
                {/each}
            </nav>
        </SheetContent>
    </Sheet>

    <!-- Menú para pantallas más grandes (768px y superiores) -->
    <aside class="hidden md-custom:block w-64 bg-secondary p-4 overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">CTF Challenges</h2>
        <nav class="flex flex-col space-y-2">
            {#each ctfList as item}
                <a href={item.link} class="text-lg hover:underline">{item.name}</a>
            {/each}
        </nav>
    </aside>

    <!-- Contenido principal -->
    <main class="overflow-auto w-full h-full md-custom:col-start-2">
        <slot></slot>
    </main>
</div>

<SvelteToast />