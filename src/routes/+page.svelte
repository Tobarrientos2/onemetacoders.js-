<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { ShoppingCart } from "lucide-svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    
    // Datos de ejemplo para los CTFs
    const features = [
        {
            title: "Smart Contract Automation",
            description: "Nibh ante pellentesque eget. Nunc lectus amet sem purus accumsan. Amet sed pulvinar nibh et eget. Sed egestas ultricies et fringilla.",
            size: "lg:col-span-2"
        },
        {
            title: "Privacy-First",
            description: "Sed massa consequat eros vel. Urna sed tellus nibh maecenas ac rhoncus nisi at lorem. Egestas elit eget.",
            size: "lg:col-span-1"
        },
        {
            title: "Instant Transactions",
            description: "Egestas ridiculus scelerisque parturient tellus ultrices a nisi est facilisi. Sed suspendisse id enim sagittis.",
            size: "lg:col-span-1"
        },
        {
            title: "Decentralized",
            description: "Imperdiet a consequat sodales eget non semper amet sagittis. Vitae vulputate nisi ornare sed nisl. Mi leo egestas.",
            size: "lg:col-span-1"
        }
    ];
</script>
    
    <div class="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <Navigation />
      
      <main class="container mx-auto px-4 py-20">
        <!-- Sección Hero existente -->
        <div class="flex flex-col lg:flex-row items-center justify-between mb-32">
          <div class="lg:w-1/2 mb-10 lg:mb-0">
            <h1 class="text-5xl lg:text-7xl font-bold mb-6">
              Experience<br/>
              The Power of<br/>
              <span class="text-purple-400">Blockchain</span>
            </h1>
            <p class="text-lg mb-8 text-purple-200">
              Dive into our visionary projects and see how we're bringing the power of blockchain to real-world applications.
            </p>
            <Button size="lg" class="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </div>
          
          <div class="lg:w-1/2 relative">
            <div class="w-64 h-64 lg:w-96 lg:h-96 bg-purple-700 rounded-full blur-3xl opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div class="w-48 h-48 lg:w-80 lg:h-80 bg-purple-500 rounded-full blur-2xl opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            <div class="w-32 h-32 lg:w-64 lg:h-64 bg-purple-300 rounded-full blur-xl opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
          </div>
        </div>
    
        <!-- Nueva sección de CTFs -->
        <section class="mt-32 px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl lg:text-5xl font-bold mb-4">
                    Learn about the most<br/>
                    important features of our<br/>
                    <span class="text-purple-400">product</span>
                </h2>
                <div class="inline-block bg-purple-800 text-purple-200 px-4 py-2 rounded-full text-sm font-semibold">FEATURES</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each features as feature, index}
                    <div class="bg-purple-900 bg-opacity-20 rounded-2xl p-6 backdrop-blur-lg relative overflow-hidden {feature.size}">
                        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 opacity-10"></div>
                        <div class="relative z-10">
                            <div class="h-40 mb-6 relative">
                                <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transform rotate-45 blur-2xl opacity-30"></div>
                                <div class="absolute inset-0 border border-purple-400 rounded-full transform -rotate-12"></div>
                                <div class="absolute inset-0 border border-purple-300 rounded-full transform rotate-45 scale-75"></div>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p class="text-purple-200">{feature.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
        
      </main>
    </div>
    
    <style>
      /* Estilos adicionales si son necesarios */
    </style>