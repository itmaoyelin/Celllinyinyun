<template>
    <div class="comment">
        <div class="navbar">
            <van-icon name="arrow-left" @click="navClick" color="#000" size="6vmin" />
            <div>
                评论
            </div>
        </div>
        <Song v-if="(route.query.type as string) == '0'" :image="(route.query.image as string)"
            :name="(route.query.detailsName as string)"></Song>
        <Sheet v-else :name="(route.query.detailsName as string)" :image="(route.query.image as string)"
            :nickname="(route.query.nickname as string)"></Sheet>
        <div class="title">
            <Comment :id="route.query.id" :type="route.query.type">
            </Comment>
        </div>
      
    </div>

</template>

<script lang="ts">
export default {
    name: "comment",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue"

import { useRoute, useRouter } from "vue-router";
import Sheet from "./components/sheet.vue";
import Song from "./components/song.vue";
const route = useRoute()
let id = ref<string>('')
onMounted(() => {
    id.value = route.query.id as string
})
//路由跳转
const router = useRouter()
const navClick = () => {
    router.go(-1)
}

</script>

<style  scoped>
    
.title {
    flex: 1;
    width: 100vw;
    margin-bottom: 40px;
    margin-top: 2vmin;
    position: relative;
}

.comment {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    background-color: rgb(228, 228, 228);
    justify-content: space-between;
}

.navbar {
    display: flex;
    height: 50px;
    align-items: center;
    background-color: #fff;
    text-align: center;
}

.navbar div {
    flex: 1;
    font-weight: 600;
    font-size: 4vmin;
}
</style>