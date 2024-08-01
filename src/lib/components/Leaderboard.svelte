<script lang="ts">
    import { onMount } from 'svelte';
    import { API_URL } from '$lib/config';
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  
    let leaderboard: any[] = [];
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const response = await fetch(`${API_URL}/leaderboard`);
        if (response.ok) {
          leaderboard = await response.json();
        } else {
          error = 'Error al cargar la clasificación';
        }
      } catch (e) {
        error = 'Error de red al cargar la clasificación';
      }
    });
  </script>
  
  <Card>
    <CardHeader>
      <CardTitle>Clasificación</CardTitle>
    </CardHeader>
    <CardContent>
      {#if error}
        <p class="text-red-500">{error}</p>
      {:else if leaderboard.length > 0}
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Posición</th>
              <th class="text-left">Usuario</th>
              <th class="text-right">Puntuación</th>
              <th class="text-right">Desafíos Completados</th>
            </tr>
          </thead>
          <tbody>
            {#each leaderboard as entry, index}
              <tr class="border-t">
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td class="text-right">{entry.totalScore}</td>
                <td class="text-right">{entry.completedChallenges}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p>Cargando clasificación...</p>
      {/if}
    </CardContent>
  </Card>