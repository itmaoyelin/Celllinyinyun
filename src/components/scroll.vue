<template>
    <!-- 容器，用于滚动 -->
    <div class="scroll">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

</script>

<style  scoped>
.scroll {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
}

.scroll::-webkit-scrollbar {
    display: none;
}
</style>