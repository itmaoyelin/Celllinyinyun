<template>
    <div class="sign">
        <NavBar>
            <template #left>
                <van-icon class="navbar" name="arrow-left" @click="router.go(-1)"/>
            </template>
            <template #rigth>
                <h3 class="h3">
                    手机登录
                </h3>
            </template>
        </NavBar>
        <div class="container" v-if="show">
            <div class="h2">登录体验更多精彩</div>
            <div class="tips">输入账号密码进行登录</div>
            <van-cell-group inset>
                <!-- 输入手机号，调起手机号键盘 -->
                <van-field v-model="account" type="tel" autocomplete="off" clickable placeholder="输入手机号" />
                <!-- 输入密码 -->
                <van-field v-model="password" type="password" placeholder="输入密码" />
            </van-cell-group>
            <span class=".span"></span>
            <button @click="go">
                登录
            </button>
            <div class="ops">
                找回密码&注册
            </div>

        </div>
        <div v-else>
            <div class="h2">请输入验证码</div>
            <div class="tips flex">
                <div>
                    已发送至 {{ account }}
                    <span style="color: #0c73c2;" @click="show = true">重新输入手机号</span>
                </div>
                <div class="cx" v-if="showData">{{ date }}s</div>
                <div class="cx" v-else @click="getVerification()">重新发送</div>
            </div>
            <van-password-input :value="value" :mask="false" :length="4" :focused="showKeyboard"
                @focus="showKeyboard = true" />
            <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"
import { Toast, Notify } from 'vant';
import networkRequest from '@/network/index.ts'
import { setlocalStorage } from "@/hooks/operationLocalStorage.ts";
import md5 from "js-md5";
import { useImportant } from "@/stores/index.ts";
import { useRouter } from "vue-router";
import NavBar from "../../components/navBar.vue"

const store=useImportant()
const router = useRouter()
//账号密码
let account = ref<string>('')
let password = ref<string>('')
const go = () => {
    if (account.value.length < 11) {
        Toast({
  message: '手机号必须大于11位',
});

        return
    }
    networkRequest('request', `/login/cellphone?phone=${account.value}&md5_password=${md5(password.value)}`, function (res: any) {
        if (res.data.code > 290) {
            Toast('密码错误请重新登录')
            password.value=''
            return;
        }
        //保存cookie
        setlocalStorage('cookie',res.data.cookie)
        networkRequest('request2', '/user/account', function (res: any) {
            //保存用户个人信息
            console.log(res);
            
            setlocalStorage('use',res.data.account)
            store.userId=res.data.account.id
            store.userImage=res.data.profile.avatarUrl,
            store.userName=res.data.profile.nickname
            account.value=''
            password.value=''
            router.go(-1)
        })
    })
}

//倒计时
let date = ref<number>(60)
let showData = ref<boolean>(false)
let ops = ref<boolean>(true)
//验证码输入
let show = ref(true)
let showKeyboard = ref(true)
let value = ref('')


//获取到验证码
const getVerification = () => {
    showData.value = true
    date.value = 60
    delays()
    networkRequest('request', '/captcha/sent?phone=' + account.value, function (res: any) {
    })
}
//定时器
const delays = () => {
    let delay = setInterval(() => {
        if (date.value > 0) {
            date.value--;
        } else {
            showData.value = false;
            clearInterval(delay);
        }
    }, 1000);
}

//当验证码输满时判断验证码
let verification = computed(() => {
    return value.value.length
})
watch(verification, (a) => {
    if (a >= 4) {
        networkRequest('request', '/captcha/verify?phone=' + account.value + '&captcha=' + value.value, function (res: any) {
            console.log(res);
        })
    }
})

</script>

<style  scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cx {
    color: #0c73c2;
    float: right;
    font-size: 2vmin;
    margin-top: 5px;
}

.ops {
    margin-top: 5vmin;
    color: rgb(153, 153, 153);
    font-size: 1vmin;
    width: 100vw;
    text-align: center;
}

.span {
    display: block;
    width: 97vw;
    margin: 0px auto;
    border-bottom: 0.5px solid rgb(199, 199, 199);
    margin-top: 1vmin;
}

button {
    border: 0;
    background-color: red;
    color: #fff;
    width: 90vw;
    aspect-ratio: 9/1;

    display: block;
    margin: 0px auto;
    margin-top: 6vmin;
    border-radius: 30px;
}

input {
    height: 5vmin;
    border: 0px;
}

.h2 {
    font-weight: 600;
    margin: 2vmin 0px;
    font-size: 5vmin;
}

.tips {
    color: rgb(129, 129, 129);
    font-size: 3vmin;
    margin-bottom: 4vmin;
}

h3 {
    flex: 1;
    text-align: center;
    margin: 2vmin 0px;
}

.container {
    flex: 1;

}

.sign {
    background-color: #fff;
    display: flex;
    width: 96vw;
    padding: 0px 2vw;
    height: 100vh;
    flex-direction: column;
}
</style>