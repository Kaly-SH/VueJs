<script lang="ts" setup>
  import { ref, onBeforeMount, reactive } from 'vue';
  import { frenchWords } from '@/constants/fr';
  import AppDisplayWords from '@/components/game/AppDisplayWords.vue';

  let allWord: string[] = reactive([]);
  let wordsBefore: string = "?????";
  let wordsAfter: string = "?????";
  let wordToFind: string;
  let isLoading = ref(false);
  let isWin = ref(false);
  let isLoose = ref(false);
  let nbTry = ref(0);
  let isWordValid = ref(false);

  onBeforeMount(() => {
    isLoading.value = true;
    allWord = frenchWords;
    wordToFind = frenchWords[Math.floor(Math.random() * frenchWords.length)];
    isLoading.value = false;
  });

  function checkOrder( word: string, wordToFind: string, allWord: string[] ) {
    // Check if the word is before or after the word to find in the array
    const wordIndex = allWord.indexOf(word);
    const wordToFindIndex = allWord.indexOf(wordToFind);
    if (wordIndex < wordToFindIndex) {
      allWord.splice(0,wordIndex+1);
      console.log(allWord);
      return wordsBefore = word;
    } else {
      allWord.splice(wordIndex, allWord.length);
      console.log(allWord);
      return wordsAfter = word;
    }
  }

  function ValidateWord(value: string) {
    isWordValid.value = false;
    isLoading.value = true;
    const word: string = allWord.find((word) => word === value.toUpperCase()) as string;
    if (word) {
      nbTry.value++;
      if (word === wordToFind) {
        isWin.value = true;
        isWordValid.value = true;
      } else if ( nbTry.value === 14) {
        isWordValid.value = true;
        isLoose.value = true;
      } else {
        isWordValid.value = true;
        checkOrder( word, wordToFind, allWord );
      }
    }
    isLoading.value = false;
  }

  const isLetter = (e:any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[A-Za-z]+$/.test(char)) return true; 
    else e.preventDefault(); 
  };

  function replay() {
    isLoading.value = true;
    isWin.value = false;
    isLoose.value = false;
    nbTry.value = 0;
    wordsBefore = "?????";
    wordsAfter = "?????";
    allWord = frenchWords;
    wordToFind = frenchWords[Math.floor(Math.random() * frenchWords.length)];
    isLoading.value = false;
  }
  
</script>

<template>
  <router-link to="/">
    <button class="btn btn-primary rounded-circle p-3 lh-1 m-1">
      <i class="bi bi-house-door-fill" style="height: 24px;width: 24px;"></i>
    </button>
  </router-link>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <main v-else  class="px-4 py-5 my-5 text-center game">
    <h1>Trouve le mots secret de 5 lettres</h1>
    <!-- Add wordToFind to the message -->
    <div v-if="isWin">
      <p>Bravo tu as trouvé !</p>
      <button @click="replay" class="btn btn-warning rounded-pill px-3 m-3">Rejouer</button>
    </div> 
    <div v-if="isLoose">
      <p>Dommage ! Le mot était {{ wordToFind }}</p>
      <button @click="replay" class="btn btn-warning rounded-pill px-3 m-3">Rejouer</button>
    </div>

    <p>Essai : {{ nbTry }}/14</p>

    <AppDisplayWords :words-before="wordsBefore" :words-after="wordsAfter" :word-to-find="wordToFind" :is-win="isWin" />

    <!-- <p>Word to find: {{ wordToFind }}</p> -->
    <div class="input-group mb-3 mt-4">
      <span class="input-group-text" id="basic-addon1">Réponse</span>
      <input type="text" v-model="word" ref="input" class="form-control" placeholder="?????" aria-label="Username" aria-describedby="basic-addon1" style="text-transform:uppercase" @keyup.enter="ValidateWord(word)" v-on:keypress="isLetter($event)" autofocus>
    </div>

    <div>
      <button @click="ValidateWord(word)" class="btn btn-success rounded-pill px-3 m-3">Valider</button>
    </div>
   
  </main>
</template>

<style scoped lang="scss">
  .game {
    .input-group {
      width: 300px;
      margin: auto;
    }
  }
</style>