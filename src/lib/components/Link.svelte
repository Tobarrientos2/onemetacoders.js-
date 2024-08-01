<script lang="ts">
    import { browser } from '$app/environment';
  
    export let href: string;
  
    function handleClick(event: MouseEvent) {
      event.preventDefault();
      if (browser) {
        window.location.href = href;
      }
    }
  </script>
  
  <a {href} on:click={handleClick}>
    <slot />
  </a>