<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { validateEmail, validatePassword, validateUsername } from '$lib/utils/validation';
  import { API_URL } from '$lib/config';
  import { goto } from '$app/navigation';

  let username = '';
  let email = '';
  let password = '';
  let errors: { [key: string]: string } = {};
  let message = '';

  function validateForm() {
    errors = {};
    if (!validateUsername(username)) {
      errors.username = 'El nombre de usuario debe tener entre 3 y 20 caracteres.';
    }
    if (!validateEmail(email)) {
      errors.email = 'Por favor, introduce un email válido.';
    }
    if (!validatePassword(password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    return Object.keys(errors).length === 0;
  }

  async function handleRegister() {
    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          message = data.message;
          goto('/auth/login'); // Redirigimos al usuario a la página de login
        } else {
          errors.form = data.message;
        }
      } catch (error) {
        errors.form = 'Ocurrió un error al registrar. Por favor, intenta de nuevo.';
      }
    }
  }
</script>

<main class="container mx-auto p-4 mt-20">
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Registro</CardTitle>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleRegister} class="space-y-4">
        <div>
          <Input type="text" placeholder="Nombre de usuario" bind:value={username} required />
          {#if errors.username}<p class="text-red-500 text-sm mt-1">{errors.username}</p>{/if}
        </div>
        <div>
          <Input type="email" placeholder="Correo electrónico" bind:value={email} required />
          {#if errors.email}<p class="text-red-500 text-sm mt-1">{errors.email}</p>{/if}
        </div>
        <div>
          <Input type="password" placeholder="Contraseña" bind:value={password} required />
          {#if errors.password}<p class="text-red-500 text-sm mt-1">{errors.password}</p>{/if}
        </div>
        {#if errors.form}<p class="text-red-500 text-sm mt-1">{errors.form}</p>{/if}
        {#if message}<p class="text-green-500 text-sm mt-1">{message}</p>{/if}
        <Button type="submit" class="w-full">Registrarse</Button>
      </form>
    </CardContent>
  </Card>
</main>