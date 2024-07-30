<script lang="ts">
  import { onMount } from 'svelte';

  export let text: string;
  export let onClick: () => void = () => {};

  let button: HTMLElement;
  let spotlight: HTMLElement;
  let border: HTMLElement;
  let isHovered = false;

  function handleMouseMove(event: MouseEvent) {
    if (!button || !spotlight || !border) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotlight.style.setProperty('--mouse-x', `${x}px`);
    spotlight.style.setProperty('--mouse-y', `${y}px`);
    border.style.setProperty('--mouse-x', `${x}px`);
    border.style.setProperty('--mouse-y', `${y}px`);
  }

  onMount(() => {
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', () => isHovered = true);
    button.addEventListener('mouseleave', () => isHovered = false);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', () => isHovered = true);
      button.removeEventListener('mouseleave', () => isHovered = false);
    };
  });
</script>

<button
  bind:this={button}
  on:click={onClick}
  class="relative px-6 py-3 bg-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
>
  <div bind:this={spotlight} class="spotlight absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out" class:opacity-100={isHovered}></div>
  <div bind:this={border} class="border-glow absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ease-in-out" class:opacity-100={isHovered}></div>
  <span class="relative z-10">{text}</span>
</button>

<style>
  .spotlight {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y), 
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    pointer-events: none;
  }

  .border-glow {
    background: radial-gradient(
      20px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.3),
      transparent 50%
    );
    pointer-events: none;
  }

  .border-glow::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: inherit;
    background: linear-gradient(to right, purple, violet) border-box;
    -webkit-mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  button {
    background: linear-gradient(to right, #4c1d95, #7e22ce);
  }

  button:hover {
    background: linear-gradient(to right, #5b21b6, #8b5cf6);
  }
</style>