<script lang="ts" setup>
import type { Artwork } from "@/types/Artwork";
import { getAllArtworks } from "@/composables/requests";
import { onBeforeMount, ref } from "vue";

const isLoading = ref(false);
let artworks = ref<Artwork[]>([]);

onBeforeMount(async () => {
    isLoading.value = true;
    artworks.value = await getAllArtworks();
    isLoading.value = false;
});

</script>

<template>
    <div class="">
        
    </div>
</template>
