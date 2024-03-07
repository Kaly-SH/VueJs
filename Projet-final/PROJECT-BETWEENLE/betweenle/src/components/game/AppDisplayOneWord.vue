<script lang="ts" setup>

defineProps({
    word: String,
})


</script>

<template>

    <div>
        <span v-for="letter in word?.split('')" :key="letter" class="letter" >{{ letter }}</span>
    </div>

</template>

<style scoped lang="scss">
    .letter {
        height: 40px;
        width: 40px;
        display: inline-block;
        background-color: gray;
        margin: 5px;
        text-align: center;
        color: white;
        font-size: 24px;
        line-height: 40px;
        font-weight: 900;

        &.isLetter {
            background-color: blue;
        }
    }
</style>