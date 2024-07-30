<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { ShoppingCart } from "lucide-svelte";
    </script>
    
    <nav class="bg-purple-900 bg-opacity-50 backdrop-blur-md fixed w-full z-10">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-white">nexus</a>
          </div>
          <div class="hidden md:flex space-x-4">
            <a href="/features" class="text-purple-200 hover:text-white">Features</a>
            <a href="/pricing" class="text-purple-200 hover:text-white">Pricing</a>
            <a href="/blog" class="text-purple-200 hover:text-white">Blog</a>
            <a href="/contact" class="text-purple-200 hover:text-white">Contact</a>
            <a href="/shop" class="text-purple-200 hover:text-white">Shop</a>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="ghost" class="text-purple-200 hover:text-white">Log in</Button>
            <Button class="bg-purple-600 hover:bg-purple-700">Sign up</Button>
            <Button variant="ghost" class="text-purple-200 hover:text-white">
              <ShoppingCart class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>