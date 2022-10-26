<template>
    <!-- 小标题封装 -->
    <div class="bar">
        <div>
            <h4>
                <slot name="left">左侧内容区</slot>
            </h4>
        </div>
        <div class="rigth" @click="buttoon">
            <slot name="rigth"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
// 通知父组件按钮被触发了
const emit = defineEmits(['bar-click'])
const buttoon=()=>{
emit('bar-click')
}
</script>

<style  scoped>
.bar{
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rigth{
    width: 15%;
    height: 40%;
    border: 1px solid #c7c7c7;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
}
</style>