<script lang="ts" setup>
import AppDisplayOneWord from './AppDisplayOneWord.vue';

defineProps({
    wordsBefore: String,
    wordsAfter: String,
    wordToFind: String,
    isWin: Boolean,
})

</script>

<template>
    <AppDisplayOneWord :word=wordsBefore />
    
    <AppDisplayOneWord v-if="isWin" :word=wordToFind />
    <AppDisplayOneWord v-else :word="'?????'" />
    
    <AppDisplayOneWord :word=wordsAfter />

</template>