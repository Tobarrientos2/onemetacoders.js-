<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { auth } from '$lib/stores/auth';
  import { API_URL } from '$lib/config';

  let email = '';
  let password = '';
  let errors: { email?: string; password?: string; form?: string } = {};

  async function handleLogin() {
    console.log('Iniciando proceso de login...');
    errors = {};

    if (!email) {
      errors.email = 'El correo electrónico es requerido';
    }
    if (!password) {
      errors.password = 'La contraseña es requerida';
    }

    if (Object.keys(errors).length === 0) {
      try {
        console.log('Enviando solicitud de login al servidor...');
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (response.ok) {
          console.log('Login exitoso. Token recibido:', data.token);
          auth.login(data.token, { email });
          console.log('Estado de autenticación actualizado');
          window.location.href = '/';
        } else {
          console.error('Error en el login:', data.message);
          errors.form = data.message || 'Credenciales inválidas. Por favor, intenta de nuevo.';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errors.form = 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.';
      }
    } else {
      console.log('Errores de validación:', errors);
    }
  }
</script>

<main class="container mx-auto p-4 mt-20">
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Iniciar Sesión</CardTitle>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <Input type="email" placeholder="Correo electrónico" bind:value={email} required />
          {#if errors.email}<p class="text-red-500 text-sm mt-1">{errors.email}</p>{/if}
        </div>
        <div>
          <Input type="password" placeholder="Contraseña" bind:value={password} required />
          {#if errors.password}<p class="text-red-500 text-sm mt-1">{errors.password}</p>{/if}
        </div>
        {#if errors.form}<p class="text-red-500 text-sm mt-1">{errors.form}</p>{/if}
        <Button type="submit" class="w-full">Iniciar Sesión</Button>
      </form>
    </CardContent>
  </Card>
</main>