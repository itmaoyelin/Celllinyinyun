<template>
    <div class="introduce" v-if="introduce">
        <div class="container">
            <h3>介绍</h3>
            <div>{{ introduce.briefDesc }}</div>
        </div>
        <div v-for="item in introduce.introduction" class="container">
            <h3>{{ item.ti }}</h3>
            <div class="jj2" v-for="(item2, index) in gsh(item.txt)" :key="index">
                {{ item2 }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import type {RootObject} from "../../ts/singer/details/introduce"
let data=defineProps<{
    introduce: RootObject,
}>()

const gsh = (txt: string) => {
    var text = txt.split("\n");
    return text;

}
</script>

<style  scoped>
.introduce {
    color: #666;
    font-size: 2vmin;

}

.container {
    width: 91vw;
    padding: 1vw 2vw;
    border-radius: 10px;

    margin: 10px auto;
    background-color: #fff;
}
</style>