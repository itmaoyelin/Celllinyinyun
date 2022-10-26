<template>
    <div class="tehAlbum" v-if="hotAlbums">
        <div v-for="item in hotAlbums" class="container">
            <div class="image">
                <img v-lazy="item.blurPicUrl" alt="" />
                <div class="back"></div>
            </div>
            <div class="nams">
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>    
import { ref } from "vue"
import type {RootObject} from "../../ts/singer/details/theAlbum"
defineProps<{
    hotAlbums?: RootObject[]
}>()
</script>

<style  scoped>
.nams {
    margin-left: 7vmin;
    width: 65vmin;
}
.nams div{
    width: 100%;
          white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.container {
    width: 95vw;
    display: flex;
    align-items: center;
    margin: 3vw auto;
}

.image {
    width: 20vmin;
    aspect-ratio: 1/1;
    position: relative;
}

.image img {
    width: 100%;
    height: 100%;
}


.back {
    padding-left: 115%;
    background: url(../../../../assets/image/专辑.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
}
</style>