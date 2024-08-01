<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  import { API_URL } from '$lib/config';
  import { Progress } from "$lib/components/ui/progress";

  // Modifica la interfaz de userProgress para incluir el rango
  interface UserProgress {
    totalScore: number;
    maxPossibleScore: number;
    progress: Record<string, { puntuacion: number; completado: boolean }>;
    achievements: { name: string; description: string }[];
    rank: number | string;
  }

  let userProgress: UserProgress | null = null;
  let error: string | null = null;

  onMount(async () => {
    if ($auth.isAuthenticated) {
      try {
        const response = await fetch(`${API_URL}/user-progress`, {
          headers: {
            'Authorization': `Bearer ${$auth.token}`
          }
        });
        if (response.ok) {
          userProgress = await response.json();
        } else {
          error = 'Error al cargar el progreso';
        }
      } catch (e) {
        error = 'Error de red al cargar el progreso';
      }
    }
  });
</script>

{#if error}
  <p class="text-red-500">{error}</p>
{:else if userProgress}
  <div class="bg-secondary p-4 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Tu Progreso</h2>
    <p class="mb-2">Puntuación total: {userProgress.totalScore} / {userProgress.maxPossibleScore}</p>
    <p class="mb-2">Posición en la clasificación: {userProgress.rank}</p>
    <Progress value={(userProgress.totalScore / userProgress.maxPossibleScore) * 100} class="mb-4" />
    <h3 class="text-xl font-semibold mb-2">Desafíos:</h3>
    <ul>
      {#each Object.entries(userProgress.progress) as [challengeId, challenge]}
        <li class="mb-2">
          <span class="font-medium">{challengeId}:</span> 
          {challenge.puntuacion} puntos
          {#if challenge.completado}
            <span class="text-green-500 ml-2">✓ Completado</span>
          {:else}
            <span class="text-yellow-500 ml-2">En progreso</span>
          {/if}
        </li>
      {/each}
    </ul>
    <h3 class="text-xl font-semibold mt-4 mb-2">Logros:</h3>
    <ul>
      {#each userProgress.achievements as achievement}
        <li class="mb-2">
          <span class="font-medium">{achievement.name}:</span> 
          {achievement.description}
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p>Cargando progreso...</p>
{/if}