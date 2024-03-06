<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheNavbar from "@/components/navbar/TheNavbar.vue";
import TheFooter from "@/components/footer/TheFooter.vue";

</script>


<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header>
      <TheNavbar />
    </header>
    <RouterView />
  </div>
	<footer>
		<TheFooter />
	</footer>
</template>