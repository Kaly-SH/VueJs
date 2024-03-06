<script lang="ts" setup>
import {ref} from "vue";
</script>

<template>
    <div class="px-4 py-5 my-5 text-center">
      <a class="link-underline link-underline-opacity-0" v-bind:href="'/'">
        <h1 class="display-5 fw-bold text-body-emphasis">QSMP MUSEUM</h1>
      </a>
    </div>
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
          <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
        </ul>
      </header>
    </div>
</template>