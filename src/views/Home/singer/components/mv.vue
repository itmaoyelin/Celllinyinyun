<template>
<div v-if="mvs">
    <div  class="flex mv" v-for="(item, index) in mvs">
        <img v-lazy="item.imgurl" alt="" @click="playMv(item.id, $event)">
        <div class=" names">
            <div class="name">{{ item.name }}</div>
            <div class="time">
                <div>{{ item.publishTime }}</div>
                <div>{{ NumberFormats(item.playCount) + '播放' }}</div>
            </div>

        </div>

    </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import NumberFormats from "@/hooks/NumberFormats.ts"
import { setxy, mvid } from "@/hooks/mvDetails.ts"
import type { mvs } from "../../ts/singer/details/mv"
defineProps<{
    mvs?: mvs[]
}>()

const playMv = (id: string | number, e?: any) => {
    setxy(e.clientX, e.clientY)
    mvid.value = id
}
</script>

<style  scoped>
.time {
    color: #7a7a7a;
    width: 100%;

}

.time div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    width: 100%;
    font-size: 4vmin;
    margin-bottom: 5vmin;

}

.mv {
    width: 95vw;
    margin: 2vw auto;
    height: 27vmin;
}

.flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

img {
    width: 50vmin;
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
}

.names {
    flex: 1;
    height: 100%;
    margin-left: 2vmin;
}
</style>