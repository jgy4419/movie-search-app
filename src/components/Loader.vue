<template>
    <div
    :style="{
        // 기본적인 spinner부분에 가로너비는 2rem으로 시작하도록 만들어 주기.
        // size부분에 따로 값을 넣지 않으면 2rem으로 bootstrap에서 제공되는 기본 크기를 가지고
        // 2보다 작은 값을 넣으면 점점 더 작아질 것이다.
        width: `${size}rem`,
        height: `${size}rem`,
        zIndex
    }" 
    :class="{
        absolute,
        fixed
        }"
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
    props: {
        size:{
            type: Number,
            default: 2
        }, 
        // 위에 :class에서 absolute 부분이 true가 되면 spinner-border부분에 absolute가 추거되는 로직이다.
        absolute:{
            type: Boolean,
            default: false
        },
        fixed:{
            type: Boolean,
            default: false
        },
        zIndex:{
            type:Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
// 처음에 position absolute, fixed 모두 아닌 채로 시작하다가 각 absolute나 fixed 클래스가 추가되면 속성이 추가된다.
    .spinner-border{
        // 가운데 배치
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        // 해당하는 spinner-border 부분에 absolute라는 클래스가 붙어있는 경우에만 position 값이 absolute이다.
        &.absolute{
            position: absolute;
        }
        &.fixed{
            position: fixed;
        }
    }
</style>