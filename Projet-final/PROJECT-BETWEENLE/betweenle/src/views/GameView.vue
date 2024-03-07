<script lang="ts" setup>
  import { ref, onBeforeMount, reactive } from 'vue';
  import { frenchWords } from '@/constants/fr';

  let allWord: string[] = reactive([]);
  let wordsBefore: string;
  let wordsAfter: string;
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
    wordsBefore = "";
    wordsAfter = "";
    allWord = frenchWords;
    wordToFind = frenchWords[Math.floor(Math.random() * frenchWords.length)];
    isLoading.value = false;
  }
  
</script>

<template>
  <router-link to="/">HOME</router-link>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <main v-else>
    <h1>Find the 5 letters word</h1>
    <!-- Add wordToFind to the message -->
    <p v-if="isWin">You win !</p> 
    <p v-if="isLoose">You loose ! {{ wordToFind }}</p>
    <p>Try: {{ nbTry }}/14</p>
    <div>
      <p v-if="wordsBefore">{{ wordsBefore }}</p>
      <p v-else> ? ? ? ? ? </p>
    </div>
    <p v-if="!isWin"> ? ? ? ? ? </p>
    <p v-else>{{ wordToFind }}</p>
    <div>
      <p v-if="wordsAfter">{{ wordsAfter }}</p>
      <p v-else> ? ? ? ? ? </p>
    </div>
    <p>Word to find: {{ wordToFind }}</p>
    <input v-model="word" type="text" ref="input" style="text-transform:uppercase" @keyup.enter="ValidateWord(word)" v-on:keypress="isLetter($event)" autofocus/>
    <button @click="ValidateWord(word)">Validate</button>
    <button @click="replay">Replay</button>
   
  </main>
</template>
