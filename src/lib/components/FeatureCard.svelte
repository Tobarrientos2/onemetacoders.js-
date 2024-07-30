<script lang="ts">
  import { onMount } from 'svelte';

  export let title: string;
  export let description: string;
  export let size: string;

  let card: HTMLElement;
  let spotlight: HTMLElement;
  let border: HTMLElement;
  let isHovered = false;

  function handleMouseMove(event: MouseEvent) {
    if (!card || !spotlight || !border) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotlight.style.setProperty('--mouse-x', `${x}px`);
    spotlight.style.setProperty('--mouse-y', `${y}px`);
    border.style.setProperty('--mouse-x', `${x}px`);
    border.style.setProperty('--mouse-y', `${y}px`);
  }

  onMount(() => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', () => isHovered = true);
    card.addEventListener('mouseleave', () => isHovered = false);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', () => isHovered = true);
      card.removeEventListener('mouseleave', () => isHovered = false);
    };
  });
</script>

<div bind:this={card} class="bg-purple-900 bg-opacity-20 rounded-2xl p-6 backdrop-blur-lg relative overflow-hidden {size}">
  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 opacity-10"></div>
  <div bind:this={spotlight} class="spotlight absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out" class:opacity-100={isHovered}></div>
  <div bind:this={border} class="border-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ease-in-out" class:opacity-100={isHovered}></div>
  <div class="relative z-10">
    <div class="h-40 mb-6 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transform rotate-45 blur-2xl opacity-30"></div>
      <div class="absolute inset-0 border border-purple-400 rounded-full transform -rotate-12"></div>
      <div class="absolute inset-0 border border-purple-300 rounded-full transform rotate-45 scale-75"></div>
    </div>
    <h3 class="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p class="text-purple-200">{description}</p>
  </div>
</div>

<style>
  .spotlight {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y), 
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
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
</style>