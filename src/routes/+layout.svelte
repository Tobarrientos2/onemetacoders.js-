<script>
    import '../app.css'
    import Menu from '../lib/components/Menu.svelte';

    const ctfList = [
        {name: 'La Carrera del Event Loop', link:'/event-loop'},
        {name: 'El Laberinto de Tailwind', link: '/tailwind-maze'}
    ]
</script>


<div class="flex">
    <Menu {ctfList}> </Menu>
    <div class="flex-1 p-4">
        <slot></slot>
    </div>
</div>
