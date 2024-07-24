<script lang="ts">
    export let ctfList: Array<any> = [];
</script>



<nav class="bg-gray-800 p-4">
    <ul class="space-y-2">
        {#each ctfList as ctf}
        <li>
            <a href={ctf.link} class="text-white hover:text-gray-300">{ctf.name}</a>
        </li>
        {/each}
    </ul>
</nav>
