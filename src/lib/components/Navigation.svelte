<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  function handleLogout() {
    auth.logout();
    window.location.href = '/';
  }

  function handleNavigation(path: string) {
    window.location.href = path;
  }
</script>

<nav class="fixed w-4/5 z-10 top-4 left-1/2 transform -translate-x-1/2">
  <div class="container mx-auto px-4">
    <div class="bg-purple-900 bg-opacity-50 backdrop-blur-md rounded-full py-2 px-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-6">
          <a href="/" class="text-2xl font-bold text-white">ONE</a>
          <a href="/" class="text-purple-200 hover:text-white">Inicio</a>
        </div>
        
        <div class="flex items-center space-x-4">
          {#if $auth.isAuthenticated}
            <Button variant="ghost" class="text-purple-200 hover:text-white" on:click={handleLogout}>Cerrar sesión</Button>
          {:else}
            <Button variant="ghost" class="text-purple-200 hover:text-white" on:click={() => handleNavigation('/auth/login')}>Iniciar sesión</Button>
            <Button class="bg-purple-600 hover:bg-purple-700" on:click={() => handleNavigation('/auth/register')}>Registrarse</Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>