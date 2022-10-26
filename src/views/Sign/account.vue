<template>
<div class="sign">
    <NavBar></NavBar>
    <div class="container">
        <h3>登录体验更多精彩</h3>
        <div>未注册手机号登录后将自动组成账号</div>
        <input type="text" v-model.number="account" placeholder="输入手机号">
        <button>
            下一步
        </button>
      <div>
        找回密码&注册
      </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import NavBar from "../../components/navBar.vue" 
let account=ref<number>()
</script>

<style  scoped>
.container{
    flex: 1;
}
.sign{
    display: flex;
    flex-direction: column;
}
</style>