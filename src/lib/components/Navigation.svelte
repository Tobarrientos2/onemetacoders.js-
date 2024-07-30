<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ShoppingCart } from "lucide-svelte";
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
            <Button variant="ghost" class="text-purple-200 hover:text-white">Log in</Button>
            <Button class="bg-purple-600 hover:bg-purple-700">Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  </nav>