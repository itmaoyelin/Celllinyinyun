<template>
    <van-popup v-model:show="modelValue" @close="falseShow" position="left" :style="{ height: '100%',width:'60%' }">
        <div class="popus" v-if="useData">
            <div v-if="useData.image">
                <img :src="useData.image" alt="" />
                {{useData.name}}
            </div>
            <div>
                <div>
                    深色模式
                </div>
                <van-switch v-model="checked" active-color="#000" inactive-color="#dcdee0" />
            </div>
            <!-- <div>
                编辑资料
            </div> -->
            <div v-if="store.userId" class="out" @click="out">
                退出登录
            </div>
            <div v-else class="out" @click="router.push('/sign')">
                立即登录
            </div>

        </div>
    </van-popup>
</template>

<script lang="ts" setup>
import { ref, watch, computed, reactive } from "vue"
import { removelocalStorage } from "@/hooks/operationLocalStorage.ts";
import { useRouter } from "vue-router"
import { useImportant } from "@/stores/index.ts";
defineProps<{
    modelValue: boolean
}>()
const store = useImportant()
let checked = ref<boolean>(false)     //深色模式
let useData = reactive<{
    name: string
    image: string,
    id: number | string
}>({
    name: store.userName,
    image: store.userImage,
    id: store.userId
})
let _userId = computed(() => {
    return store.userId
})
watch(_userId, (a) => {
    if (a) {
        useData.name = store.userName
        useData.image = store.userImage
        useData.id = store.userId
    }
})
//退出登录
const router = useRouter()
let emit = defineEmits(['update:modelValue'])
const out = () => {
    removelocalStorage('use')
    removelocalStorage('cookie')
    store.$reset()
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    router.push("/home")
    emit('update:modelValue', false)
    useData.name = ''
        useData.image = ''
        useData.id = 0
}
//关闭弹层时
const falseShow = () => {
    emit('update:modelValue', false)
}
</script>

<style  scoped>
.popus {
    padding: 2vmin;
}

.popus>div {
    display: flex;
    padding: 2vmin;
    font-size: 4vmin;
    align-items: center;
    font-weight: 600;
    margin: 2vmin 0px;
    justify-content: space-between;
    border-top: 0.5px solid rgba(138, 135, 135, 0.637);
    border-bottom: 0.5px solid rgba(138, 135, 135, 0.637);
}

.popus img {
    width: 10vmin;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.out {
    color: red;
}
</style>