<template>
    <!--加载动画， loading封装 -->
    <div class="container">
        <div class="round-ball">
        </div>
        <div class="ladder">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style  scoped>
@keyframes mov {
    0% {
        transform: scale(1);
    }

    25% {

        transform: translate(0, -20px) scale(0.7, 1.2);
    }

    50% {


        transform: translate(0, -100px) scale(1, 1)
    }

    75% {
        transform: translate(0, -5px) scale(0.7, 1.3);
    }

    85% {
        transform: scale(1.2, 0.7);
    }

    100% {
        transform: scale(1);

    }
}

.round-ball {
    width: 30px;
    height: 30px;
    background-color: #8693AB;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    position: absolute;
    animation: mov 0.6s ease-in-out infinite;

}

.round-ball:hover {
    animation-play-state: paused;
}

.ladder {
    position: absolute;
    top: 70%;
    width: 100%;
    right: 7%;
    aspect-ratio: 1/0.6;
    transform: translate(50%, -50%);
}

.ladder div:not(:nth-child(1)) {
    width: 32px;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 5px;
    background-color: #8693AB;
    animation: move 1.8s linear infinite;
}

@keyframes move {
    0% {
        opacity: 0;
        top: 0px;
        right: 0px;
    }

    50% {
        opacity: 1;

    }

    100% {
        opacity: 0;
        top: 100%;
        right: 100%;
    }
}

.ladder div:nth-child(2) {
    animation-delay: 0s;
}

.ladder div:nth-child(3) {
    animation-delay: -0.6s;
}

.ladder div:nth-child(4) {
    animation-delay: -1.2s;
}

.container {
    position: absolute;
    top: 50%;
    right: 55%;
    width: 110px;
    transform: translate(50%, -50%);
    aspect-ratio: 1/1;
    z-index: 100;
}
</style>